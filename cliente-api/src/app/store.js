import { configureStore } from '@reduxjs/toolkit';

import clienteReducer from '../slices/client/clienteSlice';
import productoReducer from '../slices/productos/productosSlice';

export const store = configureStore({
  reducer: {
    cliente : clienteReducer,
    producto : productoReducer,
  },
})