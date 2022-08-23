import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

//Thunks
import { mostrarProductos } from '../../slices/productos/productosThunks';

//componentes
import { MainLayout } from '../layout/MainLayout'
import { Producto } from './Producto';

export const Productos = () => {

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch ( mostrarProductos() )

    }, [])

    const {productos} = useSelector( state => state.producto );


    
    return (



        <MainLayout>
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(producto => (
                    <Producto 
                        key={producto._id}
                        producto = {producto}
                    />
                ))

                }
            </ul>

        </MainLayout>

    )
}
