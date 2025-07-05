
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Loader2, Users } from "lucide-react";
import { personService } from "@/services/personService";
import { universityService } from "@/services/universityService";
import { PersonSearchModel } from "api/person";
import { UniversityModel } from "api/university";

const PersonSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [universityFilter, setUniversityFilter] = useState("");
  const [persons, setPersons] = useState<PersonSearchModel[]>([]);
  const [universities, setUniversities] = useState<UniversityModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load universities for filter
    const loadUniversities = async () => {
      try {
        setLoading(true);
        const universityData = await universityService.getAll();
        setUniversities(universityData);
      } catch (error) {
        console.error("Error loading universities:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUniversities();
  }, []);

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setPersons([]);
    }
  }, [searchTerm, universityFilter]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      console.log(`Searching persons with term: "${searchTerm.trim()}" and universityFilter: "${universityFilter ?? 'All'}"`);
      const results = await personService.listForSearch(searchTerm.trim(), universityFilter ?? undefined);
      setPersons(results);
    } catch (error) {
      console.error("Error searching persons:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setUniversityFilter("");
    setPersons([]);
  };

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

        <div className="flex items-center mb-8">
          <Users className="w-8 h-8 text-blue-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Search Persons</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Person Name
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search persons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  University
                </label>
                <select
                  value={universityFilter}
                  onChange={(e) => setUniversityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Universities</option>
                  {universities.map((university) => (
                    <option key={university.id} value={university.id}>
                      {university.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={clearFilters}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {persons.map((person) => (
            <Card key={person.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/person/${person.id}`)}>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600 hover:text-blue-800">
                  {person.name}
                </CardTitle>
                <p className="text-gray-600">@{person.handle}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{person.university 
                  ? person.university.name + ' - ' + person.university.alias
                  : 'No university'}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {!loading && persons.length === 0 && searchTerm.trim() && (
          <Card>
            <CardContent className="text-center py-8">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No persons found</h3>
              <p className="text-gray-600">Try adjusting your search term or filters.</p>
            </CardContent>
          </Card>
        )}

        {!searchTerm.trim() && (
          <Card>
            <CardContent className="text-center py-12">
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Search for Competitive Programmers</h2>
              <p className="text-gray-600 mb-6">
                Find talented programmers, track their performance, and explore their achievements in competitive programming.
              </p>
              <p className="text-sm text-gray-500">
                Enter a name to start searching for persons.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PersonSearch;
