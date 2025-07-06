
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { personService } from "@/services/personService";
import { PersonFullModel } from "../../../api/person";

const PersonDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<PersonFullModel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const foundPerson = await personService.get(id);
        setPerson(foundPerson || null);
      } catch (error) {
        console.error("Error fetching person:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Person not found</h1>
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
          onClick={() => navigate("/search/person")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Search
        </Button>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">{person.name}</CardTitle>
            <p className="text-xl text-gray-600">@{person.handle}</p>
            {person.university && (
              <p className="text-gray-500 mt-2">{person.university.name}</p>
            )}
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {person.teams.map((team, index) => (
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

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Events Participated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {person.events.map((event, index) => (
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

        </div>

      </div>
    </div>
  );
};

export default PersonDetails;
