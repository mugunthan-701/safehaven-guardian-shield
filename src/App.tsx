// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LocationProvider } from "./context/LocationContext";
import { SOSProvider } from "./context/SOSContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "./components/Layout/Navigation";

// Pages
import AuthPage from "./pages/AuthPage";
import UserTypePage from "./pages/UserTypePage";
import DashboardPage from "./pages/DashboardPage";
import LegalAssistancePage from "./pages/LegalAssistancePage";
import CounselingPage from "./pages/CounselingPage";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import NotificationsPage from "./pages/NotificationsPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          <SOSProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="min-h-screen bg-gray-50">
                <Navigation />
                <div className="container mx-auto px-4 py-6">
                  <Routes>
                    <Route path="/" element={<AuthPage />} />
                    <Route path="/user-type" element={<UserTypePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/legal" element={<LegalAssistancePage />} />
                    <Route path="/counseling" element={<CounselingPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route path="/games/:gameId" element={<GameDetailPage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                  </Routes>
                </div>
              </div>
            </TooltipProvider>
          </SOSProvider>
        </LocationProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;