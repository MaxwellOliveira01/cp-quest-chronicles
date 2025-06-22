
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfileSearch from "./pages/ProfileSearch";
import UniversitySearch from "./pages/UniversitySearch";
import ContestSearch from "./pages/ContestSearch";
import TeamSearch from "./pages/TeamSearch";
import ProfileDetails from "./pages/ProfileDetails";
import UniversityDetails from "./pages/UniversityDetails";
import ContestDetails from "./pages/ContestDetails";
import TeamDetails from "./pages/TeamDetails";
import EventDetails from "./pages/EventDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProfiles from "./pages/AdminProfiles";
import AdminUniversities from "./pages/AdminUniversities";
import AdminEvents from "./pages/AdminEvents";
import AdminTeams from "./pages/AdminTeams";
import AdminContests from "./pages/AdminContests";
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
          <Route path="/search/team" element={<TeamSearch />} />
          <Route path="/profile/:id" element={<ProfileDetails />} />
          <Route path="/university/:id" element={<UniversityDetails />} />
          <Route path="/contest/:id" element={<ContestDetails />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/profiles" element={<AdminProfiles />} />
          <Route path="/admin/universities" element={<AdminUniversities />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/contests" element={<AdminContests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
