
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import ContestPerformance from "@/components/ContestPerformance";
import { profileService } from "@/services/profileService";
import { ProfileFullModel } from "../../../api/models";

const ProfileDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileFullModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!id) return;
      
      setLoading(true);
      try {
        const foundProfile = await profileService.get(id);
        setProfile(foundProfile || null);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
          <Button onClick={() => navigate("/")}>Go back home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/search/profile")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-3xl">{profile.name}</CardTitle>
                <p className="text-xl text-gray-600">@{profile.handle}</p>
                <p className="text-gray-500">{profile.university.name}</p>
              </CardHeader>
            </Card>

            {profile.events && profile.events.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Events Participated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {profile.events.map((event, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Link to={`/event/${event.id}`}>
                          <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                            {event.name}
                          </h4>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <ContestPerformance contests={profile.contests} />
          </div>

          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Contest History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.contests.map((result, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <Link to={`/contest/${result.contest.id}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                          {result.contest.name}
                        </h4>
                      </Link>
                      <p className="text-sm text-gray-600">{result.contest.year}</p>
                      <p className="text-sm font-medium text-blue-600">
                        Position: {result.position}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.teams.map((team, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Link to={`/team/${team.id}`}>
                        <h4 className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer">
                          {team.name}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
