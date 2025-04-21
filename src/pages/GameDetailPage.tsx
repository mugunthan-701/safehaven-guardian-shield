
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navigation from '@/components/Layout/Navigation';
import BrainBoosterQuiz from '@/components/Games/BrainBoosterQuiz';
import SOSPanel from '@/components/SOS/SOSPanel';
import { useSOSAlert } from '@/context/SOSContext';

const GameDetailPage: React.FC = () => {
  const { isSOSActive } = useSOSAlert();
  const navigate = useNavigate();
  const { gameId } = useParams<{ gameId: string }>();

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (!userType) {
      navigate('/user-type', { replace: true });
    }
  }, [navigate]);

  // Render appropriate game component based on gameId
  const renderGame = () => {
    switch (gameId) {
      case 'brain-booster':
        return <BrainBoosterQuiz />;
      // Additional game components would be added here
      default:
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-safehaven-primary mb-4">
              Under Development
            </h2>
            <p className="text-safehaven-neutral-gray">
              This activity is currently being developed. Please check back soon!
            </p>
            <button
              onClick={() => navigate('/games')}
              className="mt-6 px-4 py-2 bg-safehaven-primary text-white rounded-md"
            >
              Return to Activities
            </button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      
      {isSOSActive && <SOSPanel />}
      
      <main className="flex-grow">
        {renderGame()}
      </main>
    </div>
  );
};

export default GameDetailPage;
