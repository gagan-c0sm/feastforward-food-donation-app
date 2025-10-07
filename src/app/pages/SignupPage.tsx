import React, { useState } from "react";
import { useAuth, UserRole } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Heart, Mail, Lock, User, Loader2, Store, Users, Truck } from "lucide-react";
import { toast } from "sonner";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<UserRole>("donor");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await signup({ email, name, role }, password);
      if (success) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: "donor", title: "Donor", icon: Store, description: "Restaurants & Stores" },
    { id: "receiver", title: "Receiver", icon: Users, description: "Shelters & NGOs" },
    { id: "volunteer", title: "Volunteer", icon: Truck, description: "Transport helpers" },
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex items-center justify-center p-3 bg-[#FFF3D0] rounded-2xl mb-4 border border-[#FFE49A]">
          <Heart className="size-10 text-[#F5A623] fill-[#F5A623]" />
        </div>
        <h1 className="text-3xl text-[#1A1A1A] tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
          Join FeastForward
        </h1>
        <p className="mt-2 text-sm text-[#6B6458] font-medium">
          Be part of the solution to end food waste
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow-xl shadow-[#F5A623]/5 sm:rounded-3xl sm:px-10 border border-[#E8E4DC]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">
                  Full Name / Organization
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="size-4 text-[#A39E93]" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white sm:text-sm transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

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
                    className="block w-full pl-11 pr-4 py-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white sm:text-sm transition-all"
                    placeholder="name@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#1A1A1A] mb-3">
                Select your role
              </label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id as UserRole)}
                    className={`flex flex-col items-center justify-center p-5 border-2 rounded-2xl transition-all duration-300 ${
                      role === r.id
                        ? "bg-[#FFF3D0] border-[#F5A623] shadow-lg shadow-[#F5A623]/10"
                        : "border-[#E8E4DC] hover:border-[#FFE49A] bg-white"
                    }`}
                  >
                    <r.icon className={`size-8 mb-2 transition-colors ${role === r.id ? "text-[#F5A623]" : "text-[#A39E93]"}`} />
                    <span className={`font-bold text-sm ${role === r.id ? "text-[#1A1A1A]" : "text-[#6B6458]"}`}>
                      {r.title}
                    </span>
                    <span className="text-[10px] text-[#A39E93] text-center mt-1 font-medium">
                      {r.description}
                    </span>
                  </button>
                ))}
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
                  className="block w-full pl-11 pr-4 py-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] focus:outline-none focus:ring-2 focus:ring-[#F5A623] focus:border-[#F5A623] focus:bg-white sm:text-sm transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#F5A623] hover:bg-[#E8A317] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F5A623] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#F5A623]/20 active:scale-[0.98]"
            >
              {isLoading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-sm text-[#6B6458]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#F5A623] hover:text-[#E8A317] transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
