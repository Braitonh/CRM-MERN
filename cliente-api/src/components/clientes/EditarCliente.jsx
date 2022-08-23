import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import clienteAxios from "../../api/axios";

import { Formik } from 'formik';
import * as Yup from 'yup';

import { MainLayout } from "../layout/MainLayout"
import { actualizarCliente } from '../../slices/client/clienteThunks';


export const EditarCliente = () => {


    const [cliente, setCliente] = useState({
        nombre: '',
        precio: '',
    })

    const params = useParams();

    const dispatch = useDispatch()
    
    const navigate = useNavigate();

    //Traer un cliente segun su ID
    const traerCliente = async(id) =>{
  
            const {data} = await clienteAxios.get(`/clientes/${id}`)
            setCliente(data);
    }

    useEffect(() => {
   
        traerCliente(params.id);

    }, [])
    

   
    



    //SChema de validacion
    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre es obligatorio'),
        apellido: Yup.string().required('El apellido es obligatorio'),
        empresa: Yup.string().required('El empresa es obligatorio'),
        email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
        telefono: Yup.string().required('El password no puede ir vacio').min(6, 'El password deber ser al menos de 6 caracteres')
    })



    return (
        <MainLayout>
            <h2>Editar Cliente</h2>

            <Formik

                validationSchema={schemaValidacion}
                enableReinitialize
                initialValues={ cliente }
                onSubmit={(valores) =>{
                 
                    dispatch(actualizarCliente(valores, params.id));
                    setTimeout(() => {
                        navigate('/');
                      }, 1000);
                }}
            >

                {props => {


                    return (

                        <form onSubmit={props.handleSubmit}>
                            <legend>Llena todos los campos</legend>

                            <div className="campo">
                                <label>Nombre:</label>
                                <input
                                    type="text"
                                    placeholder="Nombre Cliente"
                                    name="nombre"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.nombre}
                                />
                            </div>

                            {
                                props.touched.nombre && props.errors.nombre ? (
                                    <div className='error'>

                                        <p className='font-bold'>*{props.errors.nombre}</p>
                                    </div>

                                ) : null
                            }



                            <div className="campo">
                                <label>Apellido:</label>
                                <input
                                    type="text"
                                    placeholder="Apellido Cliente"
                                    name="apellido"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.apellido}
                                />
                            </div>

                            {
                                props.touched.apellido && props.errors.apellido ? (
                                    <div className='error'>

                                        <p className='font-bold'>*{props.errors.apellido}</p>
                                    </div>

                                ) : null
                            }



                            <div className="campo">
                                <label>Empresa:</label>
                                <input
                                    type="text"
                                    placeholder="Empresa Cliente"
                                    name="empresa"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.empresa}
                                />
                            </div>

                            {
                                props.touched.empresa && props.errors.empresa ? (
                                    <div className='error'>

                                        <p className='font-bold'>*{props.errors.empresa}</p>
                                    </div>

                                ) : null
                            }

                            <div className="campo">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    placeholder="Email Cliente"
                                    name="email"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.email}
                                />
                            </div>

                            {
                                props.touched.email && props.errors.email ? (
                                    <div className='error'>

                                        <p className='font-bold'>*{props.errors.email}</p>
                                    </div>

                                ) : null
                            }


                            <div className="campo">
                                <label>Teléfono:</label>
                                <input
                                    type="text"
                                    placeholder="Teléfono Cliente"
                                    name="telefono"
                                    onChange={props.handleChange}
                                    onBlur={props.handleBlur}
                                    value={props.values.telefono}
                                />
                            </div>

                            {
                                props.touched.telefono && props.errors.telefono ? (
                                    <div className='error'>

                                        <p className='font-bold'>*{props.errors.telefono}</p>
                                    </div>

                                ) : null
                            }


                            <div className="enviar">
                                <input type="submit" className="btn btn-azul" value="Editar Cliente" />
                            </div>

                        </form>

                    )
                }}

            </Formik>


        </MainLayout>
    )
}
