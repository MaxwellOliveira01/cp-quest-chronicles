
import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PersonSearch from "./pages/search/PersonSearch";
import UniversitySearch from "./pages/search/UniversitySearch";
import ContestSearch from "./pages/search/ContestSearch";
import TeamSearch from "./pages/search/TeamSearch";
import EventSearch from "./pages/search/EventSearch";
import PersonDetails from "./pages/details/PersonDetails";
import UniversityDetails from "./pages/details/UniversityDetails";
import ContestDetails from "./pages/details/ContestDetails";
import TeamDetails from "./pages/details/TeamDetails";
import EventDetails from "./pages/details/EventDetails";
import ProfileDetails from "./pages/details/ProfileDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminPersons from "./pages/admin/AdminPersons";
import AdminUniversities from "./pages/admin/AdminUniversities";
import AdminContests from "./pages/admin/AdminContests";
import AdminTeams from "./pages/admin/AdminTeams";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminTeamResult from "./pages/admin/AdminTeamResult";
import AdminProblems from "./pages/admin/AdminProblems";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search/person" element={<PersonSearch />} />
        <Route path="/search/profile" element={<PersonSearch />} />
        <Route path="/search/university" element={<UniversitySearch />} />
        <Route path="/search/contest" element={<ContestSearch />} />
        <Route path="/search/team" element={<TeamSearch />} />
        <Route path="/search/event" element={<EventSearch />} />

        {/* <Route path="/person/:id" element={<PersonDetails />} />
        <Route path="/profile/:id" element={<ProfileDetails />} />
        <Route path="/university/:id" element={<UniversityDetails />} />
        <Route path="/contest/:id" element={<ContestDetails />} />
        <Route path="/team/:id" element={<TeamDetails />} />
        <Route path="/event/:id" element={<EventDetails />} /> */}
        
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/persons" element={<AdminPersons />} />
        <Route path="/admin/universities" element={<AdminUniversities />} />
        <Route path="/admin/contests" element={<AdminContests />} />
        <Route path="/admin/teams" element={<AdminTeams />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/team-result" element={<AdminTeamResult />} />
        <Route path="/admin/problems" element={<AdminProblems />} />

      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
