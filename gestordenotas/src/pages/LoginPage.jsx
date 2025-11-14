//Importacion 
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styless/AuthPages.css"

function LoginPage(){ //Definimos componente
    //Declaracion de Estados
    const [userName, setUsername] = useState ("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    //Funcion que maneja el Login
    const handleLogin = (e) =>{
        e.preventDefault();

        //Obnenemos a usu
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.userName === userName && u.password === password);

            //Verificacion de Usuarios
        if(!user){
            alert("Usuario o contraeña incorrectos");
            return;
        }

        //Guarda al usu Act y redirige
        localStorage.setItem("loggedUser", JSON.stringify(user));
        alert(`Bienvenido ${user.userName}`);
        navigate("/");
    };

    return(
        <div className="auth-wrapper">
        <div className="auth-container">
            <h2>Iniciar Sesion</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Usuario" value={userName} onChange={(e) => setUsername(e.target.value)}
                />

                 <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit">Iniciar Sesion</button>

            </form>

            <p>¿No tienes Cuenta?{" "}
            <Link to="/register">Registrate Aqui</Link>
            </p>
        </div>
        </div>
    );

}

export default LoginPage
