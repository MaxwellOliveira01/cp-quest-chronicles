
import { Button } from "@/components/ui/button";
import { User, GraduationCap, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            CP Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover and track competitive programming journeys. Explore profiles, 
            universities, and contests to see the achievements and progress of programmers worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Link to="/search/profile" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Search Profiles
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Find competitive programmers, view their contest history, 
                  and track their journey through rankings and achievements.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/search/university" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <GraduationCap className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Search Universities
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Explore universities and their competitive programming teams, 
                  see their contest participation and student achievements.
                </p>
              </div>
            </div>
          </Link>

          <Link to="/search/contest" className="group">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                  <Trophy className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  Search Contests
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse programming contests, view team rankings, 
                  and see detailed results with problem-solving statistics.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
