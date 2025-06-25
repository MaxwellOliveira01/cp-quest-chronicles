
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Search, Loader2, Calendar, MapPin } from "lucide-react";
import { eventService } from "@/services/eventService";
import { EventSearchModel } from "../../../api/models";

const EventSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [events, setEvents] = useState<EventSearchModel[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() || startDate || endDate) {
      handleSearch();
    } else {
      setEvents([]);
    }
  }, [searchTerm, startDate, endDate]);

  const handleSearch = async () => {
    if (!searchTerm.trim() && !startDate && !endDate) return;
    
    setLoading(true);
    try {
      const results = await eventService.list(
        searchTerm.trim(), 
        startDate || endDate ? { startDate, endDate } : undefined
      );
      setEvents(results);
    } catch (error) {
      console.error("Error searching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStartDate("");
    setEndDate("");
    setEvents([]);
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <div className="relative">
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date (From)
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date (To)
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
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
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/event/${event.id}`)}>
              <CardHeader>
                <CardTitle className="text-lg text-teal-600 hover:text-teal-800">
                  {event.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {!loading && events.length === 0 && (searchTerm.trim() || startDate || endDate) && (
          <Card>
            <CardContent className="text-center py-8">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </CardContent>
          </Card>
        )}

        {!searchTerm.trim() && !startDate && !endDate && (
          <Card>
            <CardContent className="text-center py-12">
              <Calendar className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Search for Programming Events</h2>
              <p className="text-gray-600 mb-6">
                Discover programming marathons, hackathons, and competitive programming events worldwide.
              </p>
              <p className="text-sm text-gray-500">
                Enter an event name or select date range to start searching.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EventSearch;
