import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Asegúrate de instalarlo: npm install axios
import '../../assets/css/login.css';

function Login() {
    const navigate = useNavigate();
    
    // Estados para capturar los datos
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores previos

        try {
            // Petición a tu API de Go
            const response = await axios.post("http://localhost:8081/api/login", {
                tx_email: email,
                tx_password: password
            });

            if (response.status === 200) {
                const { token, co_role, nombre } = response.data;

                // Guardar sesión en el navegador
                localStorage.setItem("token", token);
                localStorage.setItem("role", co_role);
                localStorage.setItem("userName", nombre);

                // Redirigir al home
                navigate('/home');
            }
        } catch (err) {
            // Manejo de errores (401, 500, etc.)
            const msg = err.response?.data?.error || "Error al conectar con el servidor";
            setError(msg);
        }
    };

    return (
        <>
            <div className="container-login">
                <div className="content-login">
                    <h3>Bienvenido</h3>
                    <small>Introduce tu email y contraseña para iniciar sesión</small>

                    {error && <div style={{color: 'red', marginTop: '10px'}}>{error}</div>}

                    <div className="inputs">
                        <input 
                            type="text" 
                            placeholder="Correo electronico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="btn-login">
                        <button onClick={handleLogin}>Iniciar Sesion</button>
                    </div>
                </div>

                <div className="container-image">
                    <div className="image"></div>
                    <div className="text-login">
                        <h4>Sistema de Gestión - Acceso Restringido</h4>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;