
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserTypeSelector from '@/components/UserType/UserTypeSelector';

const UserTypePage: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/');
    }
    
    // Redirect to dashboard if user type is already selected
    if (userType) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-safehaven-soft-purple to-white p-4">
      <UserTypeSelector />
    </div>
  );
};

export default UserTypePage;
