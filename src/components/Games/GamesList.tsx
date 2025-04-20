
import React from 'react';
import GameCard from './GameCard';
import { BookOpen, Brain, Map, MessageCircle, Shield, Star, User, Flower } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const GamesList: React.FC = () => {
  const { userType } = useAuth();
  
  const allGames = [
    {
      id: 'safety-quest',
      title: 'Safety Quest',
      description: 'Navigate through scenarios and learn how to stay safe in different situations.',
      icon: <Shield className="h-5 w-5 text-safehaven-primary" />,
      category: 'Scenarios',
      difficulty: 'Easy' as const,
      duration: '5-10 min',
      path: '/games/safety-quest',
      forUserType: ['woman', 'child'],
    },
    {
      id: 'brain-booster',
      title: 'Brain Booster Quiz',
      description: 'Test your knowledge on safety, rights, and legal protection with 25 questions.',
      icon: <Brain className="h-5 w-5 text-safehaven-primary" />,
      category: 'Quiz',
      difficulty: 'Medium' as const,
      duration: '10-15 min',
      path: '/games/brain-booster',
      forUserType: ['woman', 'child'],
    },
    {
      id: 'self-defense',
      title: 'Self-Defense Moves',
      description: 'Learn essential self-defense techniques with step-by-step instructions.',
      icon: <User className="h-5 w-5 text-safehaven-primary" />,
      category: 'Physical',
      difficulty: 'Medium' as const,
      duration: '15-20 min',
      path: '/games/self-defense',
      forUserType: ['woman'],
    },
    {
      id: 'voice-challenge',
      title: 'Voice Challenge',
      description: 'Practice voice commands for emergency situations with AI feedback.',
      icon: <MessageCircle className="h-5 w-5 text-safehaven-primary" />,
      category: 'Interactive',
      difficulty: 'Easy' as const,
      duration: '5 min',
      path: '/games/voice-challenge',
      forUserType: ['woman', 'child'],
    },
    {
      id: 'memory-game',
      title: 'Know Your Rights',
      description: 'Match cards to learn about important laws and rights protecting you.',
      icon: <BookOpen className="h-5 w-5 text-safehaven-primary" />,
      category: 'Memory',
      difficulty: 'Easy' as const,
      duration: '5-10 min',
      path: '/games/memory-game',
      forUserType: ['woman', 'child'],
    },
    {
      id: 'map-hunt',
      title: 'Map Hunt: Escape to Safety',
      description: 'Navigate virtual maps to find safe zones and escape dangerous situations.',
      icon: <Map className="h-5 w-5 text-safehaven-primary" />,
      category: 'Navigation',
      difficulty: 'Medium' as const,
      duration: '10 min',
      path: '/games/map-hunt',
      forUserType: ['woman', 'child'],
    },
    {
      id: 'roleplay-adventure',
      title: 'Roleplay Adventure',
      description: 'Play different roles in emergency scenarios to understand how to respond.',
      icon: <Star className="h-5 w-5 text-safehaven-primary" />,
      category: 'Roleplay',
      difficulty: 'Hard' as const,
      duration: '15 min',
      path: '/games/roleplay',
      forUserType: ['woman'],
    },
    {
      id: 'relaxation-zone',
      title: 'Relaxation Zone',
      description: 'Guided breathing exercises and relaxation techniques to reduce stress.',
      icon: <Flower className="h-5 w-5 text-safehaven-primary" />,
      category: 'Wellness',
      difficulty: 'Easy' as const,
      duration: '5-10 min',
      path: '/games/relaxation',
      forUserType: ['woman', 'child'],
    },
  ];

  // Filter games based on user type
  const filteredGames = userType 
    ? allGames.filter(game => game.forUserType.includes(userType)) 
    : allGames;

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-safehaven-primary">Gamified Activities</h2>
        <p className="text-safehaven-neutral-gray">
          Learn essential safety skills and knowledge through interactive activities
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredGames.map((game) => (
          <GameCard key={game.id} {...game} />
        ))}
      </div>
    </div>
  );
};

export default GamesList;
