import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { borrarCliente } from '../../slices/client/clienteThunks';

export const Cliente = ({cliente}) => {
    
    const { _id,nombre, apellido, empresa, email, telefono} = cliente;

    const dispatch = useDispatch()

    const handleDelete = (_id) =>{

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
                dispatch(borrarCliente(_id))
              Swal.fire(
                'Borrado!',
                'El cliente ha sido eliminado correctamente',
                'success'
              )
            }
          })

        
    }
    
    return (
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{nombre} {apellido}</p>
                <p className="empresa">{empresa}</p>
                <p>{email}</p>
                <p>{telefono}</p>
            </div>
            <div className="acciones">
                <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <Link to={`/pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                    <i className="fas fa-plus"></i>
                    Nuevo Pedido
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => handleDelete(_id)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}
