
import { useState, useEffect } from 'react';

interface AdminCredentials {
  username: string;
  password: string;
}

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Credenciais padrão
  const DEFAULT_CREDENTIALS: AdminCredentials = {
    username: 'admin',
    password: 'admin123'
  };

  useEffect(() => {
    // Verificar se há uma sessão ativa
    const adminSession = localStorage.getItem('admin_session');
    if (adminSession) {
      const session = JSON.parse(adminSession);
      const now = new Date().getTime();
      // Verificar se a sessão não expirou (24 horas)
      if (session.expires > now) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('admin_session');
      }
    }
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    // Obter credenciais salvas ou usar padrão
    const savedCredentials = localStorage.getItem('admin_credentials');
    const credentials = savedCredentials 
      ? JSON.parse(savedCredentials) 
      : DEFAULT_CREDENTIALS;

    if (username === credentials.username && password === credentials.password) {
      const expires = new Date().getTime() + (24 * 60 * 60 * 1000); // 24 horas
      const session = { expires };
      localStorage.setItem('admin_session', JSON.stringify(session));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('admin_session');
    setIsAuthenticated(false);
  };

  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    const savedCredentials = localStorage.getItem('admin_credentials');
    const credentials = savedCredentials 
      ? JSON.parse(savedCredentials) 
      : DEFAULT_CREDENTIALS;

    if (currentPassword === credentials.password) {
      const newCredentials = {
        ...credentials,
        password: newPassword
      };
      localStorage.setItem('admin_credentials', JSON.stringify(newCredentials));
      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    loading,
    login,
    logout,
    changePassword
  };
};
