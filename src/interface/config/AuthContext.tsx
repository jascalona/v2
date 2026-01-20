import React, { createContext, useContext, useState, useEffect } from 'react';

// Definimos la estructura de los datos del usuario según tu JSON del back
interface UserData {
  co_role: number;
  co_usuario: string;
  nb_nombre: string;
  nb_apellido: string;
  tx_email: string;
  token: string;
}

interface AuthContextType {
  user: UserData | null;
  login: (data: UserData) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la app, verificamos si hay una sesión guardada
  useEffect(() => {
    const savedUser = localStorage.getItem('session_data');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (data: UserData) => {
    setUser(data);
    localStorage.setItem('session_data', JSON.stringify(data));
    localStorage.setItem('token', data.token); // Guardamos el token aparte para los interceptores
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
};