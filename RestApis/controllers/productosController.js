const Producto = require('../models/Productos');


const multer = require('multer');
const shortid = require('shortid');



const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
};

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
};

//Agregar nuevo producto
exports.nuevoProducto = async ( req, res, next) =>{
    const producto = new Producto(req.body);

    try {

        if(req.file.filename){
            producto.imagen = req.file.filename;
        }

        await producto.save();
        res.json({mensaje: 'Se agrego un nuevo producto'})
    } catch (error) {
        console.log(error);
        next();
    }

};

//Mostrar todos los productos
exports.mostrarProductos = async ( req, res, next) => {
    try {
        const productos = await Producto.find({});
        res.json(productos);
    } catch (error) {
        console.log(error);
        next();
    }
};

//Mostrar Producto por id
exports.mostrarProducto = async ( req, res, next) => {
    
        const producto = await Producto.findById(req.params.idProducto);
        
        if(!producto){
            res.json({mensaje: 'Este producto no existe'})
            return next();
        }

        res.json(producto);
}

//Actualizar Producto
exports.actualizarProducto = async (req, res, next) =>{
    try {

        let nuevoProducto = req.body;

        //Verificar si hay una imagen nueva
        if(req.file){
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Producto.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Producto.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto, {new: true});
        res.json(producto)

    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async (req, res, next) =>{
    try {
        await Producto.findOneAndDelete({_id: req.params.idProducto});
        res.json({mensaje: 'El producto ha sido eliminado'});
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.buscarProducto = async (req, res, next) =>{
    try {
        //Obtener el query
        const { query } = req.params;
        const producto = await Producto.find({ nombre: new RegExp(query, 'i') });
        res.json(producto);
        console.log(producto);

    } catch (error) {
        
        console.log(error);
        next();
    }
}


