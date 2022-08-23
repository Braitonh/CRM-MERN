import { Link } from "react-router-dom";

export const Asidebar = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link className="clientes" to='/'>Clientes</Link>
                <Link className="productos" to='/productos'>Productos</Link>
                <Link className="pedidos" to='/pedidos'>Pedidos</Link>
            </nav>
        </aside>
    )
}
