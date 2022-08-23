import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <>
            <header className="barra">
                <div className="contenedor">
                <Link className="clientes" to='/'><h1>CRM - Administrador de Clientes</h1></Link>
                    
                </div>
            </header>
        </>
    )
}
