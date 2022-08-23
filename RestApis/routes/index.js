const express = require('express');
const router = express.Router();


const clienteController = require('../controllers/clienteController')
const productosController = require('../controllers/productosController')
const pedidosController = require('../controllers/pedidosController')

module.exports = function(){

    /** CLIENTES **/

    //Agregar nuevos clientes via POST
    router.post('/clientes', clienteController.nuevoCliente );

    //Obtener todos los clientes
    router.get('/clientes', clienteController.mostrarClientes);

    //Mostrar un cliente por ID
    router.get('/clientes/:idCliente', clienteController.mostrarCliente);

    //Actualizar un cliente
    router.put('/clientes/:idCliente', clienteController.actualizarCliente);

    //Eliminar un cliente
    router.delete('/clientes/:idCliente', clienteController.eliminarCliente);

    /** PRODUCTOS **/

    //Agregar nuevos productos
    router.post('/productos', 
        productosController.subirArchivo,
        productosController.nuevoProducto
    );

    //Mostrar todos los productos
    router.get('/productos', productosController.mostrarProductos);

    //Mostrar Producto por ID
    router.get('/productos/:idProducto',productosController.mostrarProducto);

    //Actualizar Producto
    router.put('/productos/:idProducto', 
        productosController.subirArchivo,
        productosController.actualizarProducto,
    );

    //Eliminar Producto
    router.delete('/productos/:idProducto', productosController.eliminarProducto)

    //Buscar Producto
    router.post('/productos/busqueda/:query', productosController.buscarProducto)

    /** Pedidos **/

    //Agregar un pedido
    router.post('/pedidos/nuevo/:idUsuario', pedidosController.nuevoPedido)

    //Mostrar todos los pedidos
    router.get('/pedidos', pedidosController.mostrarPedidos)

    //Mostrar Pedido segun ID
    router.get('/pedidos/:idPedido', pedidosController.mostrarPedido)
    
    //Actualizar pedido
    router.put('/pedidos/:idPedido', pedidosController.actualizarPedido)

    //Eliminar Producto
    router.delete('/pedidos/:idPedido', pedidosController.eliminarPedido)

    return router;
}