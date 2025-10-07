import { useState } from "react";
import { Plus, MapPin, Users, Calendar, Clock, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

interface FoodRequest {
  id: string;
  userId: string;
  organization: string;
  location: string;
  peopleCount: number;
  requestedDate: string;
  timeSlot: string;
  dietaryReqs: string;
  status: "pending" | "matched" | "completed";
}

export function RequestFood() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [requests, setRequests] = useState<FoodRequest[]>([
    {
      id: "1",
      userId: "2", // receiver@feastforward.com (Hope Shelter)
      organization: "Hope Shelter",
      location: "Downtown, 123 Main St",
      peopleCount: 50,
      requestedDate: "2026-03-27",
      timeSlot: "6:00 PM - 8:00 PM",
      dietaryReqs: "Vegetarian options needed",
      status: "matched",
    },
    {
      id: "2",
      userId: "5", // community@feastforward.com (Community Center)
      organization: "Community Center",
      location: "East Side, 456 Oak Ave",
      peopleCount: 30,
      requestedDate: "2026-03-28",
      timeSlot: "12:00 PM - 2:00 PM",
      dietaryReqs: "No restrictions",
      status: "pending",
    },
    {
      id: "3",
      userId: "0",
      organization: "Youth Haven",
      location: "South Hill, 777 Pine Ln",
      peopleCount: 20,
      requestedDate: "2026-03-29",
      timeSlot: "5:00 PM - 7:00 PM",
      dietaryReqs: "Nut-free environment",
      status: "pending",
    },
    {
      id: "4",
      userId: "2",
      organization: "Hope Shelter",
      location: "Downtown, 123 Main St",
      peopleCount: 15,
      requestedDate: "2026-03-30",
      timeSlot: "8:00 AM - 10:00 AM",
      dietaryReqs: "Breakfast items preferred",
      status: "pending",
    },
  ]);

  const [formData, setFormData] = useState({
    location: "",
    peopleCount: "",
    requestedDate: "",
    timeSlot: "",
    dietaryReqs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setRequests(requests.map(r => r.id === editingId ? {
        ...r,
        ...formData,
        peopleCount: parseInt(formData.peopleCount),
      } as FoodRequest : r));
      toast.success("Request updated!");
      setEditingId(null);
    } else {
      const newRequest: FoodRequest = {
        id: Date.now().toString(),
        userId: user?.id || "anonymous",
        organization: user?.name || "Unknown Organization",
        ...formData,
        peopleCount: parseInt(formData.peopleCount),
        status: "pending",
      };
      setRequests([newRequest, ...requests]);
      toast.success("Food request submitted!");
    }

    setFormData({
      location: "",
      peopleCount: "",
      requestedDate: "",
      timeSlot: "",
      dietaryReqs: "",
    });
    setShowForm(false);
  };

  const handleEdit = (request: FoodRequest) => {
    setFormData({
      location: request.location,
      peopleCount: request.peopleCount.toString(),
      requestedDate: request.requestedDate,
      timeSlot: request.timeSlot,
      dietaryReqs: request.dietaryReqs,
    });
    setEditingId(request.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Delete this request?")) {
      setRequests(requests.filter(r => r.id !== id));
      toast.success("Request removed");
    }
  };

  const isOwner = (request: FoodRequest) => user?.id === request.userId;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 pb-20 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Food Requests</h1>
            <p className="text-sm text-gray-600 mt-1">
              {user?.role === 'receiver' 
                ? "Manage your organization's food requests" 
                : "Active requests from shelters and NGOs"}
            </p>
          </div>
          {user?.role === "receiver" && (
            <button
              onClick={() => {
                setEditingId(null);
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all shadow-sm font-semibold"
            >
              <Plus className="size-5" />
              New Request
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              {editingId ? "Edit Food Request" : "Submit New Request"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Delivery Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 placeholder-gray-400"
                  placeholder="Enter full address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Number of People
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.peopleCount}
                    onChange={(e) =>
                      setFormData({ ...formData, peopleCount: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Requested Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.requestedDate}
                    onChange={(e) =>
                      setFormData({ ...formData, requestedDate: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Preferred Time Slot
                </label>
                <input
                  type="text"
                  required
                  value={formData.timeSlot}
                  onChange={(e) =>
                    setFormData({ ...formData, timeSlot: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 placeholder-gray-400"
                  placeholder="e.g., 6:00 PM - 8:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Dietary Requirements
                </label>
                <textarea
                  value={formData.dietaryReqs}
                  onChange={(e) =>
                    setFormData({ ...formData, dietaryReqs: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-gray-50 placeholder-gray-400 resize-none"
                  placeholder="Any dietary requirements or restrictions"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-100"
                >
                  {editingId ? "Update Request" : "Submit Request"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-bold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {requests.map((request) => (
            <div
              key={request.id}
              className={`bg-white rounded-2xl shadow-sm p-6 border transition-all hover:shadow-md ${
                isOwner(request) ? "border-green-200 bg-green-50/10" : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {request.organization}
                    {isOwner(request) && <span className="ml-2 text-xs font-normal text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">You</span>}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-600 mt-1.5">
                    <MapPin className="size-4 text-gray-400" />
                    <span className="text-sm">{request.location}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      request.status === "matched"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : request.status === "completed"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {request.status}
                  </span>
                  
                  {isOwner(request) && (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(request)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent"
                        title="Edit request"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(request.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent"
                        title="Delete request"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-sm font-semibold">{request.peopleCount} people</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                  <Calendar className="size-4 text-gray-400" />
                  <span className="text-sm font-semibold">{new Date(request.requestedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-sm font-semibold">Time: {request.timeSlot}</span>
                </div>
              </div>

              {request.dietaryReqs && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-gray-700">Dietary Needs:</span>{" "}
                    {request.dietaryReqs}
                  </p>
                </div>
              )}
              
              {request.status === "matched" && (
                <div className="mt-4 flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-100">
                  <CheckCircle2 className="size-5" />
                  Delivery Matched
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
