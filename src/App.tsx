
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LocationProvider } from "./context/LocationContext";
import { SOSProvider } from "./context/SOSContext";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LocationProvider>
          <SOSProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
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
            </TooltipProvider>
          </SOSProvider>
        </LocationProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
