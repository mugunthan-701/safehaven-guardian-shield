
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";
import { useAuth } from './AuthContext';

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

interface LocationContextType {
  location: Location | null;
  isTracking: boolean;
  startTracking: () => void;
  stopTracking: () => void;
  getAddress: (latitude: number, longitude: number) => Promise<string>;
}

const LocationContext = createContext<LocationContextType>({
  location: null,
  isTracking: false,
  startTracking: () => {},
  stopTracking: () => {},
  getAddress: async () => '',
});

export const useLocation = () => useContext(LocationContext);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);
  const { updateUserLocation } = useAuth();

  // Mock geocoding function to get address from coordinates
  const getAddress = async (latitude: number, longitude: number): Promise<string> => {
    try {
      // In a real app, you'd use a geocoding service like Google Maps API
      // Simulate API call
      return `123 Safety Street, Secure City`;
    } catch (error) {
      console.error('Error getting address:', error);
      return 'Address unavailable';
    }
  };

  // Start watching user location
  const startTracking = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setIsTracking(true);
    
    const id = navigator.geolocation.watchPosition(
      async (position) => {
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        
        setLocation(newLocation);
        updateUserLocation(newLocation);
        
        // Get address for the location
        const address = await getAddress(newLocation.latitude, newLocation.longitude);
        setLocation(prev => prev ? { ...prev, address } : null);
      },
      (error) => {
        console.error("Error getting location:", error);
        toast.error("Unable to retrieve your location");
        setIsTracking(false);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );
    
    setWatchId(id);
  };

  // Stop watching user location
  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      setIsTracking(false);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  const value = {
    location,
    isTracking,
    startTracking,
    stopTracking,
    getAddress,
  };

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
