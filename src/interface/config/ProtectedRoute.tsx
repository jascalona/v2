import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    const location = useLocation();

    //  Mientras el contexto verifica si hay un usuario guardado,
    // mostramos una pantalla de carga o nada para evitar parpadeos.
    if (loading) {
        return <div>Cargando sesión...</div>; 
    }

    // Si no hay usuario (ni token), redirigimos al login.
    // Guardamos la ubicación actual para poder regresar después del login si quisieras.
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    // Si hay usuario, renderizamos las rutas hijas (Layout y demás).
    return <Outlet />;
};

export default ProtectedRoute;