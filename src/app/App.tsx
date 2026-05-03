import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { RequestFood } from "./components/request-food";
import { PostAvailability } from "./components/post-availability";
import { VolunteerTransport } from "./components/volunteer-transport";
import { LogOut, Home, Star, FileText, BookOpen, Menu, X, Search, User as UserIcon, Leaf, Package, HandPlatter, Truck } from "lucide-react";
import { useState } from "react";
import { Toaster } from "sonner";
import { AppreciationPage } from "./pages/AppreciationPage";
import { ContractsPage } from "./pages/ContractsPage";
import { GuidePage } from "./pages/GuidePage";
import { GoldRing, TinyLeaf } from "./components/decorators/Decorators";

function AppContent() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home",      path: "/dashboard",   icon: Home,     roles: ["donor", "receiver", "volunteer"] },
    { label: "Donate",    path: "/donate",      icon: Package,  roles: ["donor"] },
    { label: "Requests",  path: "/requests",    icon: HandPlatter, roles: ["receiver"] },
    { label: "Transport", path: "/transport",   icon: Truck,    roles: ["volunteer"] },
    { label: "Discover",  path: "/appreciation", icon: Star,     roles: ["donor", "receiver", "volunteer"] },
    { label: "Contracts", path: "/contracts",   icon: FileText, roles: ["donor", "receiver"] },
    { label: "Guide",     path: "/guide",       icon: BookOpen, roles: ["donor", "receiver", "volunteer"] },
  ];

  const filteredNavItems = navItems.filter(item =>
    !item.roles || (user && item.roles.includes(user.role))
  );

  const isActive = (path: string) => location.pathname === path;

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: "var(--primary)" }}></div></div>;
  }

  if (!isAuthenticated && !["/login", "/signup"].includes(location.pathname)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--background)" }}>

      {/* ── NAVBAR ── */}
      {isAuthenticated && (
        <header
          className="sticky top-0 z-50 backdrop-blur-sm border-b"
          style={{
            backgroundColor: "rgba(242, 237, 224, 0.96)",
            borderColor: "var(--border)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-6">

              {/* Logo */}
              <Link to="/dashboard" className="flex items-center gap-2 shrink-0">
                <div
                  className="p-1.5 rounded-xl"
                  style={{ backgroundColor: "var(--primary)" }}
                >
                  <Leaf className="size-5 text-white" />
                </div>
                <span
                  className="text-xl tracking-tight"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontWeight: 900,
                    color: "var(--foreground)",
                  }}
                >
                  FeastForward
                </span>
                <GoldRing size={22} className="ml-1 hidden md:block" />
              </Link>

              {/* Nav links */}
              <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="relative px-4 py-5 text-sm font-bold transition-all"
                    style={{
                      color: isActive(item.path)
                        ? "var(--primary)"
                        : "var(--cream-600)",
                      fontFamily: "var(--font-heading)",
                    }}
                  >
                    {item.label}
                    {isActive(item.path) && (
                      <span
                        className="absolute bottom-3 left-4 right-4 h-0.5 rounded-full"
                        style={{ backgroundColor: "var(--primary)" }}
                      />
                    )}
                  </Link>
                ))}
              </nav>

              {/* Right side: search + user */}
              <div className="hidden md:flex items-center gap-3">
                {/* Search */}
                <div className="relative group">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-4 transition-colors"
                    style={{ color: "var(--cream-400)" }}
                  />
                  <input
                    type="text"
                    placeholder="Search donations..."
                    className="pl-9 pr-4 py-2 text-sm rounded-full outline-none focus:ring-2 transition-all w-44 focus:w-56"
                    style={{
                      backgroundColor: "var(--muted)",
                      border: "1.5px solid var(--border)",
                      color: "var(--foreground)",
                      ringColor: "var(--primary)",
                    }}
                  />
                </div>

                {/* Divider */}
                <div className="h-7 w-px" style={{ backgroundColor: "var(--border)" }} />

                {/* User info */}
                <div className="flex items-center gap-2">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold leading-none" style={{ color: "var(--foreground)" }}>
                      {user?.name}
                    </p>
                    <p
                      className="text-[10px] uppercase tracking-wider font-bold mt-0.5"
                      style={{ color: "var(--primary)" }}
                    >
                      {user?.role}
                    </p>
                  </div>
                  <div
                    className="size-9 rounded-xl flex items-center justify-center border cursor-pointer transition-all hover:shadow-md"
                    style={{
                      backgroundColor: "var(--green-50)",
                      borderColor: "var(--green-100)",
                    }}
                  >
                    <UserIcon className="size-5" style={{ color: "var(--primary-dark)" }} />
                  </div>
                </div>

                <button
                  onClick={logout}
                  className="p-2 rounded-xl transition-all hover:bg-red-50"
                  style={{ color: "var(--cream-400)" }}
                  title="Logout"
                >
                  <LogOut className="size-4" />
                </button>
              </div>

              {/* Mobile burger */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-xl"
                  style={{ color: "var(--cream-600)" }}
                >
                  {isMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div
              className="md:hidden border-t py-3 px-4 animate-in slide-in-from-top duration-200"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="space-y-1 pb-3 pt-2">
                {filteredNavItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-2xl text-base font-bold transition-all"
                    style={{
                      backgroundColor: isActive(item.path) ? "var(--green-50)" : "transparent",
                      color: isActive(item.path) ? "var(--primary)" : "var(--cream-600)",
                    }}
                  >
                    <item.icon className="size-5 mr-3" />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => { logout(); setIsMenuOpen(false); }}
                  className="flex w-full items-center px-4 py-3 rounded-2xl text-base font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                  <LogOut className="size-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </header>
      )}

      {/* ── ROUTES ── */}
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/login"   element={!isAuthenticated ? <LoginPage />  : <Navigate to="/dashboard" />} />
          <Route path="/signup"  element={!isAuthenticated ? <SignupPage /> : <Navigate to="/dashboard" />} />

          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/donate"    element={<ProtectedRoute allowedRoles={["donor"]}><PostAvailability /></ProtectedRoute>} />
          <Route path="/requests"  element={<ProtectedRoute allowedRoles={["receiver"]}><RequestFood /></ProtectedRoute>} />
          <Route path="/transport" element={<ProtectedRoute allowedRoles={["volunteer"]}><VolunteerTransport /></ProtectedRoute>} />
          <Route path="/appreciation" element={<ProtectedRoute><AppreciationPage /></ProtectedRoute>} />
          <Route path="/contracts"    element={<ProtectedRoute allowedRoles={["donor", "receiver"]}><ContractsPage /></ProtectedRoute>} />
          <Route path="/guide"        element={<ProtectedRoute><GuidePage /></ProtectedRoute>} />
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
