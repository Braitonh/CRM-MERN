import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { borrarProducto } from "../../slices/productos/productosThunks";

export const Producto = ({ producto }) => {

  const { _id, nombre, precio, imagen } = producto;

  const dispatch = useDispatch();

  //Eliminar un Producto
  const handleDelete = (_id) => {


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
        dispatch(borrarProducto(_id))
      }
  })

    
  }

  return (
    <li className="producto">
      <div className="info-producto">
        <p className="nombre">{nombre}</p>
        <p className="precio">$ {precio}</p>
        {imagen ? (
          <img src={`http://localhost:5000/${imagen}`} />
        ) : null
        }

      </div>
      <div className="acciones">
        <Link to={`/productos/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Producto
        </Link>

        <button 
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => handleDelete(_id)}
        >
          <i className="fas fa-times"></i>
          Eliminar Producto
        </button>
      </div>
    </li>
  )
}
