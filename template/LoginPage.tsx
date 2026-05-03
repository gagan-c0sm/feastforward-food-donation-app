import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Leaf, Mail, Lock, Loader2, Store, Users, Truck, ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { GoldAsterisk, DarkLeaf, GreenHerb, GreenCircle } from "../components/decorators/Decorators";

// ─── Role config — same logic, new green palette ──────────────────────────────
const ROLE_CONFIG = {
  donor: {
    label: "Restaurant / Donor",
    desc: "Share surplus food with those in need",
    icon: Store,
    color: "var(--primary)",
    bg: "var(--green-50)",
    border: "var(--green-100)",
    testEmail: "donor@feastforward.com",
  },
  receiver: {
    label: "NGO / Shelter",
    desc: "Request food for your organisation",
    icon: Users,
    color: "var(--primary-dark)",
    bg: "var(--green-50)",
    border: "var(--green-100)",
    testEmail: "receiver@feastforward.com",
  },
  volunteer: {
    label: "Volunteer Driver",
    desc: "Help transport donations to shelters",
    icon: Truck,
    color: "var(--accent)",
    bg: "var(--gold-100)",
    border: "var(--gold-300)",
    testEmail: "volunteer@feastforward.com",
  },
};

// ─── Shared input style ────────────────────────────────────────────────────────
const inputClass =
  "block w-full pl-11 pr-4 py-3 rounded-2xl text-sm outline-none transition-all focus:ring-2";
const inputStyle = {
  backgroundColor: "var(--muted)",
  border: "1.5px solid var(--border)",
  color: "var(--foreground)",
  "--tw-ring-color": "var(--primary)",
} as React.CSSProperties;

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login }   = useAuth();
  const navigate    = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const ok = await login(email, password);
      if (ok) { toast.success("Welcome back! 🌱"); navigate("/dashboard"); }
      else      toast.error("Invalid email or password");
    } catch { toast.error("An error occurred during login"); }
    finally  { setIsLoading(false); }
  };

  // ── PHASE 1: Role selector ─────────────────────────────────────────────────
  if (!selectedRole) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* ── Decorative layer (mirrors template) ─────────────── */}
        <DarkLeaf  size={72}  className="absolute top-6  right-8  opacity-90" />
        <GreenHerb size={52}  className="absolute bottom-10 right-20 opacity-80" />
        <GoldAsterisk size={60} className="absolute bottom-16 left-12 opacity-90" />
        <GreenCircle  size={100} className="absolute left-0 top-1/3 opacity-60" />
        <GoldAsterisk size={32} className="absolute top-20 left-1/4 opacity-50" />

        <div className="w-full max-w-3xl relative z-10">

          {/* Heading */}
          <div className="text-center mb-14">
            <div
              className="inline-flex items-center justify-center p-3 rounded-2xl mb-6 border"
              style={{ backgroundColor: "var(--green-50)", borderColor: "var(--green-100)" }}
            >
              <Leaf className="size-10" style={{ color: "var(--primary)" }} />
            </div>
            <h1
              className="text-5xl mb-3"
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 900,
                color: "var(--foreground)",
                lineHeight: 1.1,
              }}
            >
              Welcome to<br />
              <span style={{ color: "var(--primary)" }}>FeastForward</span>
            </h1>
            <p className="text-lg font-medium max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Connecting surplus food with those in need.<br />Choose how you'd like to contribute.
            </p>
          </div>

          {/* Role cards — template-style with hover lift */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {Object.entries(ROLE_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedRole(key);
                  setEmail(cfg.testEmail);
                  setPassword("password123");
                }}
                className="group relative rounded-3xl p-8 border-2 text-left cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "var(--border)",
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--primary)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
              >
                <div
                  className="size-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 border"
                  style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
                >
                  <cfg.icon className="size-8" style={{ color: cfg.color }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  {cfg.label}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {cfg.desc}
                </p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="size-5" style={{ color: "var(--primary)" }} />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-sm" style={{ color: "var(--cream-400)" }}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-bold transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // ── PHASE 2: Login form ────────────────────────────────────────────────────
  const cfg = ROLE_CONFIG[selectedRole as keyof typeof ROLE_CONFIG];

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Decorators */}
      <DarkLeaf   size={60} className="absolute top-4 right-6 opacity-80" />
      <GoldAsterisk size={40} className="absolute bottom-20 left-8 opacity-70" />
      <GreenCircle size={80} className="absolute left-0 top-1/2 opacity-40" />

      <div className="w-full max-w-md relative z-10">
        {/* Back button */}
        <button
          onClick={() => { setSelectedRole(null); setEmail(""); setPassword(""); }}
          className="flex items-center gap-2 font-bold mb-8 transition-all group"
          style={{ color: "var(--muted-foreground)" }}
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to role selection
        </button>

        {/* Card */}
        <div
          className="rounded-3xl p-10 border shadow-lg"
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
            boxShadow: "0 20px 60px rgba(91,155,71,0.08)",
          }}
        >
          {/* Card header */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b" style={{ borderColor: "var(--muted)" }}>
            <div
              className="size-14 rounded-2xl flex items-center justify-center border"
              style={{ backgroundColor: cfg.bg, borderColor: cfg.border }}
            >
              <cfg.icon className="size-7" style={{ color: cfg.color }} />
            </div>
            <div>
              <h2
                className="text-2xl"
                style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--foreground)" }}
              >
                Sign In
              </h2>
              <p
                className="text-[10px] uppercase tracking-widest font-bold mt-0.5"
                style={{ color: "var(--primary)" }}
              >
                {cfg.label}
              </p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                Email address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
                  style={{ color: "var(--cream-400)" }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4"
                  style={{ color: "var(--cream-400)" }}
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className={inputClass}
                  style={inputStyle}
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember + forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--muted-foreground)" }}>
                <input
                  type="checkbox"
                  className="rounded"
                  style={{ accentColor: "var(--primary)" }}
                />
                Remember me
              </label>
              <a
                href="#"
                className="text-sm font-bold"
                style={{ color: "var(--primary)" }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 rounded-2xl text-sm font-bold text-white transition-all active:scale-[0.98] disabled:opacity-50"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 8px 24px rgba(91,155,71,0.25)",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              {isLoading ? <Loader2 className="size-5 animate-spin" /> : "Sign in →"}
            </button>
          </form>

          {/* Quick login */}
          <div className="mt-6 pt-6 border-t" style={{ borderColor: "var(--muted)" }}>
            <p
              className="text-center text-[10px] uppercase tracking-widest font-bold mb-3"
              style={{ color: "var(--cream-400)" }}
            >
              Quick Test Login
            </p>
            <button
              onClick={handleSubmit as any}
              className="w-full p-3 rounded-2xl text-sm font-medium transition-all border border-dashed"
              style={{
                borderColor: "var(--border)",
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "var(--primary)";
                e.currentTarget.style.backgroundColor = "var(--green-50)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              Auto-fill as{" "}
              <span className="font-bold" style={{ color: "var(--foreground)" }}>
                {cfg.label}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
