import clienteAxios from "../../api/axios";

import {  deleteCliente, getClientes, setClientes, updateCliente } from "./clienteSlice";

export const mostrarClientes = () =>{
    return async (dispatch) =>{
        //Realizo peticion a la api GET
        const {data} = await clienteAxios.get('/clientes')

        dispatch ( getClientes( data ) );
    }
}

export const mostrarUnCliente = async (id) =>{
    const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

    console.log(clienteConsulta.data);
}

export const agregarCliente = (nuevoCliente) =>{
    return async ( dispatch ) =>{

        //Realizo la peticion a la Api POST
            await clienteAxios.post('/clientes', nuevoCliente )
                .then( res =>{
                    if(res.data.code === 11000) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Cliente ya registrado!',
                          })
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: 'Cliente registrado',
                          })
                          dispatch ( setClientes(nuevoCliente) )

                    
                    }
                } )
    } 
}

export const actualizarCliente = (clienteActualizado, id) =>{

    return async (dispatch ) =>{
        await clienteAxios.put(`/clientes/${id}`, clienteActualizado )

        if( clienteActualizado ){

            Swal.fire({
                icon: 'success',
                title: 'Cliente Actualizado',
                })
                  
        dispatch(updateCliente(clienteActualizado))

        }


    }

}

export const borrarCliente = (id) =>{
    return async (dispatch) =>{

        await clienteAxios.delete(`/clientes/${id}` )
        dispatch(deleteCliente(id))
    }
}



