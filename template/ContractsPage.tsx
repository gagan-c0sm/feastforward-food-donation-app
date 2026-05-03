import React, { useState } from "react";
import { FileText, Calendar, Clock, CheckCircle2, AlertCircle, Plus, ArrowRight, Heart, Leaf } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { GoldAsterisk, DarkLeaf, TinyLeaf } from "../components/decorators/Decorators";

const MOCK_CONTRACTS = [
  {
    id: "1",
    donorName: "The Green Kitchen",
    receiverName: "Hope Shelter",
    frequency: "daily",
    foodType: "Vegetarian meals",
    estimatedQuantity: "Serves 50 people",
    startDate: "2026-03-01",
    endDate: "2026-06-01",
    status: "active",
    deliveriesCompleted: 25,
    totalDeliveries: 92,
  },
  {
    id: "2",
    donorName: "Pasta Palace",
    receiverName: "Community Center",
    frequency: "weekly",
    foodType: "Pasta & Breadsticks",
    estimatedQuantity: "Serves 30 people",
    startDate: "2026-03-15",
    endDate: "2026-09-15",
    status: "active",
    deliveriesCompleted: 2,
    totalDeliveries: 26,
  },
];

export function ContractsPage() {
  const { user }       = useAuth();
  const [showPropose, setShowPropose] = useState(false);

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 relative" style={{ backgroundColor: "var(--background)" }}>
      {/* Decorators */}
      <DarkLeaf     size={60} className="absolute top-4 right-8  pointer-events-none opacity-80" />
      <GoldAsterisk size={36} className="absolute bottom-24 left-8 pointer-events-none opacity-60" />
      <TinyLeaf     size={30} className="absolute top-32 right-32 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1
              className="text-3xl tracking-tight"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}
            >
              Commitment Contracts
            </h1>
            <p className="mt-2 font-medium" style={{ color: "var(--muted-foreground)" }}>
              Formalizing the bond between community partners for a zero-waste future.
            </p>
          </div>
          {user?.role === "donor" && (
            <button
              onClick={() => setShowPropose(true)}
              className="text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 8px 24px rgba(91,155,71,0.25)",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              <Plus className="size-5" />
              Propose New Contract
            </button>
          )}
        </div>

        {/* Contract cards */}
        <div className="grid grid-cols-1 gap-6 mb-10">
          {MOCK_CONTRACTS.map(contract => (
            <div
              key={contract.id}
              className="rounded-3xl border shadow-sm p-6 flex flex-col md:flex-row gap-8 items-center transition-all hover:shadow-md"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              {/* Icon + names */}
              <div className="flex-1 flex items-center gap-6">
                <div
                  className="size-16 rounded-2xl flex items-center justify-center border shrink-0"
                  style={{ backgroundColor: "var(--green-50)", borderColor: "var(--green-100)" }}
                >
                  <div className="text-center">
                    <p
                      className="text-[10px] font-black uppercase leading-none"
                      style={{ color: "var(--primary-dark)" }}
                    >
                      {contract.frequency}
                    </p>
                    <FileText className="size-6 mx-auto mt-1" style={{ color: "var(--primary)" }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold" style={{ color: "var(--foreground)" }}>{contract.donorName}</span>
                    <ArrowRight className="size-4" style={{ color: "var(--border)" }} />
                    <span className="font-bold" style={{ color: "var(--foreground)" }}>{contract.receiverName}</span>
                  </div>
                  <div
                    className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight"
                    style={{ color: "var(--cream-400)" }}
                  >
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-3.5" /> {contract.foodType}
                    </span>
                    <span
                      className="size-1 rounded-full"
                      style={{ backgroundColor: "var(--border)" }}
                    />
                    <span className="flex items-center gap-1.5">
                      <Calendar className="size-3.5" /> {contract.estimatedQuantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest" style={{ color: "var(--cream-400)" }}>
                  <span>Progress</span>
                  <span style={{ color: "var(--primary)" }}>
                    {Math.round((contract.deliveriesCompleted / contract.totalDeliveries) * 100)}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(contract.deliveriesCompleted / contract.totalDeliveries) * 100}%`,
                      backgroundColor: "var(--primary)",
                    }}
                  />
                </div>
                <p
                  className="text-[10px] font-bold text-center uppercase tracking-tight"
                  style={{ color: "var(--cream-400)" }}
                >
                  {contract.deliveriesCompleted} of {contract.totalDeliveries} deliveries completed
                </p>
              </div>

              {/* Status badge */}
              <div className="flex gap-2 shrink-0">
                <span
                  className="px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border flex items-center gap-2"
                  style={{
                    backgroundColor: "var(--green-50)",
                    color: "var(--primary-dark)",
                    borderColor: "var(--green-100)",
                  }}
                >
                  <CheckCircle2 className="size-3.5" />
                  Active
                </span>
                <button
                  className="p-2.5 rounded-xl transition-all border"
                  style={{
                    color: "var(--cream-400)",
                    borderColor: "var(--border)",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor = "var(--green-50)";
                    e.currentTarget.style.borderColor = "var(--green-100)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                >
                  <AlertCircle className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner — template-style pill-button on gradient */}
        <div
          className="p-8 rounded-3xl shadow-xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
            boxShadow: "0 20px 60px rgba(91,155,71,0.30)",
          }}
        >
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white max-w-xl text-center md:text-left">
              <h2
                className="text-2xl font-black mb-2"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Build stronger community ties.
              </h2>
              <p className="font-medium opacity-80">
                Commitment contracts guarantee a steady food supply for organisations and reduce logistics overhead for donors.
              </p>
            </div>
            <button
              className="px-8 py-4 rounded-2xl font-black shadow-lg transition-all shrink-0"
              style={{ backgroundColor: "var(--card)", color: "var(--primary-dark)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--green-50)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--card)")}
            >
              {user?.role === "donor" ? "Propose a New Partnership →" : "Request a Commitment →"}
            </button>
          </div>

          {/* Watermark decorators on banner */}
          <Leaf className="absolute -bottom-8 -right-8 size-48 opacity-10 text-white" />
          <TinyLeaf size={50} className="absolute top-4 right-40 opacity-20" />
        </div>
      </div>
    </div>
  );
}
