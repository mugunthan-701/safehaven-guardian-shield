
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { useLocation as useLocationContext } from '@/context/LocationContext';
import { Bell, BookOpen, Info, MapPin, MessageCircle, Phone, ShieldAlert, ShieldCheck } from 'lucide-react';
import SOSButton from '@/components/SOS/SOSButton';
import Navigation from '@/components/Layout/Navigation';
import SOSPanel from '@/components/SOS/SOSPanel';
import { useSOSAlert } from '@/context/SOSContext';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, user, userType } = useAuth();
  const { startTracking, location } = useLocationContext();
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
    
    // Start location tracking on dashboard load
    startTracking();
  }, [isAuthenticated, userType, navigate, startTracking]);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navigation />
      
      {isSOSActive && <SOSPanel />}
      
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-safehaven-primary">
              Welcome, {user?.name}
            </h1>
            <p className="text-safehaven-neutral-gray mt-1">
              Your digital shield for safety and support
            </p>
          </div>
          
          {/* SOS Button (Large for Dashboard) */}
          <div className="mb-8 flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-sm border">
            <div className="mb-4 text-center">
              <h2 className="text-xl font-semibold text-safehaven-primary mb-2">Emergency SOS</h2>
              <p className="text-safehaven-neutral-gray max-w-md mx-auto">
                Press the SOS button in case of emergency. This will immediately alert your emergency contacts and nearby authorities.
              </p>
            </div>
            <SOSButton size="lg" className="mt-2" />
            <div className="mt-4 text-sm text-safehaven-neutral-gray">
              {location ? (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1 text-safehaven-primary" />
                  Location tracking active
                </div>
              ) : (
                <div className="flex items-center">
                  <Info className="h-4 w-4 mr-1 text-amber-500" />
                  Enable location for better protection
                </div>
              )}
            </div>
          </div>
          
          {/* Quick Access Cards */}
          <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('/legal')}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-5 w-5 text-safehaven-primary" />
                  <CardTitle className="text-lg">Legal Assistance</CardTitle>
                </div>
                <CardDescription>Get help with legal issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-safehaven-primary text-white">Chat with Legal Assistant</Button>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('/counseling')}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="h-5 w-5 text-safehaven-primary" />
                  <CardTitle className="text-lg">Counseling</CardTitle>
                </div>
                <CardDescription>Connect with professional counselors</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-safehaven-primary text-white">Book a Session</Button>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleNavigation('/games')}>
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5 text-safehaven-primary" />
                  <CardTitle className="text-lg">Activities</CardTitle>
                </div>
                <CardDescription>Learn through interactive games</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-safehaven-primary text-white">Explore Activities</Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Emergency Contacts */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Emergency Contacts</h2>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {user?.emergencyContacts?.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center">
                        <div className="bg-safehaven-soft-purple p-2 rounded-full mr-3">
                          <Phone className="h-5 w-5 text-safehaven-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-safehaven-neutral-gray">{contact.relation}</div>
                        </div>
                      </div>
                      <Badge variant="outline" className="flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-safehaven-primary border-safehaven-primary border-dashed"
                  >
                    + Add Emergency Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Safety Tips */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Safety Tips</h2>
              <Button variant="ghost" size="sm" className="text-safehaven-primary">View All</Button>
            </div>
            <div className="bg-safehaven-soft-blue p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <ShieldAlert className="h-6 w-6 text-safehaven-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Stay Alert in Public Places</h3>
                  <p className="text-sm text-safehaven-neutral-gray mt-1">
                    Always be aware of your surroundings when in public places. Avoid using headphones at high volume that might prevent you from hearing important warnings or signals.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Notifications */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Recent Notifications</h2>
              <Button variant="ghost" size="sm" className="text-safehaven-primary" onClick={() => handleNavigation('/notifications')}>
                View All
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                <div className="p-4 border-b flex items-start space-x-3">
                  <div className="bg-safehaven-soft-purple p-2 rounded-full">
                    <Bell className="h-4 w-4 text-safehaven-primary" />
                  </div>
                  <div>
                    <div className="font-medium">New Safety Resource Available</div>
                    <div className="text-sm text-safehaven-neutral-gray mt-1">
                      Check out the new self-defense techniques in the Activities section.
                    </div>
                    <div className="text-xs text-safehaven-neutral-gray mt-2">2 hours ago</div>
                  </div>
                </div>
                
                <div className="p-4 flex items-start space-x-3">
                  <div className="bg-safehaven-soft-pink p-2 rounded-full">
                    <ShieldCheck className="h-4 w-4 text-safehaven-primary" />
                  </div>
                  <div>
                    <div className="font-medium">Safety Check Reminder</div>
                    <div className="text-sm text-safehaven-neutral-gray mt-1">
                      Don't forget to update your emergency contacts and check in regularly with family.
                    </div>
                    <div className="text-xs text-safehaven-neutral-gray mt-2">Yesterday</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
