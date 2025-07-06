
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { universityService } from "@/services/universityService";
import { UniversityFullModel } from "../../../api/university";

const UniversityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<UniversityFullModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const university = await universityService.get(id);
        setUniversity(university);
      } catch (error) {
        console.error("Error fetching university details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!university) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">University not found</h1>
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
          onClick={() => navigate("/search/university")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">{university.name}</CardTitle>
            <p className="text-gray-600">University Profile</p>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {university.students.map((student, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Link to={`/person/${student.id}`}>
                      <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                        {student.name}
                      </h4>
                    </Link>
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
                {university.teams.map((team, index) => {
                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {team ? (
                        <Link to={`/team/${team.id}`}>
                          <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                            {team.name}
                          </h4>
                        </Link>
                      ) : (
                        <h4 className="font-semibold">{team.name}</h4>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UniversityDetails;
