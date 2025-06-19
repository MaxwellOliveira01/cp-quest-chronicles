
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfileSearch from "./pages/ProfileSearch";
import UniversitySearch from "./pages/UniversitySearch";
import ContestSearch from "./pages/ContestSearch";
import ProfileDetails from "./pages/ProfileDetails";
import UniversityDetails from "./pages/UniversityDetails";
import ContestDetails from "./pages/ContestDetails";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search/profile" element={<ProfileSearch />} />
          <Route path="/search/university" element={<UniversitySearch />} />
          <Route path="/search/contest" element={<ContestSearch />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/university/:id" element={<UniversityDetails />} />
          <Route path="/contest/:id" element={<ContestDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
