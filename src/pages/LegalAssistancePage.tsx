
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Layout/Navigation';
import LegalChatbot from '@/components/Legal/LegalChatbot';
import SOSPanel from '@/components/SOS/SOSPanel';
import { useSOSAlert } from '@/context/SOSContext';

const LegalAssistancePage: React.FC = () => {
  const { isAuthenticated, userType } = useAuth();
  const { isSOSActive } = useSOSAlert();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/');
      return;
    }
    
    // Redirect to user type selection if no user type
    if (!userType) {
      navigate('/user-type');
      return;
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {isSOSActive && <SOSPanel />}
      
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-5xl mx-auto h-[calc(100vh-12rem)]">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-safehaven-primary">
              Legal Assistance
            </h1>
            <p className="text-safehaven-neutral-gray">
              Get confidential legal guidance and information about your rights
            </p>
          </div>
          
          <div className="h-[calc(100%-4rem)]">
            <LegalChatbot />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalAssistancePage;
