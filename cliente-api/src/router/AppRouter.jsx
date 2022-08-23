import { Route, Routes } from "react-router-dom"
import { MainRoute } from "./MainRoute"

export const AppRouter = () => {
  return (
    <Routes>

        <Route path="/*" element={ <MainRoute /> } />


    </Routes>
  )
}
