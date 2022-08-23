import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

import { mostrarClientes } from '../../slices/client/clienteThunks';


import { MainLayout } from '../layout/MainLayout';

import { Cliente } from './Cliente';


export const Clientes = () => {

    const {clientes} = useSelector( state => state.cliente );
    
    const dispatch = useDispatch();

    //Al cargar el componente trae los cliente de la api
    useEffect(() => {
        
        dispatch(mostrarClientes()) ;
    }, [])
    
    
    return (

        <MainLayout>
            <h2>Clientes</h2>

            <Link to='clientes/nuevo' className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className='listado-clientes'>
            {clientes.map(cliente =>(
                    
                    <Cliente
                        key={cliente.email}
                        cliente = {cliente}
                    />
                ))

                }
            </ul>

        </MainLayout>



    )
}
