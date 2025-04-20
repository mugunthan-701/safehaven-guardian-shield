
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import { Shield, User, Users } from 'lucide-react';

const UserTypeSelector: React.FC = () => {
  const { setUserType } = useAuth();

  return (
    <div className="w-full max-w-4xl px-4 py-8 mx-auto animate-fade-in">
      <div className="flex flex-col items-center justify-center mb-8">
        <Shield className="w-16 h-16 text-safehaven-primary mb-4" />
        <h1 className="text-3xl font-bold text-center text-safehaven-primary">
          Welcome to SafeHaven
        </h1>
        <p className="text-safehaven-neutral-gray text-center max-w-xl mt-2">
          Your digital shield for protection and support. Please select who you are so we can customize your experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card 
          className="border-2 border-safehaven-soft-purple hover:border-safehaven-primary transition-all cursor-pointer"
          onClick={() => setUserType('woman')}
        >
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-safehaven-primary text-xl">I am a Woman</CardTitle>
            <CardDescription>Support for women's safety, rights & wellbeing</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <User className="h-24 w-24 text-safehaven-primary mb-4" />
            <ul className="text-sm space-y-2 text-safehaven-neutral-gray">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Legal assistance tailored for women
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Women-specific safety features & resources
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Connect with women counselors
              </li>
            </ul>
            <Button className="safehaven-btn safehaven-btn-primary mt-6 w-full" onClick={() => setUserType('woman')}>
              Continue as Woman
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="border-2 border-safehaven-soft-blue hover:border-safehaven-primary transition-all cursor-pointer" 
          onClick={() => setUserType('child')}
        >
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-safehaven-primary text-xl">I am a Child</CardTitle>
            <CardDescription>Support for children's safety, wellbeing & education</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Users className="h-24 w-24 text-safehaven-primary mb-4" />
            <ul className="text-sm space-y-2 text-safehaven-neutral-gray">
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Child-friendly games & educational content
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Easy-to-understand safety information
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-safehaven-primary mr-2"></div>
                Child protection resources & support
              </li>
            </ul>
            <Button className="safehaven-btn safehaven-btn-primary mt-6 w-full" onClick={() => setUserType('child')}>
              Continue as Child
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserTypeSelector;
