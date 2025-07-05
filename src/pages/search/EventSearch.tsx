
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Loader2, Calendar } from "lucide-react";
import { eventService } from "@/services/eventService";
import { EventModel } from "api/event";

const EventSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState<EventModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim()) {
      handleSearch();
    } else {
      setEvents([]);
    }
  }, [searchTerm]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      const results = await eventService.filter(
        searchTerm.trim(), 
      );
      setEvents(results);
    } catch (error) {
      console.error("Error searching events:", error);
    } finally {
      setLoading(false);
    }
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
          <Calendar className="w-8 h-8 text-teal-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Search Events</h1>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Name
              </label>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/event/${event.id}`)}>
              <CardHeader>
                <CardTitle className="text-lg text-blue-600 hover:text-blue-800">
                  {event.name}
                  <p className="text-sm text-gray-600">{new Date(event.start).toDateString()} - {new Date(event.end).toDateString()}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{event.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        )}

        {!loading && events.length === 0 && searchTerm.trim() && (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {!searchTerm.trim() && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Search for Programming Events</h2>
              <p className="text-gray-600 mb-6">
                Discover programming marathons, hackathons, and competitive programming events worldwide.
              </p>
              <p className="text-sm text-gray-500">
                Enter an event name to start searching.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
