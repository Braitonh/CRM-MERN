const Clientes = require('../models/Clientes');

//Agregar un nuevo Cliente
exports.nuevoCliente = async (req, res, next) =>{
    const cliente = new Clientes(req.body);

    try {
        //Almacenar el registro
        await cliente.save();
        res.json({mensaje: 'Se agrego un nuevo cliente'});
    } catch (error) {
        res.send(error);
        next();
    }
};

//Mostrar todos los clientes
exports.mostrarClientes = async (req, res, next) =>{
    try {
        const clientes = await Clientes.find({})
        res.json(clientes)
    } catch (error) {
        res.send(error);
        next();
    }
};

//Mostrar un cliente por su ID
exports.mostrarCliente = async (req, res, next) =>{
    const cliente = await Clientes.findById(req.params.idCliente);

    if(!cliente){
        res.json({mensaje: 'Este Cliente no existe'});
        next();
    };

    res.json(cliente);

}

//Actualizar cliente
exports.actualizarCliente = async (req, res, next) =>{
    
    try {
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, req.body,{ new: true });
        res.json(cliente);
    } catch (error) {
        res.send(error);
        next();
    }

};

//Eliminar cliente
exports.eliminarCliente = async (req, res, next) =>{
    try {
        await Clientes.findOneAndDelete({_id: req.params.idCliente});
        res.json({mensaje: 'El cliente se ha eliminado'});
    } catch (error) {
        res.send(error);
        next();
    }
}

