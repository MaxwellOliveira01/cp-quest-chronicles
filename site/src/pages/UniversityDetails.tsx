
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { dataService, University, Contest } from "@/services/dataService";

const UniversityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [university, setUniversity] = useState<University | null>(null);
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      if (!id) return;
      
      try {
        const [foundUniversity, contestsData] = await Promise.all([
          dataService.findUniversity(id),
          dataService.getContests()
        ]);
        
        setUniversity(foundUniversity || null);
        setContests(contestsData);
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
                    <Link to={`/profile/${student.profileId}`}>
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
              <CardTitle>Contests Participated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {university.contests.map((contestName, index) => {
                  const contest = contests.find(c => c.name === contestName);
                  return (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      {contest ? (
                        <Link to={`/contest/${contest.id}`}>
                          <h4 className="font-semibold text-blue-600 hover:text-blue-800">
                            {contestName}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {contest.teams.length} teams participated
                          </p>
                        </Link>
                      ) : (
                        <h4 className="font-semibold">{contestName}</h4>
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
