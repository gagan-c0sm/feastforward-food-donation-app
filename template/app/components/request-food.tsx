import { useState } from "react";
import { Plus, MapPin, Users, Calendar, Clock, X } from "lucide-react";
import { GoldAsterisk, GreenHerb, TinyLeaf } from "./decorators";

interface FoodRequest {
  id: string;
  organization: string;
  location: string;
  peopleCount: number;
  requestedDate: string;
  timeSlot: string;
  dietaryReqs: string;
  status: "pending" | "matched" | "completed";
}

export function RequestFood() {
  const [showForm, setShowForm] = useState(false);
  const [requests, setRequests] = useState<FoodRequest[]>([
    {
      id: "1",
      organization: "Hope Shelter",
      location: "Downtown, 123 Main St",
      peopleCount: 50,
      requestedDate: "2026-05-10",
      timeSlot: "6:00 PM - 8:00 PM",
      dietaryReqs: "Vegetarian options needed",
      status: "matched",
    },
    {
      id: "2",
      organization: "Community Center",
      location: "East Side, 456 Oak Ave",
      peopleCount: 30,
      requestedDate: "2026-05-11",
      timeSlot: "12:00 PM - 2:00 PM",
      dietaryReqs: "No restrictions",
      status: "pending",
    },
  ]);

  const [formData, setFormData] = useState({
    organization: "",
    location: "",
    peopleCount: "",
    requestedDate: "",
    timeSlot: "",
    dietaryReqs: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRequest: FoodRequest = {
      id: Date.now().toString(),
      organization: formData.organization,
      location: formData.location,
      peopleCount: parseInt(formData.peopleCount),
      requestedDate: formData.requestedDate,
      timeSlot: formData.timeSlot,
      dietaryReqs: formData.dietaryReqs,
      status: "pending",
    };
    setRequests([newRequest, ...requests]);
    setFormData({
      organization: "",
      location: "",
      peopleCount: "",
      requestedDate: "",
      timeSlot: "",
      dietaryReqs: "",
    });
    setShowForm(false);
  };

  return (
    <div className="h-full overflow-auto relative" style={{ backgroundColor: "var(--background)" }}>
      <GreenHerb size={60} className="absolute top-8 right-8 opacity-30 pointer-events-none" />
      <TinyLeaf size={32} className="absolute bottom-20 left-12 opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto p-6 pb-20 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}>
              Food Requests
            </h1>
            <p className="text-sm font-medium mt-2" style={{ color: "var(--muted-foreground)" }}>
              Shelters and organizations requesting food
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
          >
            <Plus className="size-5" />
            New Request
          </button>
        </div>

        {showForm && (
          <div className="rounded-[32px] p-8 mb-8 border shadow-sm relative" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                Submit Food Request
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-xl transition-colors"
                style={{ color: "var(--cream-400)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Organization Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Enter organization name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Enter full address"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Number of People
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.peopleCount}
                    onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Requested Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.requestedDate}
                    onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Time Slot
                </label>
                <input
                  type="text"
                  required
                  value={formData.timeSlot}
                  onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="e.g., 6:00 PM - 8:00 PM"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Dietary Requirements
                </label>
                <textarea
                  value={formData.dietaryReqs}
                  onChange={(e) => setFormData({ ...formData, dietaryReqs: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Any dietary requirements or restrictions"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  Submit Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-2xl font-bold transition-all border"
                  style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-5">
          {requests.map((request) => (
            <div
              key={request.id}
              className="rounded-[32px] p-7 border shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                    {request.organization}
                  </h3>
                  <div className="flex items-center gap-2 mt-2" style={{ color: "var(--muted-foreground)" }}>
                    <MapPin className="size-4" />
                    <span className="text-sm font-medium">{request.location}</span>
                  </div>
                </div>
                <span
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: request.status === "matched" ? "var(--green-50)" : request.status === "completed" ? "var(--green-100)" : "var(--gold-100)",
                    color: request.status === "matched" ? "var(--primary)" : request.status === "completed" ? "var(--primary-dark)" : "var(--accent)",
                    borderColor: request.status === "matched" ? "var(--green-100)" : request.status === "completed" ? "var(--green-200)" : "var(--gold-300)"
                  }}
                >
                  {request.status === "matched" ? "Matched" : request.status === "completed" ? "Completed" : "Pending"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: "var(--green-50)" }}>
                  <Users className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{request.peopleCount} people</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: "var(--green-50)" }}>
                  <Calendar className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{new Date(request.requestedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-2xl col-span-2" style={{ backgroundColor: "var(--green-50)" }}>
                  <Clock className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{request.timeSlot}</span>
                </div>
              </div>

              {request.dietaryReqs && (
                <div className="mt-4 pt-4 border-t" style={{ borderColor: "var(--muted)" }}>
                  <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
                    <span className="font-bold" style={{ color: "var(--foreground)" }}>Dietary Requirements:</span>{" "}
                    {request.dietaryReqs}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
