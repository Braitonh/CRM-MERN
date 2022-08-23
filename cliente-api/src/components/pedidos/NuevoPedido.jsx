import e from 'cors';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import clienteAxios from "../../api/axios";


import { MainLayout } from '../layout/MainLayout'
import { FormBuscarProducto } from './FormBuscarProducto';
import { FormCantidadProducto } from './FormCantidadProducto';

export const NuevoPedido = () => {

    //state
    const [cliente, setCliente] = useState({});
    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);
    const [total, setTotal] = useState(0);

    //extraer ID del cliente
    const params = useParams();

    const consultaAPI = async (id) => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
        setCliente(clienteConsulta.data);
    }

    useEffect(() => {

        consultaAPI(params.id)

        actualizarTotal();
    }, [productos])

    const buscarProducto = async ( e ) =>{
        e.preventDefault();

        //Obtener los productos de la busqueda
        const resultadoBusqueda = await clienteAxios.post(`productos/busqueda/${busqueda}`);

        if( resultadoBusqueda.data[0] ){

            let productoResultado = resultadoBusqueda.data[0];

            productoResultado.producto = resultadoBusqueda.data[0]._id;
            productoResultado.cantidad = 0;

            //Ponerlo en el state
            setProductos([...productos, productoResultado]);

        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No hay resultados',
              })
        }
    }

    //Almacenar los datos a buscar en el state
    const leerDatosBusqueda = ( e ) =>{
        setBusqueda(e.target.value)
      
    }
  
    //Actualizar la cantidad de productos
    const restarProducto = (i) =>{
        //copiar el arreglo original de productos
        const todosProductos = [...productos]

        //Valida si esta en 0
        if(todosProductos[i].cantidad ===0) return;

        //Decremento
        todosProductos[i].cantidad--;

        //Almacenar en el state
        setProductos(todosProductos);

    }

    const eliminarProductoPedido = (id) =>{
        const todosProductos = productos.filter(producto => producto.producto !== id);

        setProductos(todosProductos)
    }



    const sumarProducto = (i) =>{
        const todosProductos = [...productos];

        //Incremento
        todosProductos[i].cantidad++;

        //Almacenar en el state
        setProductos(todosProductos);
    }

    //Actualizar el total a pagar
    const actualizarTotal = () =>{
        if(productos.length === 0){
            setTotal(0);
            return;
        }

        //Calcular el total

        let nuevoTotal = 0;

        //Recorrer todos los productos sus cantidades y precios
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //Almacenar el total
        setTotal(nuevoTotal);

    }
    const navigate = useNavigate();
    //almacena el pedido en la BD
    const handleSubmit = async (e) =>{
        e.preventDefault();

        //Construir objeto
        const pedido = {
            "cliente": params.id,
            "pedido": productos,
            "total": total,
        }

       const res = await clienteAxios.post(`/pedidos/nuevo/${params.id}`, pedido);

       if(res.status === 200){
        Swal.fire({
            icon: 'success',
            title: 'Producto registrado',
        })
       }else{
        Swal.fire({
            icon: 'error',
            title: 'Error',
        })
       }

       setTimeout(() => {
        navigate('/pedidos');
      }, 1000);

    }


    return (

        <MainLayout>

            <h2>Nuevo Pedido</h2>

            <div className="ficha-cliente">
                <h3>Datos de Cliente</h3>
                <p>Nombre: {cliente.nombre} {cliente.apellido}</p>
                <p>Teléfono: {cliente.telefono}</p>
            </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerDatosBusqueda = {leerDatosBusqueda}
            
            />

            <ul className="resumen">
                {productos.map((producto, index) =>(
                    <FormCantidadProducto
                        key={producto.producto}
                        producto = {producto}
                        restarProducto = {restarProducto}
                        sumarProducto = {sumarProducto}
                        index = {index}
                        eliminarProductoPedido = {eliminarProductoPedido}
                    />
                ))
                }
                
            </ul>
    
                <p className='total'>Total a pagar: <span>$ {total}</span></p>

                {total>0 ?(

                    <form
                        onSubmit={handleSubmit}
                    >
                        <input 
                            type="submit"
                            className='btn btn-verde btn-block'
                            value='Realizar Pedido'                        
                        />
                    </form>

                ) : null
                }


        </MainLayout>




    )
}
