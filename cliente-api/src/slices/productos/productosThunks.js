import clienteAxios from "../../api/axios";
import { deleteProducto, getProductos, setProducto, updateProducto } from "./productosSlice";



export const mostrarProductos = () => {
    return async (dispatch) => {
        const {
            data
        } = await clienteAxios.get('/productos')

        dispatch(getProductos(data))
    }
}

export const borrarProducto = (id) => {
    return async (dispatch) => {

        await clienteAxios.delete(`/productos/${id}`)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire(
                        'Borrado!',
                        res.data.mensaje,
                        'success'
                    )
                    dispatch(deleteProducto(id))
                }
            })



    }
}

export const agregarProducto = (formData) => {
    return async (dispatch) => {
        try {
            //Realizo la peticion a la Api POST
            await clienteAxios.post('/productos', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            })
                .then(res => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto registrado',
                        })
                        //Transforma Formdata a Json
                        // var object = {};
                        // formData.forEach((value, key) => object[key] = value);
                        // var json = JSON.stringify(object);

                    }
                })

        } catch (error) {
            console.log(error);
        }

    }
}

export const actualizarProducto = (formData, id) => {

    return async (dispatch) => {
        await clienteAxios.put(`/productos/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto actualizado',
                    })
                    //Transforma Formdata a Json
                        var object = {};
                        formData.forEach((value, key) => object[key] = value);
                        var json = JSON.stringify(object);
                    dispatch(updateProducto(json))
                }
            })


    }


}

