import React from 'react'
import { Link } from 'react-router-dom'

export const DetallesPedido = ({ pedido, confirmarBorrado }) => {

    const { cliente } = pedido

    return (
        <li className="pedido">
            <div className="info-pedido">
                <p className="id">ID: {pedido._id}</p>
                <p className="nombre">Cliente: {cliente.nombre} {cliente.apellido}</p>

                <div className="articulos-pedido">
                    <p className="productos">Artículos Pedido: </p>
                    <ul>

                        {pedido.pedido.map(articulo => (
                            <li key={pedido._id+articulo.producto._id}>
                                <p>Articulo: {articulo.producto.nombre}</p>
                                <p>Precio: $ {articulo.producto.precio}</p>
                                <p>Cantidad: {articulo.cantidad}</p>
                            </li>
                        ))
                        }

                    </ul>
                </div>
                <p className="total">Total: $ {pedido.total} </p>
            </div>
            <div className="acciones">
                <Link to={`/pedidos/${pedido._id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Pedido
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => confirmarBorrado(pedido._id)}
                >
                    <i className="fas fa-times"></i>
                    Eliminar Pedido
                </button>
            </div>
        </li>
    )
}
