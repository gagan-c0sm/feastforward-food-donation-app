import React from "react";
import { useAuth } from "../context/AuthContext";
import { 
  TrendingUp, Clock, CheckCircle2, 
  ChevronRight, Heart, Package, MapPin, Bell, 
  ArrowUpRight, Users, Store, Truck, Star
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';

const MOCK_CHART_DATA = [
  { name: 'Sun', value: 400 },
  { name: 'Mon', value: 300 },
  { name: 'Tue', value: 600 },
  { name: 'Wed', value: 800 },
  { name: 'Thu', value: 500 },
  { name: 'Fri', value: 900 },
  { name: 'Sat', value: 700 },
];

export function DashboardPage() {
  const { user } = useAuth();

  const getStats = () => {
    switch (user?.role) {
      case "donor":
        return [
          { label: "Food Donated", value: "450kg", icon: Package, color: "text-[#F5A623]", bg: "bg-[#FFF3D0]" },
          { label: "People Served", value: "1,200", icon: Users, color: "text-[#C78A0E]", bg: "bg-[#FFFBEB]" },
          { label: "Active Posts", value: "3", icon: Store, color: "text-[#E8A317]", bg: "bg-[#FFF0D4]" },
        ];
      case "receiver":
        return [
          { label: "Active Requests", value: "2", icon: Users, color: "text-[#E8A317]", bg: "bg-[#FFFBEB]" },
          { label: "Received (MTD)", value: "120kg", icon: Package, color: "text-[#F5A623]", bg: "bg-[#FFF3D0]" },
          { label: "Matches Found", value: "18", icon: Heart, color: "text-[#C78A0E]", bg: "bg-[#FFF0D4]" },
        ];
      case "volunteer":
        return [
          { label: "Deliveries", value: "24", icon: CheckCircle2, color: "text-[#F5A623]", bg: "bg-[#FFF3D0]" },
          { label: "Distance", value: "86km", icon: MapPin, color: "text-[#E8A317]", bg: "bg-[#FFFBEB]" },
          { label: "Time Contributed", value: "32h", icon: Clock, color: "text-[#C78A0E]", bg: "bg-[#FFF0D4]" },
        ];
      default:
        return [];
    }
  };

  const getRecentActivity = () => [
    { id: 1, title: "Hope Shelter matched with you", time: "2h ago", status: "Active" },
    { id: 2, title: "New request from Community Center", time: "5h ago", status: "Pending" },
    { id: 3, title: "Pasta Palace joined your network", time: "1d ago", status: "New" },
  ];

  const stats = getStats();
  const activities = getRecentActivity();

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="flex justify-between items-center mb-2">
              <div>
                <h1 className="text-3xl tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
                  Welcome back, {user?.name.split(' ')[0]}!
                </h1>
                <p className="text-[#6B6458] font-medium mt-1">Here's a breakdown of your community impact today.</p>
              </div>
              <button className="bg-white p-3 rounded-2xl border border-[#E8E4DC] shadow-sm hover:shadow-md transition-all">
                <Bell className="size-5 text-[#A39E93]" />
              </button>
            </div>

            {/* Impact Tracker */}
            <div className="bg-white rounded-[32px] shadow-sm border border-[#E8E4DC] p-10 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex gap-4 items-center">
                  <div className="bg-[#F5A623] p-3 rounded-2xl shadow-lg shadow-[#F5A623]/20">
                    <TrendingUp className="size-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                      Impact Tracker
                    </h2>
                    <p className="text-sm font-bold text-[#A39E93] uppercase tracking-widest mt-1">Weekly Performance</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-[#1A1A1A] leading-none">1,247</div>
                  <div className="flex items-center gap-1.5 text-[#F5A623] font-black mt-2 text-sm">
                    <ArrowUpRight className="size-4" />
                    +24% meals served
                  </div>
                </div>
              </div>

              <div className="h-64 w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_CHART_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#A39E93', fontSize: 12, fontWeight: 700 }} 
                      dy={10}
                    />
                    <Tooltip 
                      cursor={{ fill: 'rgba(245,166,35,0.08)' }}
                      contentStyle={{ borderRadius: '16px', border: '1px solid #E8E4DC', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', fontFamily: 'Inter' }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                      {MOCK_CHART_DATA.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index === 5 ? '#F5A623' : '#E8E4DC'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <Heart className="absolute -bottom-16 -right-16 size-80 text-[#FFF3D0]/50 -rotate-12 group-hover:scale-110 transition-transform duration-700" />
            </div>

            {/* Bottom Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Community Connections */}
              <div className="bg-white rounded-[32px] shadow-sm border border-[#E8E4DC] p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold text-[#1A1A1A]">Community</h3>
                  <button className="text-xs font-black uppercase tracking-widest text-[#F5A623] hover:text-[#E8A317] transition-colors">See all</button>
                </div>
                <div className="space-y-4">
                  {[
                    { name: "Hope Shelter", role: "Receiver", bg: "bg-[#FFF3D0]", text: "text-[#C78A0E]" },
                    { name: "Pasta Palace", role: "Donor", bg: "bg-[#FFFBEB]", text: "text-[#E8A317]" },
                    { name: "Alex Volunteer", role: "Volunteer", bg: "bg-[#FFF0D4]", text: "text-[#C78A0E]" }
                  ].map((partner, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-[#FFFBEB] rounded-2xl transition-all cursor-pointer group border border-transparent hover:border-[#E8E4DC]">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 ${partner.bg} rounded-2xl flex items-center justify-center font-black ${partner.text} text-lg`}>
                          {partner.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#1A1A1A]">{partner.name}</p>
                          <p className="text-xs font-bold text-[#A39E93] uppercase tracking-tighter">{partner.role}</p>
                        </div>
                      </div>
                      <ChevronRight className="size-5 text-[#E8E4DC] group-hover:text-[#F5A623] group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Contracts CTA */}
              <div className="bg-gradient-to-br from-[#FFF3D0] to-[#FFE49A] rounded-[32px] shadow-sm border border-[#F5A623]/20 p-8 relative overflow-hidden group">
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-[#1A1A1A]">Commitment Contracts</h3>
                    <p className="text-[#6B6458] font-medium mt-2 text-sm leading-relaxed">Regularize your food supply lines and build long-term trust.</p>
                  </div>
                  <button className="w-full bg-white text-[#C78A0E] py-4 rounded-2xl font-bold shadow-sm group-hover:shadow-md transition-all flex items-center justify-center gap-2 mt-6">
                    Propose Contract
                    <ChevronRight className="size-4" />
                  </button>
                </div>
                <Users className="absolute -bottom-10 -right-10 size-48 text-[#F5A623]/10" />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Activity */}
            <div className="bg-white rounded-[32px] shadow-sm border border-[#E8E4DC] p-8">
              <div className="flex justify-between items-center mb-8 px-2">
                <h3 className="text-xl font-bold text-[#1A1A1A]">Recent Activity</h3>
                <button className="text-xs font-black uppercase tracking-widest text-[#F5A623]">View all</button>
              </div>
              <div className="space-y-4">
                {activities.map((act) => (
                  <div key={act.id} className="p-5 bg-[#F5F2EC] rounded-[24px] hover:bg-white hover:shadow-lg hover:shadow-[#F5A623]/5 transition-all cursor-pointer border border-transparent hover:border-[#E8E4DC]">
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black uppercase tracking-wider text-[#F5A623] border border-[#FFE49A] shadow-sm">
                        {act.status}
                      </span>
                      <span className="text-[10px] font-black text-[#A39E93] uppercase">{act.time}</span>
                    </div>
                    <p className="font-bold text-[#1A1A1A] text-sm leading-snug">{act.title}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-[32px] shadow-sm border border-[#E8E4DC] p-8">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-6 px-2">Quick Stats</h3>
              <div className="grid grid-cols-1 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className={`p-6 rounded-[24px] ${stat.bg} border border-white flex justify-between items-center group cursor-pointer hover:shadow-inner transition-all`}>
                    <div className="flex gap-4 items-center">
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <stat.icon className={`size-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-[#A39E93] uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                        <p className="text-xl font-black text-[#1A1A1A]">{stat.value}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="size-5 text-[#E8E4DC] group-hover:text-[#F5A623] transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Appreciation Snapshot */}
            <div className="bg-[#1A1A1A] rounded-[32px] shadow-xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <Star className="size-6 text-[#F5A623] fill-[#F5A623]" />
                <h3 className="text-xl font-bold tracking-tight">Appreciation</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-black leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>4.9</span>
                  <span className="text-[#A39E93] font-bold mb-1 uppercase tracking-tighter text-xs">Overall Rating</span>
                </div>
                <div className="flex gap-1 py-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 text-[#F5A623] fill-[#F5A623]" />
                  ))}
                </div>
                <p className="text-[#A39E93] text-sm font-medium italic">"The Green Kitchen is a gold standard in our community."</p>
                <button className="w-full mt-6 flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group">
                  <span className="font-bold text-sm">View all testimonials</span>
                  <ChevronRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
