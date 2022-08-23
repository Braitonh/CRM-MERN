import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';

import { MainLayout } from "../layout/MainLayout"


import clienteAxios from "../../api/axios";
import { agregarProducto } from '../../slices/productos/productosThunks';


export const NuevoProducto = () => {

  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
  })

  const [archivo, setArchivo] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate();

 //Colocando la informacion de los input
  const handleChange = (e) =>{
    setProducto({
      ...producto,
      [e.target.name] : e.target.value
    }) 
  }
  
  const leerArchivo = (e) =>{
    setArchivo(e.target.files[0]);
    
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombre', producto.nombre);
    formData.append('precio', producto.precio);
    formData.append('imagen', archivo);

    dispatch(agregarProducto(formData))

    setTimeout(() => {
      navigate('/productos');
    }, 1000);

  }

  return (
    <MainLayout>
      <h2>Nuevo Producto</h2>

      <form onSubmit={handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
           type="text" 
           placeholder="Nombre Producto" 
           name="nombre"
           value={producto.nombre}
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
          value={producto.precio}
          onChange={handleChange}
          />
        </div>

        <div className="campo">
          <label>Imagen:</label>
          <input 
          type="file" 
          name="imagen"
          value={producto.imagen} 
          onChange={leerArchivo}
          />
        </div>
        

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Producto"/>
        </div>
      </form>
    </MainLayout>
  )
}
