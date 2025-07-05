
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Plus, Edit, Trash, Loader2 } from "lucide-react";
import { eventService } from "@/services/eventService";
import { personService } from "@/services/personService";
import { EventFullModel, EventModel, EventCreateModel, EventUpdateModel } from "../../../api/event";
import { PersonModel } from "../../../api/person";
import { LocalModel } from "../../../api/local";
import { localService } from "@/services/localService";

const AdminEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventModel[]>([]);
  const [persons, setPersons] = useState<PersonModel[]>([]);
  const [locals, setLocals] = useState<LocalModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFullModel | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    websiteUrl: "",
    localId: "",
    startDate: "",
    endDate: "",
    students: [] as string[]
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [eventsData, personsData, localsData] = await Promise.all([
          eventService.list(),
          personService.list(),
          localService.getAll()
        ]);
        setEvents(eventsData);
        setPersons(personsData);
        setLocals(localsData);
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
    // Helper to format date as ISO 8601 with T00:00:00
    const toIso8601 = (date: string) => {
      if (!date) return null;
      return `${date}T00:00:00Z`;
    };
    try {
      if (editingEvent) {
        const updateData: EventUpdateModel = {
          id: editingEvent.id,
          name: formData.name,
          description: formData.description || null,
          websiteUrl: formData.websiteUrl || null,
          start: formData.startDate ? toIso8601(formData.startDate) : null,
          end: formData.endDate ? toIso8601(formData.endDate) : null,
          localId: formData.localId || null,
          participantIds: formData.students ?? []
        };
        await eventService.update(updateData);
      } else {
        const createData: EventCreateModel = {
          name: formData.name,
          description: formData.description || null,
          websiteUrl: formData.websiteUrl || null,
          start: formData.startDate ? toIso8601(formData.startDate) : null,
          end: formData.endDate ? toIso8601(formData.endDate) : null,
          localId: formData.localId || null,
          participantIds: formData.students ?? []
        };
        await eventService.create(createData);
      }
      const eventsData = await eventService.list();
      setEvents(eventsData);
      setIsFormOpen(false);
      setEditingEvent(null);
      setFormData({ name: "", description: "", websiteUrl: "", localId: "", startDate: "", endDate: "", students: [] });
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleEdit = async (eventId: string) => {
    try {
      const event = await eventService.get(eventId);
      // Parse ISO 8601 date
      const parseDate = (iso: string | null | undefined) => {
        if (!iso) return "";
        return iso.split("T")[0] || "";
      };
      setEditingEvent(event);
      setFormData({
        name: event.name,
        description: event.description || "",
        websiteUrl: event.websiteUrl || "",
        localId: event.local?.id ?? "",
        startDate: parseDate(event.start),
        endDate: parseDate(event.end),
        students: event.participants ? event.participants.map(p => p.id) : []
      });
      setIsFormOpen(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await eventService.delete(id);
        const eventsData = await eventService.list();
        setEvents(eventsData);
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleStudentToggle = (personId: string) => {
    const students = formData.students.includes(personId)
      ? formData.students.filter(id => id !== personId)
      : [...formData.students, personId];
    setFormData({ ...formData, students });
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
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={formData.websiteUrl}
                    onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Local
                  </label>
                  <select
                    value={formData.localId}
                    onChange={e => setFormData({ ...formData, localId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">No Local</option>
                    {locals.map(local => (
                      <option key={local.id} value={local.id}>
                        {local.city} - {local.state}, {local.country}
                      </option>
                    ))}
                  </select>
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
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Participants
                  </label>
                  <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                    {persons.map((person) => (
                      <label key={person.id} className="flex items-center space-x-2 p-1">
                        <input
                          type="checkbox"
                          checked={formData.students.includes(person.id)}
                          onChange={() => handleStudentToggle(person.id)}
                          className="rounded"
                        />
                        <span className="text-sm">{person.name} ({person.handle})</span>
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
                      setFormData({ name: "", description: "", websiteUrl: "", localId: "", startDate: "", endDate: "", students: [] });
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
                    {event.start && event.end && (
                      <p className="text-sm text-gray-600">
                        {event.start?.slice(0, 10)} to {event.end?.slice(0, 10)}
                    </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(event.id)}
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
