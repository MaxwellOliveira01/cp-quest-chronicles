
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileSearchModel } from "../../../api/models";
import { profileService } from "@/services/profileService";

const ProfileSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ProfileSearchModel[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      setLoading(true);
      try {
        const profiles = await profileService.list(value);
        setResults(profiles);
      } catch (error) {
        console.error("Error searching profiles:", error);
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
              Search Profiles
            </h1>
            <p className="text-gray-600">
              Find competitive programmers by name or handle
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for profiles..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {loading && (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {results.map((profile) => (
                <Link
                  key={profile.id}
                  to={`/profile/${profile.id}`}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {profile.name}
                      </h3>
                      <p className="text-gray-600">@{profile.handle}</p>
                      <p className="text-sm text-gray-500">{profile.university.name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && searchTerm && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No profiles found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSearch;
