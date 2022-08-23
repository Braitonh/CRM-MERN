import { createSlice } from '@reduxjs/toolkit';

export const productosSlice = createSlice({
    name: 'productos',
    initialState: {
        productos : []
    },
    reducers: {
        getProductos : (state, action) =>{
            state.productos = action.payload;
        },
        deleteProducto: (state , action) =>{
            state.productos = state.productos.filter( producto => producto._id !== action.payload );
        },
        setProducto: (state, action) =>{
            state.productos.push(action.payload);
        },
        updateProducto : (state, action) =>{
            
            state.productos = state.productos.map ( producto => {

                if(producto._id === action.payload._id){
                    return action.payload;
                }

                return producto;

            } )
        }
    },
});


export const { getProductos, deleteProducto,setProducto,updateProducto } = productosSlice.actions;
export default productosSlice.reducer;