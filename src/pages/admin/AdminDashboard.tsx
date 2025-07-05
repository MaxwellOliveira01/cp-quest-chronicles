
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, GraduationCap, Trophy, Calendar, Building } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const entities = [
    {
      name: "Persons",
      icon: Users,
      description: "Manage contestant profiles",
      path: "/admin/persons"
    },
    {
      name: "Universities",
      icon: GraduationCap,
      description: "Manage universities",
      path: "/admin/universities"
    },
    {
      name: "Teams",
      icon: Building,
      description: "Manage teams",
      path: "/admin/teams"
    },
    {
      name: "Problems",
      icon: Trophy,
      description: "Manage problems",
      path: "/admin/problems"
    },
    {
      name: "Contests",
      icon: Trophy,
      description: "Manage contests",
      path: "/admin/contests"
    },
    {
      name: "Events",
      icon: Calendar,
      description: "Manage events",
      path: "/admin/events"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage all contest platform entities from this central location
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => navigate("/")}
          >
            Back to Main Site
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entities.map((entity) => (
            <Card key={entity.name} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <entity.icon className="w-6 h-6 text-blue-600" />
                  {entity.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{entity.description}</p>
                <Button 
                  onClick={() => navigate(entity.path)}
                  className="w-full"
                >
                  Manage {entity.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
