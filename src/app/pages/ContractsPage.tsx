import React, { useState } from "react";
import { FileText, Calendar, Clock, CheckCircle2, AlertCircle, Plus, ArrowRight, User, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const MOCK_CONTRACTS = [
  { id: "1", donorId: "1", donorName: "The Green Kitchen", receiverId: "2", receiverName: "Hope Shelter", frequency: "daily", foodType: "Vegetarian meals", estimatedQuantity: "Serves 50 people", startDate: "2026-03-01", endDate: "2026-06-01", status: "active", deliveriesCompleted: 25, totalDeliveries: 92 },
  { id: "2", donorId: "4", donorName: "Pasta Palace", receiverId: "5", receiverName: "Community Center", frequency: "weekly", foodType: "Pasta & Breadsticks", estimatedQuantity: "Serves 30 people", startDate: "2026-03-15", endDate: "2026-09-15", status: "active", deliveriesCompleted: 2, totalDeliveries: 26 },
];

export function ContractsPage() {
  const { user } = useAuth();
  const [showPropose, setShowPropose] = useState(false);

  return (
    <div className="flex-1 overflow-auto p-8" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>Commitment Contracts</h1>
            <p className="text-[#6B6458] mt-2 font-medium">Formalizing the bond between community partners for a zero-waste future.</p>
          </div>
          {user?.role === "donor" && (
            <button 
              onClick={() => setShowPropose(true)}
              className="bg-[#F5A623] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#F5A623]/20 hover:bg-[#E8A317] transition-all flex items-center gap-2"
            >
              <Plus className="size-5" />
              Propose New Contract
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {MOCK_CONTRACTS.map((contract) => (
            <div key={contract.id} className="bg-white rounded-3xl border border-[#E8E4DC] shadow-sm p-6 hover:shadow-md transition-all flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 flex items-center gap-6">
                <div className="size-16 bg-[#FFF3D0] rounded-2xl flex items-center justify-center border border-[#FFE49A] overflow-hidden">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-[#C78A0E] uppercase leading-none">{contract.frequency}</p>
                    <FileText className="size-6 text-[#F5A623] mx-auto mt-1" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[#1A1A1A]">{contract.donorName}</span>
                    <ArrowRight className="size-4 text-[#E8E4DC]" />
                    <span className="font-bold text-[#1A1A1A]">{contract.receiverName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500 font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1.5"><Clock className="size-3.5" /> {contract.foodType}</span>
                    <span className="size-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> {contract.estimatedQuantity}</span>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-64 space-y-2">
                <div className="flex justify-between text-xs font-black text-[#A39E93] uppercase tracking-widest">
                  <span>Progress</span>
                  <span className="text-[#F5A623]">{Math.round((contract.deliveriesCompleted / contract.totalDeliveries) * 100)}%</span>
                </div>
                <div className="h-2 w-full bg-[#F5F2EC] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#F5A623] rounded-full transition-all duration-1000" 
                    style={{ width: `${(contract.deliveriesCompleted / contract.totalDeliveries) * 100}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-tighter">
                  {contract.deliveriesCompleted} of {contract.totalDeliveries} deliveries completed
                </p>
              </div>

              <div className="flex gap-2">
                <span className="px-4 py-2 bg-[#FFF3D0] text-[#C78A0E] rounded-xl text-xs font-black uppercase tracking-wider border border-[#FFE49A] flex items-center gap-2">
                  <CheckCircle2 className="size-3.5" />
                  Active
                </span>
                <button className="p-2.5 text-[#A39E93] hover:bg-[#FFF3D0] rounded-xl transition-all border border-[#E8E4DC]">
                  <AlertCircle className="size-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-br from-[#F5A623] to-[#E8A317] p-8 rounded-3xl shadow-xl shadow-[#F5A623]/20 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white max-w-xl text-center md:text-left">
              <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Build stronger community ties.</h2>
              <p className="text-[#FFF3D0] font-medium">Entering a commitment contract guarantees a steady food supply for organizations and reduces logistics overhead for donors.</p>
            </div>
            <button className="bg-white text-[#C78A0E] px-8 py-4 rounded-2xl font-black shadow-lg hover:bg-[#FFFBEB] transition-all shrink-0">
              {user?.role === "donor" ? "Propose a New Partnership" : "Request a Commitment"}
            </button>
          </div>
          <Heart className="absolute -bottom-8 -right-8 size-48 text-white/10 fill-white/10" />
        </div>
      </div>
    </div>
  );
}
