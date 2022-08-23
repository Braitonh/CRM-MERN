import { useEffect, useState } from "react"

import clienteAxios from "../../api/axios";

import { MainLayout } from "../layout/MainLayout"
import { DetallesPedido } from "./DetallesPedido";


export const Pedidos = () => {

    const [pedidos, setPedidos] = useState([]);

    const consultaAPI = async () => {
        const resultado = await clienteAxios.get('/pedidos');
        setPedidos(resultado.data)
    }

    useEffect(() => {
        consultaAPI();

    }, [pedidos])


    const confirmarBorrado = (id) =>{
        Swal.fire({
            title: 'Estas seguro que quieres eliminar?',
            text: "Esta accion no se puede deshacer!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Borrar!'
          }).then((result) => {
            if (result.isConfirmed) {
                borrarPedido(id)
              Swal.fire(
                'Borrado!',
                'El pedido ha sido eliminado correctamente',
                'success'
              )
            }
          })
    }

    const borrarPedido = async(id) =>{

        try {
            await clienteAxios.delete(`/pedidos/${id}`)
            const allPedidos = pedidos.filter(pedido => pedido._id !== id)
            setPedidos(allPedidos)



        } catch (error) {
            console.log(error);
        }

    }


    return (
        <MainLayout>
            <h2>Pedidos</h2>

            <ul className="listado-pedidos">
                { pedidos.map( pedido => (
                    <DetallesPedido 
                        key={pedido._id}
                        pedido = {pedido}
                        confirmarBorrado ={confirmarBorrado}
                    />
                ) )

                }
            </ul>
        </MainLayout>
    )
}
