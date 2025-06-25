
import { Toaster } from "@/components/ui/toaster";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ProfileSearch from "./pages/search/ProfileSearch";
import UniversitySearch from "./pages/search/UniversitySearch";
import ContestSearch from "./pages/search/ContestSearch";
import TeamSearch from "./pages/search/TeamSearch";
import EventSearch from "./pages/search/EventSearch";
import ProfileDetails from "./pages/details/ProfileDetails";
import UniversityDetails from "./pages/details/UniversityDetails";
import ContestDetails from "./pages/details/ContestDetails";
import TeamDetails from "./pages/details/TeamDetails";
import EventDetails from "./pages/details/EventDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfiles from "./pages/admin/AdminProfiles";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminContests from "./pages/admin/AdminContests";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search/profile" element={<ProfileSearch />} />
        <Route path="/search/university" element={<UniversitySearch />} />
        <Route path="/search/contest" element={<ContestSearch />} />
        <Route path="/search/team" element={<TeamSearch />} />
        <Route path="/search/event" element={<EventSearch />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/university/:id" element={<UniversityDetails />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/profiles" element={<AdminProfiles />} />
        <Route path="/admin/universities" element={<AdminUniversities />} />
        <Route path="/admin/contests" element={<AdminContests />} />
        <Route path="/admin/teams" element={<AdminTeams />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
