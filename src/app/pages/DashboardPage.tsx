import React, { useState, useEffect } from "react";
import { Package, Users, CheckCircle2, TrendingUp, Clock, FileText, ChevronRight, Store, MapPin, Heart, Star, Leaf, ArrowUpRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { GoldAsterisk, DarkLeaf, GreenHerb, TinyLeaf } from "../components/decorators/Decorators";
import { api } from "../lib/api";

const MOCK_CHART_DATA = [
  { name: "Sun", value: 400 },
  { name: "Mon", value: 300 },
  { name: "Tue", value: 600 },
  { name: "Wed", value: 800 },
  { name: "Thu", value: 500 },
  { name: "Fri", value: 900 },
  { name: "Sat", value: 700 },
];

// ─── Reusable card shell ───────────────────────────────────────────────────────
function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-[32px] border shadow-sm ${className}`}
      style={{ backgroundColor: "var(--card)", borderColor: "var(--border)", ...style }}
    >
      {children}
    </div>
  );
}

export function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const getRecentActivity = () => [
    { id: 1, title: "Hope Shelter matched with you",       time: "2h ago",  status: "Active" },
    { id: 2, title: "New request from Community Center",   time: "5h ago",  status: "Pending" },
    { id: 3, title: "Pasta Palace joined your network",    time: "1d ago",  status: "New" },
  ];

  const activities = getRecentActivity();

  return (
    <div
      className="flex-1 overflow-auto p-4 lg:p-8 relative"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* ── Floating decorators ── */}
      <DarkLeaf    size={64} className="absolute top-4 right-6  pointer-events-none opacity-80" />
      <GreenHerb   size={44} className="absolute top-24 right-24 pointer-events-none opacity-60" />
      <GoldAsterisk size={36} className="absolute bottom-16 right-10 pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── MAIN COLUMN ─────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Page heading */}
            <div className="flex justify-between items-center">
              <div>
                <h1
                  className="text-3xl tracking-tight"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}
                >
                  Welcome back, {user?.name.split(" ")[0]}! 🌿
                </h1>
                <p className="font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>
                  Here's a breakdown of your community impact today.
                </p>
              </div>
            </div>

            {/* Impact tracker card */}
            <Card className="p-10 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex gap-4 items-center">
                  <div
                    className="p-3 rounded-2xl"
                    style={{ backgroundColor: "var(--primary)", boxShadow: "0 8px 20px rgba(91,155,71,0.25)" }}
                  >
                    <TrendingUp className="size-6 text-white" />
                  </div>
                  <div>
                    <h2
                      className="text-2xl"
                      style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--foreground)" }}
                    >
                      Impact Tracker
                    </h2>
                    <p
                      className="text-[10px] font-bold uppercase tracking-widest mt-1"
                      style={{ color: "var(--cream-400)" }}
                    >
                      Weekly Performance
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black leading-none" style={{ color: "var(--foreground)" }}>
                    1,247
                  </div>
                  <div
                    className="flex items-center gap-1.5 font-black mt-2 text-sm"
                    style={{ color: "var(--primary)" }}
                  >
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
                      tick={{ fill: "var(--cream-400)", fontSize: 12, fontWeight: 700 }}
                      dy={10}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(91,155,71,0.06)" }}
                      contentStyle={{
                        borderRadius: "16px",
                        border: "1px solid var(--border)",
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
                      {MOCK_CHART_DATA.map((_, i) => (
                        <Cell key={i} fill={i === 5 ? "var(--primary)" : "var(--green-100)"} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Background leaf watermark */}
              <Leaf
                className="absolute -bottom-10 -right-10 size-56 -rotate-12 transition-transform duration-700 group-hover:scale-110"
                style={{ color: "var(--green-50)" }}
              />
            </Card>

            {/* Bottom row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Community connections */}
              <Card className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                    Community
                  </h3>
                  <button
                    className="text-xs font-black uppercase tracking-widest"
                    style={{ color: "var(--primary)" }}
                  >
                    See all
                  </button>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Hope Shelter",    role: "Receiver",  bg: "var(--green-50)",  text: "var(--primary)" },
                    { name: "Pasta Palace",    role: "Donor",     bg: "var(--green-50)",  text: "var(--primary-dark)" },
                    { name: "Alex Volunteer",  role: "Volunteer", bg: "var(--gold-100)",  text: "var(--accent)" },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer group border border-transparent"
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor = "var(--green-50)";
                        e.currentTarget.style.borderColor = "var(--border)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="size-12 rounded-2xl flex items-center justify-center font-black text-lg"
                          style={{ backgroundColor: p.bg, color: p.text }}
                        >
                          {p.name[0]}
                        </div>
                        <div>
                          <p className="font-bold" style={{ color: "var(--foreground)" }}>{p.name}</p>
                          <p
                            className="text-xs font-bold uppercase tracking-tight"
                            style={{ color: "var(--cream-400)" }}
                          >
                            {p.role}
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        className="size-5 transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--border)" }}
                      />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Contracts CTA — uses template's accent gold gradient */}
              <div
                className="rounded-[32px] border p-8 relative overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, var(--gold-100), var(--gold-300))",
                  borderColor: "rgba(212,169,41,0.3)",
                }}
              >
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                      Commitment Contracts
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--cream-600)" }}>
                      Regularize your food supply lines and build long-term trust.
                    </p>
                  </div>
                  <button
                    className="w-full py-4 rounded-2xl font-bold mt-6 flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md"
                    style={{ backgroundColor: "var(--card)", color: "var(--primary-dark)" }}
                  >
                    Propose Contract <ChevronRight className="size-4" />
                  </button>
                </div>
                {/* Asterisk watermark */}
                <GoldAsterisk size={80} className="absolute -bottom-4 -right-4 opacity-20" />
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ─────────────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-8">

            {/* Recent activity */}
            <Card className="p-8">
              <div className="flex justify-between items-center mb-8 px-1">
                <h3 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>
                  Recent Activity
                </h3>
                <button className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--primary)" }}>
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {activities.map(act => (
                  <div
                    key={act.id}
                    className="p-5 rounded-[24px] transition-all cursor-pointer border border-transparent"
                    style={{ backgroundColor: "var(--muted)" }}
                    onMouseEnter={e => {
                      e.currentTarget.style.backgroundColor = "var(--card)";
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(91,155,71,0.08)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.backgroundColor = "var(--muted)";
                      e.currentTarget.style.borderColor = "transparent";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border"
                        style={{
                          backgroundColor: "var(--green-50)",
                          color: "var(--primary)",
                          borderColor: "var(--green-100)",
                        }}
                      >
                        {act.status}
                      </span>
                      <span
                        className="text-[10px] font-black uppercase"
                        style={{ color: "var(--cream-400)" }}
                      >
                        {act.time}
                      </span>
                    </div>
                    <p className="font-bold text-sm leading-snug" style={{ color: "var(--foreground)" }}>
                      {act.title}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick stats */}
            <Card className="p-8">
              <h3 className="text-xl font-bold mb-6 px-1" style={{ color: "var(--foreground)" }}>
                Quick Stats
              </h3>
              <div className="space-y-4">
                {stats.map((s, i) => {
                  const IconComponent = { Package, Users, CheckCircle2, Store, MapPin, Clock, Heart }[s.icon] || Package;
                  return (
                  <div
                    key={i}
                    className="p-6 rounded-[24px] border border-white flex justify-between items-center cursor-pointer transition-all group"
                    style={{ backgroundColor: s.bg }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = "inset 0 2px 8px rgba(0,0,0,0.06)")}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <div className="flex gap-4 items-center">
                      <div className="bg-white p-3 rounded-2xl shadow-sm">
                        <IconComponent className="size-5" style={{ color: s.color }} />
                      </div>
                      <div>
                        <p
                          className="text-[10px] font-black uppercase tracking-widest leading-none mb-1"
                          style={{ color: "var(--cream-400)" }}
                        >
                          {s.label}
                        </p>
                        <p className="text-xl font-black" style={{ color: "var(--foreground)" }}>
                          {s.value}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight
                      className="size-5 transition-colors"
                      style={{ color: "var(--border)" }}
                    />
                  </div>
                  );
                })}
              </div>
            </Card>

            {/* Appreciation snapshot — dark card */}
            <div
              className="rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden"
              style={{ backgroundColor: "var(--green-700)" }}
            >
              <TinyLeaf size={40} className="absolute top-4 right-4 opacity-30" />
              <div className="flex items-center gap-3 mb-6">
                <Star className="size-6 fill-current" style={{ color: "var(--accent)" }} />
                <h3 className="text-xl font-bold tracking-tight">Appreciation</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-end gap-2">
                  <span
                    className="text-5xl font-black leading-none"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    4.9
                  </span>
                  <span
                    className="font-bold mb-1 uppercase tracking-tight text-xs opacity-60"
                  >
                    Overall Rating
                  </span>
                </div>
                <div className="flex gap-1 py-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" style={{ color: "var(--accent)" }} />
                  ))}
                </div>
                <p className="text-sm font-medium italic opacity-70">
                  "The Green Kitchen is a gold standard in our community."
                </p>
                <button
                  className="w-full mt-4 flex items-center justify-between p-4 rounded-2xl transition-all group"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)")}
                >
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
