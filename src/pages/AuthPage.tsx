
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect to user type selection if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/user-type');
    }
  }, [isAuthenticated, navigate]);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-safehaven-soft-purple to-white p-4">
      <div className="max-w-md w-full">
        {isLogin ? (
          <LoginForm onSwitchToRegister={toggleAuthMode} />
        ) : (
          <RegisterForm onSwitchToLogin={toggleAuthMode} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
