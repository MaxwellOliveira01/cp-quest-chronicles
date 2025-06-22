
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { mockUniversities } from "@/data/mockData";

const UniversitySearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<typeof mockUniversities>([]);
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = mockUniversities.filter(
        university => 
          university.name.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
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
              Search Universities
            </h1>
            <p className="text-gray-600">
              Find universities and their competitive programming teams
            </p>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for universities..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10 py-3 text-lg"
            />
          </div>

          {results.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {results.map((university) => (
                <Link
                  key={university.id}
                  to={`/university/${university.id}`}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {university.name}
                      </h3>
                      <p className="text-gray-600">
                        {university.students.length} students
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">
                        {university.contests.length} contests participated
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchTerm && results.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No universities found matching "{searchTerm}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UniversitySearch;
