import { useState } from "react";
import { Truck, MapPin, ArrowRight, CheckCircle2, Clock, User, Package, Navigation } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

interface Transport {
  id: string;
  pickupLocation: string;
  pickupName: string;
  dropoffLocation: string;
  dropoffName: string;
  foodType: string;
  quantity: string;
  timeWindow: string;
  distance: string;
  status: "available" | "assigned" | "in-transit" | "completed";
  volunteerId?: string;
  volunteerName?: string;
}

export function VolunteerTransport() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"available" | "my-deliveries">("available");
  const [transports, setTransports] = useState<Transport[]>([
    {
      id: "1",
      pickupLocation: "Downtown, 789 Food St",
      pickupName: "The Green Kitchen",
      dropoffLocation: "Downtown, 123 Main St",
      dropoffName: "Hope Shelter",
      foodType: "Mixed Vegetables & Rice",
      quantity: "Serves 40-50 people",
      timeWindow: "8:00 PM - 9:00 PM",
      distance: "2.3 km",
      status: "available",
    },
    {
      id: "2",
      pickupLocation: "North District, 555 Italian Way",
      pickupName: "Pasta Palace",
      dropoffLocation: "East Side, 456 Oak Ave",
      dropoffName: "Community Center",
      foodType: "Pasta & Bread",
      quantity: "Serves 35 people",
      timeWindow: "9:00 PM - 10:00 PM",
      distance: "4.7 km",
      status: "available",
    },
    {
      id: "3",
      pickupLocation: "West End, 321 Cafe Lane",
      pickupName: "City Cafe",
      dropoffLocation: "South Bay, 999 Harbor Rd",
      dropoffName: "Family Support Center",
      foodType: "Sandwiches & Salads",
      quantity: "Serves 25-30 people",
      timeWindow: "7:00 PM - 8:00 PM",
      distance: "3.1 km",
      status: "assigned",
      volunteerId: "3", // volunteer@feastforward.com (Alex)
      volunteerName: "Alex Volunteer",
    },
    {
      id: "4",
      pickupLocation: "Market Square, 100 Fresh Blvd",
      pickupName: "Organic Grocer",
      dropoffLocation: "Downtown, 123 Main St",
      dropoffName: "Hope Shelter",
      foodType: "Fresh Produce Box",
      quantity: "60 kg",
      timeWindow: "4:00 PM - 6:00 PM",
      distance: "1.2 km",
      status: "available",
    },
    {
      id: "5",
      pickupLocation: "Old Town, 22 Bakery Row",
      pickupName: "Sunshine Bakery",
      dropoffLocation: "East Side, 456 Oak Ave",
      dropoffName: "Community Center",
      foodType: "Assorted Pastries",
      quantity: "100 units",
      timeWindow: "5:30 PM - 6:30 PM",
      distance: "5.5 km",
      status: "assigned",
      volunteerId: "6", // sarah@feastforward.com (Sarah)
      volunteerName: "Sarah Transport",
    },
    {
      id: "6",
      pickupLocation: "Business Park, 90 Tech Dr",
      pickupName: "Corporate Catering",
      dropoffLocation: "North Hill, 33 Housing St",
      dropoffName: "Transitional Home",
      foodType: "Catered Lunch Boxes",
      quantity: "50 boxes",
      timeWindow: "2:00 PM - 3:00 PM",
      distance: "8.2 km",
      status: "available",
    },
  ]);

  const handleAcceptDelivery = (id: string) => {
    if (user?.role !== "volunteer") {
      toast.error("Only volunteers can accept deliveries");
      return;
    }
    setTransports(
      transports.map((t) =>
        t.id === id ? { ...t, status: "assigned", volunteerId: user.id, volunteerName: user.name } : t
      )
    );
    toast.success("Delivery accepted! Check 'My Deliveries'");
  };

  const handleStartDelivery = (id: string) => {
    setTransports(
      transports.map((t) =>
        t.id === id ? { ...t, status: "in-transit" } : t
      )
    );
    toast.info("Delivery started. Drive safely!");
  };

  const handleCompleteDelivery = (id: string) => {
    setTransports(
      transports.map((t) =>
        t.id === id ? { ...t, status: "completed" } : t
      )
    );
    toast.success("Delivery completed! Thank you for your service ❤️");
  };

  const availableTransports = transports.filter((t) => t.status === "available");
  const myDeliveries = transports.filter((t) => t.volunteerId === user?.id && t.status !== "completed");
  const completedDeliveries = transports.filter((t) => t.volunteerId === user?.id && t.status === "completed");

  const isVolunteer = user?.role === "volunteer";

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 pb-20 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Volunteer Transport
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {isVolunteer 
              ? "Help deliver surplus food to those who need it most" 
              : "Overview of active food transports in the area"}
          </p>
        </div>

        {isVolunteer && (
          <div className="flex gap-2 mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-gray-100">
            <button
              onClick={() => setActiveTab("available")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all ${
                activeTab === "available"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-100"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              Available ({availableTransports.length})
            </button>
            <button
              onClick={() => setActiveTab("my-deliveries")}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold transition-all ${
                activeTab === "my-deliveries"
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-100"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              My Jobs ({myDeliveries.length})
            </button>
          </div>
        )}

        {activeTab === "available" ? (
          <div className="space-y-6">
            {availableTransports.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <Truck className="size-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">All caught up!</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-1">No deliveries need a volunteer right now. Check back soon!</p>
              </div>
            ) : (
              availableTransports.map((transport) => (
                <div
                  key={transport.id}
                  className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                        <Navigation className="size-5 text-purple-600" />
                      </div>
                      <span className="text-sm font-bold text-gray-500 px-3 py-1 bg-gray-100 rounded-lg">
                        {transport.distance} • {transport.timeWindow}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-green-100 text-green-700 border border-green-200">
                      New Request
                    </span>
                  </div>

                  <div className="space-y-4 mb-6 relative">
                    {/* Vertical line connector */}
                    <div className="absolute left-1.5 top-6 bottom-6 w-0.5 bg-dashed border-l-2 border-dashed border-gray-200" />
                    
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 relative z-10">
                        <div className="size-3 rounded-full bg-orange-500 ring-4 ring-orange-50" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Pickup</p>
                        <p className="font-bold text-gray-900 text-lg leading-none mt-1">
                          {transport.pickupName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="size-3" />
                          {transport.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1.5 relative z-10">
                        <div className="size-3 rounded-full bg-green-500 ring-4 ring-green-50" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Drop-off</p>
                        <p className="font-bold text-gray-900 text-lg leading-none mt-1">
                          {transport.dropoffName}
                        </p>
                        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                          <MapPin className="size-3" />
                          {transport.dropoffLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 mb-6 grid grid-cols-2 gap-4 border border-gray-100">
                    <div className="flex items-center gap-2">
                      <Package className="size-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">{transport.foodType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-gray-400" />
                      <span className="text-sm font-semibold text-gray-700">{transport.quantity}</span>
                    </div>
                  </div>

                  {isVolunteer && (
                    <button
                      onClick={() => handleAcceptDelivery(transport.id)}
                      className="w-full bg-purple-600 text-white py-3.5 rounded-xl hover:bg-purple-700 transition-all font-bold shadow-lg shadow-purple-100 flex items-center justify-center gap-2"
                    >
                      Accept Delivery Job
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {myDeliveries.length === 0 && completedDeliveries.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
                <Truck className="size-16 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900">Your route is empty</h3>
                <p className="text-gray-500 max-w-xs mx-auto mt-1">You haven't accepted any deliveries yet. Help out by picking up a job!</p>
                <button
                  onClick={() => setActiveTab("available")}
                  className="mt-6 text-purple-600 hover:text-purple-700 font-bold bg-purple-50 px-6 py-2 rounded-xl transition-all"
                >
                  Browse Available Jobs
                </button>
              </div>
            ) : (
              <>
                {myDeliveries.map((transport) => (
                  <div
                    key={transport.id}
                    className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-l-blue-500 border-white relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                          <Navigation className="size-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-bold text-gray-500">
                          Route: {transport.distance}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                          transport.status === "in-transit"
                            ? "bg-blue-600 text-white"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {transport.status === "in-transit"
                          ? "In Transit"
                          : "Ready to Start"}
                      </span>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-xl border border-orange-100">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-orange-500" />
                          <span className="font-bold text-gray-900">{transport.pickupName}</span>
                        </div>
                        <span className="text-xs text-orange-600 font-bold uppercase">Pickup</span>
                      </div>
                      
                      <div className="flex items-center justify-center">
                        <ArrowRight className="size-5 text-gray-300" />
                      </div>

                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                        <div className="flex items-center gap-3">
                          <div className="size-2 rounded-full bg-green-500" />
                          <span className="font-bold text-gray-900">{transport.dropoffName}</span>
                        </div>
                        <span className="text-xs text-green-600 font-bold uppercase">Drop-off</span>
                      </div>
                    </div>

                    {transport.status === "assigned" ? (
                      <button
                        onClick={() => handleStartDelivery(transport.id)}
                        className="w-full bg-blue-600 text-white py-3.5 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100"
                      >
                        Start Delivery Route
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteDelivery(transport.id)}
                        className="w-full bg-green-600 text-white py-3.5 rounded-xl hover:bg-green-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-green-100"
                      >
                        <CheckCircle2 className="size-5" />
                        Mark as Delivered
                      </button>
                    )}
                  </div>
                ))}

                {completedDeliveries.length > 0 && (
                  <>
                    <div className="pt-8 pb-4">
                      <h2 className="text-xl font-bold text-gray-900">
                        Past Deliveries
                      </h2>
                    </div>
                    <div className="space-y-4">
                      {completedDeliveries.map((transport) => (
                        <div
                          key={transport.id}
                          className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 opacity-75 grayscale-[0.5]"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="size-5 text-green-600" />
                              <span className="text-sm font-bold text-gray-500">
                                {transport.distance} • Completed
                              </span>
                            </div>
                          </div>

                          <div className="text-sm font-medium text-gray-600 flex items-center gap-2">
                            <span className="text-gray-900">{transport.pickupName}</span>
                            <ArrowRight className="size-3" />
                            <span className="text-gray-900">{transport.dropoffName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
