import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../assets/css/login.css';


function Login() {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Lógica de autenticación...
        const isAuthenticated = true;

        if (isAuthenticated) {
            // Redirige a la URL '/dashboard'
            navigate('/home');
        } else {
            alert('Credenciales incorrectas');
        }
    };



    return (
        <>
            <div className="container-login">
                <div className="content-login">
                    <h3>Bienvenido</h3>
                    <small>Introduce tu email y contraseña para iniciar sesión</small>

                    <div className="inputs">
                        <input type="text" placeholder="Correo electronico" />
                        <input type="password" placeholder="Contraseña" />
                    </div>

                    <div className="btn-login">
                        <button onClick={handleLogin}>Iniciar Sesion</button>
                    </div>
                </div>

                <div className="container-image">
                    <div className="image"></div>
                    <div className="text-login">
                        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h4>
                    </div>
                </div>

            </div>

        </>
    );
}

export default Login;