
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, User } from "lucide-react";
import { profileService } from "@/services/profileService";
import { ProfileSearchModel } from "../../../api/models";

const ProfileSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState<ProfileSearchModel[]>([]);
  const [loading, setLoading] = useState(false);

  const searchProfiles = async (term: string) => {
    if (!term.trim()) {
      setProfiles([]);
      return;
    }
    
    setLoading(true);
    try {
      console.log("Searching for profiles with term:", term);
      const results = await profileService.list(term);
      console.log("Profile search results:", results);
      setProfiles(results);
    } catch (error) {
      console.error("Error searching profiles:", error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProfiles(searchTerm);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-3">
              <User className="w-8 h-8" />
              Search Profiles
            </CardTitle>
            <p className="text-gray-600">Find competitive programming profiles and view their contest history</p>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {loading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Searching...</p>
          </div>
        )}

        {profiles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <Link to={`/profile/${profile.id}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 mb-2">
                          {profile.name}
                        </h3>
                        <p className="text-gray-600 mb-1">@{profile.handle}</p>
                        <p className="text-sm text-gray-500">{typeof profile.university === 'string' ? profile.university : profile.university}</p>
                      </div>
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        )}

        {searchTerm && !loading && profiles.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No profiles found matching "{searchTerm}"</p>
          </div>
        )}

        {!searchTerm && (
          <div className="text-center py-8">
            <p className="text-gray-600">Enter a search term to find profiles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSearch;
