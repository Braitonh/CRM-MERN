import { Asidebar } from "./Asidebar"
import { Header } from "./Header"


export const MainLayout = ({children}) => {
  return (
    <>
        <Header/>

        <div className="grid contenedor contenido-principal">
            <Asidebar/>

            <main className="caja-contenido col-9">
                
                {children}
            </main>

        </div>
        
    
    </>
  )
}
