import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import '../../assets/css/login.css';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8081/api/login", {
                tx_email: email,
                tx_password: password
            });

            if (response.status === 200) {
                login(response.data);
                navigate('/home');
            }
        } catch (err: any) {
            const message = err.response?.data?.error || "Error de conexión con el servidor";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="login-page-wrapper">
            <div className="container-login">
                <div className="content-login">
                    <h3>Hola de nuevo</h3>
                    <small>Ingresa tus datos para continuar</small>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleLogin}>
                        <div className="inputs">
                            <input
                                type="email"
                                placeholder="Email profesional"
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
                                {isLoading ? "Validando..." : "Acceder"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="container-image">
                    <div className="image-placeholder">
                        <span><PrivacyTipIcon sx={{color: '#a4a3a3', fontSize: 50}}/></span>
                    </div>
                    <div className="text-login">
                        <h4>System Helpdesk</h4>
                        <span>v1.0.2 • Helpdesk</span>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Login;