import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RequestFood } from "./components/request-food";
import { PostAvailability } from "./components/post-availability";
import { VolunteerTransport } from "./components/volunteer-transport";
import { Heart, LogOut, Home, Star, FileText, BookOpen, Utensils, Users, Truck, Menu, X, Search, Bell, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { AppreciationPage } from "./pages/AppreciationPage";
import { ContractsPage } from "./pages/ContractsPage";
import { GuidePage } from "./pages/GuidePage";

function AppContent() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/dashboard", icon: Home, roles: ["donor", "receiver", "volunteer"] },
    { label: "Discover", path: "/appreciation", icon: Star, roles: ["donor", "receiver", "volunteer"] },
    { label: "Contracts", path: "/contracts", icon: FileText, roles: ["donor", "receiver"] },
    { label: "Guide", path: "/guide", icon: BookOpen, roles: ["donor", "receiver", "volunteer"] },
  ];

  const filteredNavItems = navItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  const isActive = (path: string) => location.pathname === path;

  if (!isAuthenticated && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFF8E7' }}>
      {isAuthenticated && (
        <header className="bg-[#FFF8E7] border-b border-[#E8E4DC] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center flex-1">
                <Link to="/dashboard" className="flex items-center gap-2 mr-8">
                  <div className="bg-[#F5A623] p-1.5 rounded-lg shadow-sm shadow-amber-200">
                    <Heart className="size-6 text-white fill-white" />
                  </div>
                  <span className="text-xl tracking-tight text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
                    FeastForward
                  </span>
                </Link>
                
                <nav className="hidden lg:flex items-center space-x-1">
                  {filteredNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-4 py-5 text-sm font-semibold transition-all ${
                        isActive(item.path)
                          ? "text-[#E8A317]"
                          : "text-[#6B6458] hover:text-[#1A1A1A]"
                      }`}
                    >
                      {item.label}
                      {isActive(item.path) && (
                        <div className="absolute bottom-4 left-4 right-4 h-0.5 bg-[#F5A623] rounded-full animate-in fade-in zoom-in duration-300" />
                      )}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#A39E93] group-focus-within:text-[#F5A623] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Search for donations or partners..." 
                    className="w-full pl-10 pr-4 py-2 bg-[#F5F2EC] border border-[#E8E4DC] rounded-xl text-sm focus:ring-2 focus:ring-[#F5A623] focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="hidden md:flex items-center gap-2">
                <button className="p-2.5 text-[#6B6458] hover:bg-[#FFF0D4] rounded-xl transition-all relative">
                  <Bell className="size-5" />
                  <span className="absolute top-2 right-2 size-2 bg-[#F5A623] rounded-full border-2 border-[#FFF8E7]"></span>
                </button>
                
                <div className="h-8 w-px bg-[#E8E4DC] mx-2"></div>

                <div className="flex items-center gap-3 pl-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-[#1A1A1A] leading-none">{user?.name}</span>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#A39E93] mt-1">{user?.role}</span>
                  </div>
                  <div className="size-10 bg-gradient-to-br from-[#FFF3D0] to-[#FFE49A] rounded-xl flex items-center justify-center border border-[#F5A623]/30 shadow-sm overflow-hidden group hover:shadow-md transition-all cursor-pointer">
                    <UserIcon className="size-6 text-[#C78A0E]" />
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="ml-2 p-2.5 text-[#A39E93] hover:text-[#E53935] hover:bg-red-50 rounded-xl transition-all"
                  title="Logout"
                >
                  <LogOut className="size-5" />
                </button>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-100 py-2 px-4 shadow-lg animate-in slide-in-from-top duration-200">
              <div className="space-y-1 pb-3 pt-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-base font-medium ${
                      isActive(item.path)
                        ? "bg-green-50 text-green-700"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="size-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center px-4 py-3 rounded-xl text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="size-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>
      )}

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
          <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          <Route path="/donate" element={
            <ProtectedRoute allowedRoles={["donor"]}>
              <PostAvailability />
            </ProtectedRoute>
          } />
          
          <Route path="/requests" element={
            <ProtectedRoute allowedRoles={["receiver"]}>
              <RequestFood />
            </ProtectedRoute>
          } />
          
          <Route path="/transport" element={
            <ProtectedRoute allowedRoles={["volunteer"]}>
              <VolunteerTransport />
            </ProtectedRoute>
          } />

          <Route path="/appreciation" element={
            <ProtectedRoute>
              <AppreciationPage />
            </ProtectedRoute>
          } />

          <Route path="/contracts" element={
            <ProtectedRoute allowedRoles={["donor", "receiver"]}>
              <ContractsPage />
            </ProtectedRoute>
          } />

          <Route path="/guide" element={
            <ProtectedRoute>
              <GuidePage />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}
