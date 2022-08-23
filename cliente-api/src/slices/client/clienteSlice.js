import { createSlice } from '@reduxjs/toolkit';

export const clienteSlice = createSlice({
    name: 'cliente',
    initialState: {
        clientes : []
        
    },
    reducers: {
        getClientes: (state, action) =>{    //Trae los clientes de la api y lo guarda en el state
            state.clientes = action.payload;
        },
        setClientes: (state, action) =>{    //Crea un nuevo Cliente
            state.clientes.push(action.payload);
        },
        updateCliente: (state, action) =>{

            state.clientes = state.clientes.map ( cliente => {

                if(cliente._id === action.payload._id){
                    return action.payload;
                }

                return cliente;

            } )

        },
        deleteCliente: (state , action) =>{
            state.clientes = state.clientes.filter( cliente => cliente._id !== action.payload );
        }

    },
});


export const { getClientes,setClientes, updateCliente, deleteCliente } = clienteSlice.actions;
export default clienteSlice.reducer;