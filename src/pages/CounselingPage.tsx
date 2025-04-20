
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Layout/Navigation';
import CounselorList from '@/components/Counseling/CounselorList';
import SOSPanel from '@/components/SOS/SOSPanel';
import { useSOSAlert } from '@/context/SOSContext';

const CounselingPage: React.FC = () => {
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
        <div className="max-w-7xl mx-auto">
          <CounselorList />
        </div>
      </main>
    </div>
  );
};

export default CounselingPage;
