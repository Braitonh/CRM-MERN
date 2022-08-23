import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

import { useFormik } from 'formik';
import * as Yup from 'yup';


import { MainLayout } from "../layout/MainLayout"

import { agregarCliente } from '../../slices/client/clienteThunks';


export const NuevoCliente = () => {

  const dispatch = useDispatch();

  //useNavigate para que al precionar el boton de agregar vuelva a la pagina del listado de productos
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      empresa: '',
      email: '',
      telefono: '',
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      apellido: Yup.string().required('El apellido es obligatorio'),
      empresa: Yup.string().required('El empresa es obligatorio'),
      email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
      telefono: Yup.string().required('El password no puede ir vacio').min(6, 'El password deber ser al menos de 6 caracteres')
    }),
    onSubmit: valores => {
     
      dispatch(agregarCliente(valores))

      setTimeout(() => {
        navigate('/');
      }, 1000);

    }
  });



  return (
    <MainLayout>
      <h2>Nuevo Cliente</h2>
      <form onSubmit={formik.handleSubmit}>
        <legend>Llena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre Cliente"
            name="nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />


        </div>

        {
          formik.touched.nombre && formik.errors.nombre ? (
            <div className='error'>

              <p className='font-bold'>*{formik.errors.nombre}</p>
            </div>

          ) : null
        }

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido Cliente"
            name="apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {
          formik.touched.apellido && formik.errors.apellido ? (
            <div className='error'>

              <p className='font-bold'>*{formik.errors.apellido}</p>
            </div>

          ) : null
        }

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa Cliente"
            name="empresa"
            value={formik.values.empresa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {
          formik.touched.empresa && formik.errors.empresa ? (
            <div className='error'>

              <p className='font-bold'>*{formik.errors.empresa}</p>
            </div>

          ) : null
        }

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email Cliente"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {
          formik.touched.email && formik.errors.email ? (
            <div className='error'>

              <p className='font-bold'>*{formik.errors.email}</p>
            </div>

          ) : null
        }

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="text"
            placeholder="Teléfono Cliente"
            name="telefono"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        {
          formik.touched.telefono && formik.errors.telefono ? (
            <div className='error'>

              <p className='font-bold'>*{formik.errors.telefono}</p>
            </div>

          ) : null
        }

        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Agregar Cliente" />
        </div>

      </form>

    </MainLayout>
  )
}
