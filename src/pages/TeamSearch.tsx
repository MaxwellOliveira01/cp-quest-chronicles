
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { dataService, Team } from "@/services/dataService";

const TeamSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Team[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      setLoading(true);
      try {
        const teams = await dataService.getTeams();
        const filtered = teams.filter(
          team => 
            team.name.toLowerCase().includes(value.toLowerCase()) ||
            team.university.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error("Error searching teams:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Search Teams
            </h1>
            <p className="text-gray-600">
              Find competitive programming teams by name or university
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for teams..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {results.map((team) => (
                <Link
                  key={team.id}
                  to={`/team/${team.id}`}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {team.name}
                      </h3>
                      <p className="text-gray-600">{team.university}</p>
                      <p className="text-sm text-gray-500">
                        Members: {team.members.map(m => m.name).join(", ")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {team.members.length} members
                      </p>
                      <p className="text-sm text-gray-500">
                        {team.contests.length} contests
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No teams found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamSearch;
