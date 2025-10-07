import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Mail, Lock, Loader2, Store, Users, Truck, ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const ROLE_CONFIG = {
  donor: {
    label: "Restaurant / Donor",
    desc: "Share surplus food with those in need",
    icon: Store,
    color: "#F5A623",
    bg: "#FFF3D0",
    testEmail: "donor@feastforward.com",
  },
  receiver: {
    label: "NGO / Shelter",
    desc: "Request food for your organization",
    icon: Users,
    color: "#E8A317",
    bg: "#FFFBEB",
    testEmail: "receiver@feastforward.com",
  },
  volunteer: {
    label: "Volunteer Driver",
    desc: "Help transport donations to shelters",
    icon: Truck,
    color: "#C78A0E",
    bg: "#FFF0D4",
    testEmail: "volunteer@feastforward.com",
  },
};

export function LoginPage() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  // Phase 1: Role selector
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: '#FFF8E7' }}>
        <div className="w-full max-w-3xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-[#FFF3D0] rounded-2xl mb-6 border border-[#FFE49A]">
              <Heart className="size-10 text-[#F5A623] fill-[#F5A623]" />
            </div>
            <h1 className="text-5xl text-[#1A1A1A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, lineHeight: 1.1 }}>
              Welcome to<br />FeastForward
            </h1>
            <p className="text-[#6B6458] text-lg font-medium max-w-md mx-auto">
              Connecting surplus food with those in need. Choose how you'd like to contribute.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(ROLE_CONFIG).map(([key, config]) => (
              <button
                key={key}
                onClick={() => {
                  setSelectedRole(key);
                  setEmail(config.testEmail);
                  setPassword("password123");
                }}
                className="group relative bg-white rounded-3xl p-8 border-2 border-[#E8E4DC] hover:border-[#F5A623] transition-all duration-300 hover:shadow-xl hover:shadow-[#F5A623]/10 hover:-translate-y-2 text-left cursor-pointer"
              >
                <div 
                  className="size-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: config.bg }}
                >
                  <config.icon className="size-8" style={{ color: config.color }} />
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2">{config.label}</h3>
                <p className="text-sm text-[#6B6458] font-medium leading-relaxed">{config.desc}</p>
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ChevronRight className="size-5 text-[#F5A623]" />
                </div>
              </button>
            ))}
          </div>

          <p className="text-center text-sm text-[#A39E93]">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-[#F5A623] hover:text-[#E8A317] transition-colors">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    );
  }

  // Phase 2: Login form after role selected
  const roleConfig = ROLE_CONFIG[selectedRole as keyof typeof ROLE_CONFIG];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="w-full max-w-md">
        <button 
          onClick={() => { setSelectedRole(null); setEmail(""); setPassword(""); }}
          className="flex items-center gap-2 text-[#6B6458] hover:text-[#1A1A1A] font-semibold mb-8 transition-colors group"
        >
          <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
          Back to role selection
        </button>

        <div className="bg-white rounded-3xl shadow-xl shadow-[#F5A623]/5 border border-[#E8E4DC] p-10">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#F5F2EC]">
            <div className="size-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: roleConfig.bg }}>
              <roleConfig.icon className="size-7" style={{ color: roleConfig.color }} />
            </div>
            <div>
              <h2 className="text-2xl text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                Sign In
              </h2>
              <p className="text-sm text-[#A39E93] font-bold uppercase tracking-wider">{roleConfig.label}</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-4 text-[#A39E93]" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white text-sm transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="size-4 text-[#A39E93]" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] placeholder-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#F5A623] focus:ring-[#F5A623] border-[#E8E4DC] rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6B6458]">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm font-semibold text-[#F5A623] hover:text-[#E8A317]">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#F5A623] hover:bg-[#E8A317] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#F5A623]/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F5F2EC]">
            <p className="text-center text-xs text-[#A39E93] mb-3 font-semibold uppercase tracking-wider">Quick Test Login</p>
            <button 
              onClick={handleSubmit as any}
              className="w-full p-3 border border-dashed border-[#E8E4DC] rounded-xl text-sm text-[#6B6458] hover:bg-[#FFF3D0] hover:border-[#F5A623] transition-all font-medium"
            >
              Auto-fill as <span className="font-bold text-[#1A1A1A]">{roleConfig.label}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
