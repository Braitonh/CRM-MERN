import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import clienteAxios from "../../api/axios";
import { actualizarProducto } from "../../slices/productos/productosThunks";

import { MainLayout } from "../layout/MainLayout";


export const EditarProducto = () => {

  const dispatch = useDispatch()

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    imagen: '',

  })

  const [archivo, setArchivo] = useState('');

  //Consultar a la API por un producto por su ID
  const params = useParams();

  const navigate = useNavigate();

  const consultaAPI = async (id) => {
    const productoConsulta = await clienteAxios.get(`/productos/${id}`);
    setProducto(productoConsulta.data);
    
  }

  useEffect(() => {

    consultaAPI(params.id);

  }, []);

  //Colocando la informacion de los input
  const handleChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value
    })
  }

  const leerArchivo = (e) => {
    setArchivo(e.target.files[0]);

  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    dispatch(actualizarProducto(formData, params.id))

    setTimeout(() => {
      navigate('/productos');
    }, 1000);

  }


  return (
    <MainLayout>
      <h2>Editar Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Producto"
            name="nombre"
            defaultValue={producto.nombre}
            onChange={handleChange}

          />
        </div>

        <div className="campo">
          <label>Precio:</label>
          <input
            type="number"
            name="precio"
            min="0.00"
            step="0.01"
            placeholder="Precio"
            defaultValue={producto.precio}
            onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          {producto.imagen ? (
            <img  src={`http://localhost:5000/${producto.imagen}`} alt='imagen' width="300"/>
          ) : null
          }
          <input
            type="file"
            name="imagen"
            defaultValue={producto.imagen}
            onChange={leerArchivo}
          />
        </div>


        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto" />
        </div>
      </form>
    </MainLayout>
  )
}
