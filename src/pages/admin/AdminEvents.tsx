
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { dataService } from "@/services/dataService";
import type { EventFullModel, ProfileFullModel } from "../../../api/models";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventFullModel[]>([]);
  const [profiles, setProfiles] = useState<ProfileFullModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFullModel | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    participants: [] as string[]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsData, profilesData] = await Promise.all([
          dataService.getEvents(),
          dataService.getProfiles()
        ]);
        setEvents(eventsData);
        setProfiles(profilesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingEvent) {
        await dataService.updateEvent(editingEvent.id, {
          ...editingEvent,
          ...formData
        });
      } else {
        await dataService.addEvent(formData);
      }
      
      const eventsData = await dataService.getEvents();
      setEvents(eventsData);
      setIsFormOpen(false);
      setEditingEvent(null);
      setFormData({ name: "", location: "", startDate: "", endDate: "", participants: [] });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = (event: EventFullModel) => {
    setEditingEvent(event);
    setFormData({
      name: event.name,
      location: event.location,
      startDate: event.startDate,
      endDate: event.endDate,
      participants: event.participants
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await dataService.deleteEvent(id);
        const eventsData = await dataService.getEvents();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleParticipantToggle = (profileId: string) => {
    const participants = formData.participants.includes(profileId)
      ? formData.participants.filter(id => id !== profileId)
      : [...formData.participants, profileId];
    setFormData({ ...formData, participants });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/admin")}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Admin Dashboard
        </Button>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        {isFormOpen && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Participants
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {profiles.map((profile) => (
                      <label key={profile.id} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={formData.participants.includes(profile.id)}
                          onChange={() => handleParticipantToggle(profile.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{profile.name} ({profile.handle})</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button type="submit">
                    {editingEvent ? 'Update' : 'Create'} Event
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setIsFormOpen(false);
                      setEditingEvent(null);
                      setFormData({ name: "", location: "", startDate: "", endDate: "", participants: [] });
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Events List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{event.name}</h3>
                    <p className="text-sm text-gray-600">{event.location}</p>
                    <p className="text-sm text-gray-600">{event.startDate} to {event.endDate}</p>
                    <p className="text-sm text-gray-600">{event.participants.length} participants</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(event)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminEvents;
