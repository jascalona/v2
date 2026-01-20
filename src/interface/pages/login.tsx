import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import '../../assets/css/login.css';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth(); // Extraemos la función login del contexto
    
    // Estados para el formulario
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Petición a tu API en Go
            const response = await axios.post("http://localhost:8081/api/login", {
                tx_email: email,
                tx_password: password
            });

            if (response.status === 200) {
                // response.data contiene: co_role, co_usuario, nb_apellido, nb_nombre, token, tx_email
                // La función login del contexto guardará todo automáticamente
                login(response.data);

                // Redirigimos al home
                navigate('/home');
            }
        } catch (err: any) {
            // Manejamos el error 401 o errores de conexión
            const message = err.response?.data?.error || "Error de conexión con el servidor";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-login">
            <div className="content-login">
                <h3>Bienvenido</h3>
                <small>Introduce tu email y contraseña para iniciar sesión</small>

                {/* Mostrar mensaje de error si existe */}
                {error && (
                    <div style={{ 
                        backgroundColor: '#ffebee', 
                        color: '#c62828', 
                        padding: '10px', 
                        borderRadius: '4px',
                        marginTop: '15px',
                        fontSize: '13px'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>
                    <div className="inputs">
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="btn-login">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? "Cargando..." : "Iniciar Sesión"}
                        </button>
                    </div>
                </form>
            </div>

            <div className="container-image">
                <div className="image"></div>
                <div className="text-login">
                    <h4>Gestión de Proyectos e Inventario v1.0</h4>
                </div>
            </div>
        </div>
    );
}

export default Login;