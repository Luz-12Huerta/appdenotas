//Importacion
import { Navigate } from "react-router-dom";

function ProtectedRoute ({children}) {
    //Busca si existe un usuario
    const user = JSON.parse(localStorage.getItem("loggedUser"));
    //Condicion de proteccion
    if (!user) {
        return <Navigate to="/login" replace />;

    }
    return children;


}

export default ProtectedRoute
