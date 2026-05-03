import { useState, useEffect } from "react";
import { Truck, MapPin, ArrowRight, CheckCircle2, Clock, User } from "lucide-react";
import { GoldAsterisk, GreenCircle, TinyLeaf } from "./decorators/Decorators";
import { api } from "../lib/api";

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
  volunteer?: string;
}

export function VolunteerTransport() {
  const [activeTab, setActiveTab] = useState<"available" | "my-deliveries">("available");
  const [transports, setTransports] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const data = await api.getTransports();
      setTransports(data);
    } catch (error) {
      console.error("Failed to fetch transports:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptDelivery = async (id: string) => {
    try {
      await api.updateTransport(id, { status: "assigned" });
      setTransports(transports.map(t =>
        t.id === id ? { ...t, status: "assigned" } : t
      ));
      setActiveTab("my-deliveries");
    } catch (error) {
      console.error("Failed to accept delivery:", error);
    }
  };

  const handleStartDelivery = async (id: string) => {
    try {
      await api.updateTransport(id, { status: "in-transit" });
      setTransports(transports.map(t =>
        t.id === id ? { ...t, status: "in-transit" } : t
      ));
    } catch (error) {
      console.error("Failed to start delivery:", error);
    }
  };

  const handleCompleteDelivery = async (id: string) => {
    try {
      await api.updateTransport(id, { status: "completed" });
      setTransports(transports.map(t =>
        t.id === id ? { ...t, status: "completed" } : t
      ));
    } catch (error) {
      console.error("Failed to complete delivery:", error);
    }
  };

  const availableTransports = transports.filter((t) => t.status === "available");
  const myDeliveries = transports.filter((t) => t.volunteer === "You" && t.status !== "completed");
  const completedDeliveries = transports.filter((t) => t.volunteer === "You" && t.status === "completed");

  return (
    <div className="h-full overflow-auto relative" style={{ backgroundColor: "var(--background)" }}>
      <GoldAsterisk size={52} className="absolute top-6 right-10 opacity-35 pointer-events-none" />
      <GreenCircle size={110} className="absolute bottom-32 -left-4 opacity-12 pointer-events-none" />
      <TinyLeaf size={36} className="absolute bottom-16 right-20 opacity-50 pointer-events-none" />

      <div className="max-w-4xl mx-auto p-6 pb-20 relative z-10">
        <div className="mb-8">
          <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}>
            Volunteer Transport
          </h1>
          <p className="text-sm font-medium mt-2" style={{ color: "var(--muted-foreground)" }}>
            Help deliver food from restaurants to shelters
          </p>
        </div>

        <div className="flex gap-2 mb-8 p-1.5 rounded-2xl border shadow-sm" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <button
            onClick={() => setActiveTab("available")}
            className="flex-1 py-3 px-4 rounded-xl font-bold transition-all"
            style={{
              backgroundColor: activeTab === "available" ? "var(--accent)" : "transparent",
              color: activeTab === "available" ? "white" : "var(--cream-400)",
              fontFamily: "var(--font-heading)"
            }}
            onMouseEnter={e => {
              if (activeTab !== "available") {
                e.currentTarget.style.backgroundColor = "var(--muted)";
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== "available") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            Available ({availableTransports.length})
          </button>
          <button
            onClick={() => setActiveTab("my-deliveries")}
            className="flex-1 py-3 px-4 rounded-xl font-bold transition-all"
            style={{
              backgroundColor: activeTab === "my-deliveries" ? "var(--accent)" : "transparent",
              color: activeTab === "my-deliveries" ? "white" : "var(--cream-400)",
              fontFamily: "var(--font-heading)"
            }}
            onMouseEnter={e => {
              if (activeTab !== "my-deliveries") {
                e.currentTarget.style.backgroundColor = "var(--muted)";
              }
            }}
            onMouseLeave={e => {
              if (activeTab !== "my-deliveries") {
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            My Deliveries ({myDeliveries.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-10 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Loading deliveries...</div>
        ) : activeTab === "available" ? (
          <div className="space-y-5">
            {availableTransports.length === 0 ? (
              <div className="rounded-[32px] p-12 text-center border shadow-sm" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="inline-flex p-4 rounded-2xl mb-4" style={{ backgroundColor: "var(--muted)" }}>
                  <Truck className="size-12" style={{ color: "var(--cream-400)" }} />
                </div>
                <p className="font-medium" style={{ color: "var(--muted-foreground)" }}>No deliveries available at the moment</p>
              </div>
            ) : (
              availableTransports.map((transport) => (
                <div
                  key={transport.id}
                  className="rounded-[32px] p-7 border shadow-sm transition-all hover:shadow-md"
                  style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--gold-100)" }}>
                        <Truck className="size-5" style={{ color: "var(--accent)" }} />
                      </div>
                      <span className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
                        {transport.distance} • {transport.timeWindow}
                      </span>
                    </div>
                    <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border"
                      style={{ backgroundColor: "var(--green-50)", color: "var(--primary)", borderColor: "var(--green-100)" }}
                    >
                      Available
                    </span>
                  </div>

                  <div className="space-y-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div className="mt-1.5">
                        <div className="size-3.5 rounded-full border-2" style={{ backgroundColor: "var(--accent)", borderColor: "var(--gold-300)" }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--cream-400)" }}>Pickup from</p>
                        <p className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                          {transport.pickupName}
                        </p>
                        <p className="text-sm font-medium flex items-center gap-1.5 mt-1" style={{ color: "var(--muted-foreground)" }}>
                          <MapPin className="size-3.5" />
                          {transport.pickupLocation}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pl-2">
                      <ArrowRight className="size-4" style={{ color: "var(--cream-400)" }} />
                      <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-1.5">
                        <div className="size-3.5 rounded-full border-2" style={{ backgroundColor: "var(--primary)", borderColor: "var(--green-100)" }} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--cream-400)" }}>Deliver to</p>
                        <p className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                          {transport.dropoffName}
                        </p>
                        <p className="text-sm font-medium flex items-center gap-1.5 mt-1" style={{ color: "var(--muted-foreground)" }}>
                          <MapPin className="size-3.5" />
                          {transport.dropoffLocation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl p-4 mb-5 border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Food Type:</span>
                      <span className="font-bold" style={{ color: "var(--foreground)" }}>
                        {transport.foodType}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Quantity:</span>
                      <span className="font-bold" style={{ color: "var(--foreground)" }}>
                        {transport.quantity}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAcceptDelivery(transport.id)}
                    className="w-full py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
                    style={{ backgroundColor: "var(--accent)", color: "white" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--gold-700)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--accent)")}
                  >
                    Accept Delivery
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-5">
            {myDeliveries.length === 0 && completedDeliveries.length === 0 ? (
              <div className="rounded-[32px] p-12 text-center border shadow-sm" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="inline-flex p-4 rounded-2xl mb-4" style={{ backgroundColor: "var(--muted)" }}>
                  <Truck className="size-12" style={{ color: "var(--cream-400)" }} />
                </div>
                <p className="font-medium mb-4" style={{ color: "var(--muted-foreground)" }}>You haven't accepted any deliveries yet</p>
                <button
                  onClick={() => setActiveTab("available")}
                  className="px-6 py-2.5 rounded-2xl font-bold transition-all"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  View Available Deliveries
                </button>
              </div>
            ) : (
              <>
                {myDeliveries.map((transport) => (
                  <div
                    key={transport.id}
                    className="rounded-[32px] p-7 border shadow-sm"
                    style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--gold-100)" }}>
                          <User className="size-5" style={{ color: "var(--accent)" }} />
                        </div>
                        <span className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
                          {transport.distance} • {transport.timeWindow}
                        </span>
                      </div>
                      <span
                        className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border"
                        style={{
                          backgroundColor: transport.status === "in-transit" ? "var(--green-50)" : "var(--gold-100)",
                          color: transport.status === "in-transit" ? "var(--primary)" : "var(--accent)",
                          borderColor: transport.status === "in-transit" ? "var(--green-100)" : "var(--gold-300)"
                        }}
                      >
                        {transport.status === "in-transit" ? "In Transit" : "Assigned"}
                      </span>
                    </div>

                    <div className="space-y-4 mb-5">
                      <div className="flex items-start gap-4">
                        <div className="mt-1.5">
                          <div className="size-3.5 rounded-full border-2" style={{ backgroundColor: "var(--accent)", borderColor: "var(--gold-300)" }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--cream-400)" }}>Pickup from</p>
                          <p className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                            {transport.pickupName}
                          </p>
                          <p className="text-sm font-medium flex items-center gap-1.5 mt-1" style={{ color: "var(--muted-foreground)" }}>
                            <MapPin className="size-3.5" />
                            {transport.pickupLocation}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pl-2">
                        <ArrowRight className="size-4" style={{ color: "var(--cream-400)" }} />
                        <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="mt-1.5">
                          <div className="size-3.5 rounded-full border-2" style={{ backgroundColor: "var(--primary)", borderColor: "var(--green-100)" }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "var(--cream-400)" }}>Deliver to</p>
                          <p className="font-bold text-lg" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                            {transport.dropoffName}
                          </p>
                          <p className="text-sm font-medium flex items-center gap-1.5 mt-1" style={{ color: "var(--muted-foreground)" }}>
                            <MapPin className="size-3.5" />
                            {transport.dropoffLocation}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl p-4 mb-5 border" style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)" }}>
                      <div className="flex justify-between items-center text-sm mb-2">
                        <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Food Type:</span>
                        <span className="font-bold" style={{ color: "var(--foreground)" }}>
                          {transport.foodType}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium" style={{ color: "var(--muted-foreground)" }}>Quantity:</span>
                        <span className="font-bold" style={{ color: "var(--foreground)" }}>
                          {transport.quantity}
                        </span>
                      </div>
                    </div>

                    {transport.status === "assigned" ? (
                      <button
                        onClick={() => handleStartDelivery(transport.id)}
                        className="w-full py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
                        style={{ backgroundColor: "var(--primary)", color: "white" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                      >
                        Start Delivery
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCompleteDelivery(transport.id)}
                        className="w-full py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
                        style={{ backgroundColor: "var(--primary)", color: "white" }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                      >
                        <CheckCircle2 className="size-5" />
                        Complete Delivery
                      </button>
                    )}
                  </div>
                ))}

                {completedDeliveries.length > 0 && (
                  <>
                    <div className="pt-4">
                      <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                        Completed Deliveries
                      </h2>
                    </div>
                    {completedDeliveries.map((transport) => (
                      <div
                        key={transport.id}
                        className="rounded-[32px] p-7 border shadow-sm opacity-75"
                        style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--green-50)" }}>
                              <CheckCircle2 className="size-5" style={{ color: "var(--primary)" }} />
                            </div>
                            <span className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>
                              {transport.distance} • {transport.timeWindow}
                            </span>
                          </div>
                          <span className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border"
                            style={{ backgroundColor: "var(--green-100)", color: "var(--primary-dark)", borderColor: "var(--green-200)" }}
                          >
                            Completed
                          </span>
                        </div>

                        <div className="text-sm">
                          <p className="font-bold" style={{ color: "var(--foreground)" }}>
                            {transport.pickupName} → {transport.dropoffName}
                          </p>
                          <p className="font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>
                            {transport.foodType} • {transport.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
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
