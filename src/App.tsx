
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { SOSProvider } from "./context/SOSContext";

// Pages
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import UserTypePage from "./pages/UserTypePage";
import DashboardPage from "./pages/DashboardPage";
import LegalAssistancePage from "./pages/LegalAssistancePage";
import CounselingPage from "./pages/CounselingPage";
import GamesPage from "./pages/GamesPage";
import GameDetailPage from "./pages/GameDetailPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <LocationProvider>
          <SOSProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path="/user-type" element={<UserTypePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/legal" element={<LegalAssistancePage />} />
                <Route path="/counseling" element={<CounselingPage />} />
                <Route path="/games" element={<GamesPage />} />
                <Route path="/games/:gameId" element={<GameDetailPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </SOSProvider>
        </LocationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
