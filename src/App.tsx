
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfileSearch from "./pages/search/ProfileSearch";
import UniversitySearch from "./pages/search/UniversitySearch";
import ContestSearch from "./pages/search/ContestSearch";
import TeamSearch from "./pages/search/TeamSearch";
import ProfileDetails from "./pages/details/ProfileDetails";
import UniversityDetails from "./pages/details/UniversityDetails";
import ContestDetails from "./pages/details/ContestDetails";
import TeamDetails from "./pages/details/TeamDetails";
import EventDetails from "./pages/details/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfiles from "./pages/admin/AdminProfiles";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminContests from "./pages/admin/AdminContests";
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
