
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, GraduationCap, Trophy, Building, Calendar, Menu, X, Code, Zap, Award, Filter, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const searchTypes = [
    {
      title: "Profiles",
      description: "Find contestants by name or handle",
      icon: Users,
      path: "/search/profile",
      color: "bg-blue-500"
    },
    {
      title: "Universities",
      description: "Explore universities and their participants",
      icon: GraduationCap,
      path: "/search/university",
      color: "bg-green-500"
    },
    {
      title: "Contests",
      description: "Browse contest results and rankings",
      icon: Trophy,
      path: "/search/contest",
      color: "bg-yellow-500"
    },
    {
      title: "Teams",
      description: "Find teams and their achievements",
      icon: Building,
      path: "/search/team",
      color: "bg-purple-500"
    },
    {
      title: "Events",
      description: "Discover programming events and marathons",
      icon: Calendar,
      path: "/search/event",
      color: "bg-teal-500"
    },
    {
      title: "Admin Dashboard",
      description: "Access administrative features and controls",
      icon: Shield,
      path: "/admin",
      color: "bg-red-500"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6 w-full">
        <div className="flex items-center gap-2">
          <Code className="w-8 h-8 text-teal-400" />
          <h1 className="text-2xl font-bold text-white">CodeArena</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setSidebarOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white"
          >
            <Menu className="w-4 h-4 mr-2" />
            Explore
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 w-full px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl font-bold text-white mb-6 leading-tight">
              Competitive Programming
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-400">
                Analytics Platform
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Dive deep into the world of competitive programming. Analyze performance, 
              discover talent, and track the journey of programmers and teams across global competitions.
            </p>
            
            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Real-time Analytics</h3>
                  <p className="text-gray-300">Track performance metrics and competition results in real-time</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Championship Tracking</h3>
                  <p className="text-gray-300">Follow teams and individuals through major programming contests</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 text-teal-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Global Community</h3>
                  <p className="text-gray-300">Connect with programmers and universities worldwide</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Button
              onClick={() => setSidebarOpen(true)}
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold"
            >
              Start Exploring
              <Search className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Explore Data</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {searchTypes.map((type, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group" onClick={() => {
                navigate(type.path);
                setSidebarOpen(false);
              }}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    <Search className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default LandingPage;
