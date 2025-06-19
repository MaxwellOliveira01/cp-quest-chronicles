
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Users, GraduationCap, Trophy, Building, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const searchTypes = [
    {
      title: "Search Profiles",
      description: "Find contestants by name or handle",
      icon: Users,
      path: "/search/profile"
    },
    {
      title: "Search Universities",
      description: "Explore universities and their participants",
      icon: GraduationCap,
      path: "/search/university"
    },
    {
      title: "Search Contests",
      description: "Browse contest results and rankings",
      icon: Trophy,
      path: "/search/contest"
    },
    {
      title: "Search Teams",
      description: "Find teams and their achievements",
      icon: Building,
      path: "/search/team"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-between items-start mb-8">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Contest Platform
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover competitive programming talent, explore contest results, and connect with the global programming community
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/login")}
              className="text-gray-400 hover:text-gray-600"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {searchTypes.map((type, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <type.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">{type.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6">{type.description}</p>
                <Button 
                  onClick={() => navigate(type.path)}
                  className="w-full"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Start Searching
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
