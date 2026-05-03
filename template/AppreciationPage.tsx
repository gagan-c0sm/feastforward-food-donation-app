import React, { useState } from "react";
import { Star, MessageSquare, TrendingUp, Award, ChevronRight, Heart, Filter, X, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { GoldAsterisk, DarkLeaf, GreenHerb } from "../components/decorators/Decorators";

const MOCK_REVIEWS = [
  { id: "1", donorName: "The Green Kitchen", reviewerName: "Hope Shelter", trust: 5, quality: 5, convenience: 4, comment: "Consistently fresh food, always on time! Their vegetarian meals have become a staple for our community.", createdAt: "2026-03-25", likes: 24, featured: true },
  { id: "2", donorName: "Pasta Palace",       reviewerName: "Community Center", trust: 4, quality: 5, convenience: 3, comment: "Great pasta, pickup window could be more flexible. But the quality is always top-notch.", createdAt: "2026-03-24", likes: 18, featured: false },
  { id: "3", donorName: "City Cafe",           reviewerName: "Hope Shelter",      trust: 5, quality: 4, convenience: 5, comment: "Super convenient location and always accommodating with pickup times. A reliable partner.", createdAt: "2026-03-23", likes: 12, featured: false },
  { id: "4", donorName: "The Green Kitchen", reviewerName: "Community Center", trust: 5, quality: 5, convenience: 5, comment: "Perfect partner. They even adjusted their schedule to match our feeding times.", createdAt: "2026-03-22", likes: 31, featured: false },
  { id: "5", donorName: "Pasta Palace",       reviewerName: "Youth Haven",        trust: 4, quality: 4, convenience: 4, comment: "Reliable and consistent. The kids love their breadsticks!", createdAt: "2026-03-21", likes: 9, featured: false },
];

const LEADERBOARD = [
  { name: "The Green Kitchen", score: 4.9, count: 124, trend: "+0.2" },
  { name: "Pasta Palace",       score: 4.6, count:  89, trend: "+0.1" },
  { name: "City Cafe",           score: 4.5, count:  67, trend: "+0.3" },
  { name: "Organic Grocer",     score: 4.3, count:  45, trend: "—" },
];

const FILTER_TABS = ["All", "Trust Leaders", "Quality Stars", "Most Convenient"];

export function AppreciationPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [hoveredStars, setHoveredStars] = useState<{ [k: string]: number }>({});
  const [newReview, setNewReview] = useState({ donor: "", trust: 0, quality: 0, convenience: 0, comment: "" });
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const filteredReviews = () => {
    switch (activeFilter) {
      case "Trust Leaders":   return [...MOCK_REVIEWS].sort((a, b) => b.trust - a.trust);
      case "Quality Stars":   return [...MOCK_REVIEWS].sort((a, b) => b.quality - a.quality);
      case "Most Convenient": return [...MOCK_REVIEWS].sort((a, b) => b.convenience - a.convenience);
      default: return MOCK_REVIEWS;
    }
  };

  const handleLike = (id: string) =>
    setLikedReviews(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const handleSubmitReview = () => {
    if (!newReview.donor || !newReview.comment || newReview.trust === 0) {
      toast.error("Please fill all fields and rate at least Trust");
      return;
    }
    toast.success("Your review has been published! 🌱");
    setShowWriteReview(false);
    setNewReview({ donor: "", trust: 0, quality: 0, convenience: 0, comment: "" });
  };

  const InteractiveStars = ({ category, value, onChange }: { category: string; value: number; onChange: (v: number) => void }) => {
    const hovered = hoveredStars[category] || 0;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStars(p => ({ ...p, [category]: star }))}
            onMouseLeave={() => setHoveredStars(p => ({ ...p, [category]: 0 }))}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-125 active:scale-95"
          >
            <Star
              className={`size-6 transition-colors ${star <= (hovered || value) ? "fill-current" : ""}`}
              style={{ color: star <= (hovered || value) ? "var(--primary)" : "var(--border)" }}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 relative" style={{ backgroundColor: "var(--background)" }}>
      {/* Decorators */}
      <DarkLeaf    size={60} className="absolute top-4 right-8  pointer-events-none opacity-80" />
      <GreenHerb   size={44} className="absolute top-20 right-24 pointer-events-none opacity-60" />
      <GoldAsterisk size={40} className="absolute bottom-20 left-8 pointer-events-none opacity-60" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h1
              className="text-4xl mb-2"
              style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}
            >
              Appreciation Forum
            </h1>
            <p className="text-lg font-medium" style={{ color: "var(--muted-foreground)" }}>
              Celebrating the donors making a difference in our community.
            </p>
          </div>
          {user?.role === "receiver" && (
            <button
              onClick={() => setShowWriteReview(true)}
              className="text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 active:scale-[0.97] shrink-0 transition-all"
              style={{
                backgroundColor: "var(--primary)",
                boxShadow: "0 8px 24px rgba(91,155,71,0.25)",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
            >
              <MessageSquare className="size-5" />
              Share Your Gratitude
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className="px-5 py-2.5 rounded-2xl text-sm font-bold transition-all whitespace-nowrap border"
              style={
                activeFilter === tab
                  ? {
                      backgroundColor: "var(--primary)",
                      color: "#fff",
                      borderColor: "var(--primary)",
                      boxShadow: "0 4px 12px rgba(91,155,71,0.25)",
                    }
                  : {
                      backgroundColor: "var(--card)",
                      color: "var(--muted-foreground)",
                      borderColor: "var(--border)",
                    }
              }
            >
              {tab === "All" && <Filter className="size-3.5 inline mr-1.5" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Review feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <TrendingUp className="size-5" style={{ color: "var(--primary)" }} />
              Latest Community Praise
            </h2>

            {filteredReviews().map(review => (
              <div
                key={review.id}
                className="p-7 rounded-3xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: review.featured ? "var(--green-50)" : "var(--card)",
                  borderColor: review.featured ? "var(--primary)" : "var(--border)",
                }}
              >
                {review.featured && (
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-full border"
                      style={{
                        backgroundColor: "var(--green-50)",
                        color: "var(--primary-dark)",
                        borderColor: "var(--green-100)",
                      }}
                    >
                      ⭐ Featured Review
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="size-14 rounded-2xl flex items-center justify-center font-bold text-xl border"
                      style={{
                        backgroundColor: "var(--green-50)",
                        color: "var(--primary-dark)",
                        borderColor: "var(--green-100)",
                      }}
                    >
                      {review.donorName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: "var(--foreground)" }}>
                        {review.donorName}
                      </h3>
                      <p className="text-sm font-medium" style={{ color: "var(--cream-400)" }}>
                        Reviewed by{" "}
                        <span className="font-bold" style={{ color: "var(--primary)" }}>
                          {review.reviewerName}
                        </span>
                        <span className="mx-2">·</span>
                        {new Date(review.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border"
                    style={{ backgroundColor: "var(--green-50)", borderColor: "var(--green-100)" }}
                  >
                    <Star className="size-4 fill-current" style={{ color: "var(--primary)" }} />
                    <span className="font-bold" style={{ color: "var(--primary-dark)" }}>
                      {((review.trust + review.quality + review.convenience) / 3).toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="leading-relaxed font-medium mb-6 text-[15px]" style={{ color: "var(--muted-foreground)" }}>
                  "{review.comment}"
                </p>

                {/* Rating bars */}
                <div className="grid grid-cols-3 gap-4 border-t pt-5 mb-4" style={{ borderColor: "var(--muted)" }}>
                  {[
                    { label: "Trust",       value: review.trust },
                    { label: "Quality",     value: review.quality },
                    { label: "Convenience", value: review.convenience },
                  ].map(dim => (
                    <div key={dim.label}>
                      <div className="flex justify-between mb-1.5">
                        <p className="text-[10px] uppercase tracking-wider font-bold" style={{ color: "var(--cream-400)" }}>
                          {dim.label}
                        </p>
                        <p className="text-[10px] font-black" style={{ color: "var(--primary)" }}>
                          {dim.value}/5
                        </p>
                      </div>
                      <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "var(--muted)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: `${(dim.value / 5) * 100}%`, backgroundColor: "var(--primary)" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Like button */}
                <button
                  onClick={() => handleLike(review.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border"
                  style={
                    likedReviews.has(review.id)
                      ? { backgroundColor: "var(--green-50)", color: "var(--primary)", borderColor: "var(--green-100)" }
                      : { backgroundColor: "var(--muted)", color: "var(--cream-400)", borderColor: "transparent" }
                  }
                >
                  <Heart className={`size-4 ${likedReviews.has(review.id) ? "fill-current" : ""}`} />
                  {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                </button>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ color: "var(--foreground)" }}>
              <Award className="size-5" style={{ color: "var(--primary)" }} />
              Donor Leaderboard
            </h2>
            <div
              className="rounded-3xl border shadow-sm overflow-hidden"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="p-3 space-y-1">
                {LEADERBOARD.map((donor, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer"
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--green-50)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="size-8 rounded-xl flex items-center justify-center font-black text-sm"
                        style={
                          i === 0
                            ? { backgroundColor: "var(--primary)", color: "#fff" }
                            : { backgroundColor: "var(--muted)", color: "var(--cream-400)" }
                        }
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold" style={{ color: "var(--foreground)" }}>{donor.name}</p>
                        <div className="flex items-center gap-2 text-xs" style={{ color: "var(--cream-400)" }}>
                          <span className="font-bold">{donor.count} ratings</span>
                          <span className="font-bold" style={{ color: "var(--primary)" }}>{donor.trend}</span>
                        </div>
                      </div>
                    </div>
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border"
                      style={{ backgroundColor: "var(--green-50)", borderColor: "var(--green-100)" }}
                    >
                      <Star className="size-3 fill-current" style={{ color: "var(--primary)" }} />
                      <span className="font-bold text-xs" style={{ color: "var(--primary-dark)" }}>{donor.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="w-full p-4 text-center text-sm font-bold flex items-center justify-center gap-2 border-t transition-colors"
                style={{ color: "var(--primary)", borderColor: "var(--muted)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--green-50)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                View Full Rankings <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Community stats — dark card */}
            <div
              className="rounded-3xl p-8 text-white"
              style={{ backgroundColor: "var(--green-700)" }}
            >
              <h3 className="font-bold mb-6" style={{ fontFamily: "var(--font-heading)", fontSize: "1.25rem" }}>
                Community Impact
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Total Reviews", value: "847" },
                  { label: "Avg. Rating",   value: "4.7" },
                  { label: "Active Donors", value: "126" },
                ].map((s, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm font-bold uppercase tracking-wider opacity-60">{s.label}</span>
                    <span
                      className="text-2xl font-black"
                      style={{ fontFamily: "var(--font-heading)" }}
                    >
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Write review modal ── */}
        {showWriteReview && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div
              className="rounded-3xl shadow-2xl max-w-lg w-full p-8 border animate-in fade-in zoom-in duration-300"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex justify-between items-center mb-8">
                <h2
                  className="text-2xl"
                  style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--foreground)" }}
                >
                  Share Your Gratitude
                </h2>
                <button
                  onClick={() => setShowWriteReview(false)}
                  className="p-2 rounded-xl transition-colors"
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <X className="size-5" style={{ color: "var(--cream-400)" }} />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Select Donor
                  </label>
                  <select
                    value={newReview.donor}
                    onChange={e => setNewReview({ ...newReview, donor: e.target.value })}
                    className="w-full p-3 rounded-2xl text-sm font-medium outline-none transition-all"
                    style={{
                      backgroundColor: "var(--muted)",
                      border: "1.5px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  >
                    <option value="">Choose a partner...</option>
                    <option>The Green Kitchen</option>
                    <option>Pasta Palace</option>
                    <option>City Cafe</option>
                  </select>
                </div>

                {[
                  { key: "trust",       label: "Trust & Reliability" },
                  { key: "quality",     label: "Food Quality" },
                  { key: "convenience", label: "Convenience" },
                ].map(dim => (
                  <div key={dim.key} className="flex justify-between items-center">
                    <label className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{dim.label}</label>
                    <InteractiveStars
                      category={dim.key}
                      value={(newReview as any)[dim.key]}
                      onChange={v => setNewReview({ ...newReview, [dim.key]: v })}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Your Message
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience working with this donor..."
                    rows={4}
                    className="w-full p-4 rounded-2xl text-sm font-medium resize-none outline-none transition-all"
                    style={{
                      backgroundColor: "var(--muted)",
                      border: "1.5px solid var(--border)",
                      color: "var(--foreground)",
                    }}
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="w-full text-white py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
                  style={{
                    backgroundColor: "var(--primary)",
                    boxShadow: "0 8px 24px rgba(91,155,71,0.25)",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  <Send className="size-4" />
                  Publish Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
