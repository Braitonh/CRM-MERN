import {Routes, Route, Navigate} from "react-router-dom"

//Clientes
import { Clientes } from "../components/clientes/Clientes"
import { EditarCliente } from "../components/clientes/EditarCliente"
import { NuevoCliente } from "../components/clientes/NuevoCliente"

//Productos
import { EditarProducto } from "../components/productos/EditarProducto"
import { NuevoProducto } from "../components/productos/NuevoProducto"
import { Productos } from "../components/productos/Productos"

//Productos
import { Pedidos } from "../components/pedidos/Pedidos"
import { NuevoPedido } from "../components/pedidos/NuevoPedido"
import { EditarPedido } from "../components/pedidos/EditarPedido"

export const MainRoute = () => {
  return (
    <Routes>

        {/* RUTAS CLIENTES */}
        <Route path="/" element={ <Clientes/> } />
        <Route path="/clientes/nuevo" element={ <NuevoCliente/> } />
        <Route path="/clientes/editar/:id" element={ <EditarCliente/> } />

        {/* RUTAS CLIENTES */}
        <Route path="/productos" element={ <Productos/> } />
        <Route path="/productos/nuevo" element={ <NuevoProducto/> } />
        <Route path="/productos/editar/:id" element={ <EditarProducto/> } />

        {/* RUTAS PEDIDOS */}
        <Route path="/pedidos" element={ <Pedidos/> } />
        <Route path="/pedidos/nuevo/:id" element={ <NuevoPedido/> } />
        <Route path="/pedidos/:id" element={ <EditarPedido/> } />

        <Route path="/*" element={ <Navigate to= '/' /> } />

    </Routes>
  )
}
