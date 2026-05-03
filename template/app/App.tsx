import { useState } from "react";
import { RequestFood } from "./components/request-food";
import { PostAvailability } from "./components/post-availability";
import { VolunteerTransport } from "./components/volunteer-transport";
import { Leaf, Store, Truck, Users } from "lucide-react";
import { GoldRing, DarkLeaf, GreenCircle } from "./components/decorators";

export default function App() {
  const [activeTab, setActiveTab] = useState<"request" | "availability" | "volunteer">("request");

  return (
    <div className="size-full flex flex-col" style={{ backgroundColor: "var(--background)" }}>
      {/* Header */}
      <header className="relative overflow-hidden px-4 py-6 shadow-sm" style={{ backgroundColor: "var(--card)", borderBottom: "2px solid var(--border)" }}>
        <DarkLeaf size={80} className="absolute -top-4 -right-4 opacity-20 pointer-events-none" />
        <GreenCircle size={120} className="absolute -left-2 top-0 opacity-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-2xl" style={{ backgroundColor: "var(--primary)" }}>
              <Leaf className="size-7 text-white" />
            </div>
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}>
              FeastForward
            </h1>
            <GoldRing size={24} className="ml-1 opacity-80" />
          </div>
          <p className="text-sm font-medium ml-14" style={{ color: "var(--muted-foreground)" }}>
            Connecting surplus food with those in need
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="sticky top-0 z-10 px-4 shadow-sm" style={{ backgroundColor: "var(--card)", borderBottom: "1.5px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto flex">
          <button
            onClick={() => setActiveTab("request")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border-b-2 transition-all font-bold ${
              activeTab === "request"
                ? ""
                : "border-transparent"
            }`}
            style={{
              borderColor: activeTab === "request" ? "var(--primary)" : "transparent",
              color: activeTab === "request" ? "var(--primary)" : "var(--cream-400)",
              fontFamily: "var(--font-heading)"
            }}
          >
            <Users className="size-5" />
            <span>Request</span>
          </button>
          <button
            onClick={() => setActiveTab("availability")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border-b-2 transition-all font-bold ${
              activeTab === "availability"
                ? ""
                : "border-transparent"
            }`}
            style={{
              borderColor: activeTab === "availability" ? "var(--primary)" : "transparent",
              color: activeTab === "availability" ? "var(--primary)" : "var(--cream-400)",
              fontFamily: "var(--font-heading)"
            }}
          >
            <Store className="size-5" />
            <span>Donate</span>
          </button>
          <button
            onClick={() => setActiveTab("volunteer")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 border-b-2 transition-all font-bold ${
              activeTab === "volunteer"
                ? ""
                : "border-transparent"
            }`}
            style={{
              borderColor: activeTab === "volunteer" ? "var(--accent)" : "transparent",
              color: activeTab === "volunteer" ? "var(--accent)" : "var(--cream-400)",
              fontFamily: "var(--font-heading)"
            }}
          >
            <Truck className="size-5" />
            <span>Transport</span>
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-hidden">
        {activeTab === "request" && <RequestFood />}
        {activeTab === "availability" && <PostAvailability />}
        {activeTab === "volunteer" && <VolunteerTransport />}
      </main>
    </div>
  );
}
