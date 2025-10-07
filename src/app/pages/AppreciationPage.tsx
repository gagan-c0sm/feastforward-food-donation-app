import React, { useState } from "react";
import { Star, MessageSquare, TrendingUp, Award, ChevronRight, Heart, Filter, X, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const MOCK_REVIEWS = [
  { id: "1", donorId: "1", donorName: "The Green Kitchen", reviewerId: "2", reviewerName: "Hope Shelter", trust: 5, quality: 5, convenience: 4, comment: "Consistently fresh food, always on time! Their vegetarian meals have become a staple for our community.", createdAt: "2026-03-25", likes: 24, featured: true },
  { id: "2", donorId: "4", donorName: "Pasta Palace", reviewerId: "5", reviewerName: "Community Center", trust: 4, quality: 5, convenience: 3, comment: "Great pasta, pickup window could be more flexible. But the quality is always top-notch.", createdAt: "2026-03-24", likes: 18, featured: false },
  { id: "3", donorId: "0", donorName: "City Cafe", reviewerId: "2", reviewerName: "Hope Shelter", trust: 5, quality: 4, convenience: 5, comment: "Super convenient location and always accommodating with pickup times. A reliable partner.", createdAt: "2026-03-23", likes: 12, featured: false },
  { id: "4", donorId: "1", donorName: "The Green Kitchen", reviewerId: "5", reviewerName: "Community Center", trust: 5, quality: 5, convenience: 5, comment: "Perfect partner. They even adjusted their schedule to match our feeding times.", createdAt: "2026-03-22", likes: 31, featured: false },
  { id: "5", donorId: "4", donorName: "Pasta Palace", reviewerId: "0", reviewerName: "Youth Haven", trust: 4, quality: 4, convenience: 4, comment: "Reliable and consistent. The kids love their breadsticks!", createdAt: "2026-03-21", likes: 9, featured: false },
];

const LEADERBOARD = [
  { name: "The Green Kitchen", score: 4.9, count: 124, trend: "+0.2" },
  { name: "Pasta Palace", score: 4.6, count: 89, trend: "+0.1" },
  { name: "City Cafe", score: 4.5, count: 67, trend: "+0.3" },
  { name: "Organic Grocer", score: 4.3, count: 45, trend: "—" },
];

const FILTER_TABS = ["All", "Trust Leaders", "Quality Stars", "Most Convenient"];

export function AppreciationPage() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState("All");
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [hoveredStars, setHoveredStars] = useState<{ [key: string]: number }>({});
  const [newReview, setNewReview] = useState({ donor: "", trust: 0, quality: 0, convenience: 0, comment: "" });
  const [likedReviews, setLikedReviews] = useState<Set<string>>(new Set());

  const getFilteredReviews = () => {
    switch (activeFilter) {
      case "Trust Leaders": return [...MOCK_REVIEWS].sort((a, b) => b.trust - a.trust);
      case "Quality Stars": return [...MOCK_REVIEWS].sort((a, b) => b.quality - a.quality);
      case "Most Convenient": return [...MOCK_REVIEWS].sort((a, b) => b.convenience - a.convenience);
      default: return MOCK_REVIEWS;
    }
  };

  const handleLike = (id: string) => {
    setLikedReviews(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const handleSubmitReview = () => {
    if (!newReview.donor || !newReview.comment || newReview.trust === 0) {
      toast.error("Please fill all fields and rate at least Trust");
      return;
    }
    toast.success("Your review has been published! 🎉");
    setShowWriteReview(false);
    setNewReview({ donor: "", trust: 0, quality: 0, convenience: 0, comment: "" });
  };

  const InteractiveStars = ({ category, value, onChange }: { category: string; value: number; onChange: (v: number) => void }) => {
    const hovered = hoveredStars[category] || 0;
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHoveredStars(p => ({ ...p, [category]: star }))}
            onMouseLeave={() => setHoveredStars(p => ({ ...p, [category]: 0 }))}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-125 active:scale-95"
          >
            <Star
              className={`size-6 transition-colors ${
                star <= (hovered || value) 
                  ? "text-[#F5A623] fill-[#F5A623]" 
                  : "text-[#E8E4DC]"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const reviews = getFilteredReviews();

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <h1 className="text-4xl text-[#1A1A1A] mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
              Appreciation Forum
            </h1>
            <p className="text-[#6B6458] text-lg font-medium">Celebrating the donors making a difference in our community.</p>
          </div>
          {user?.role === "receiver" && (
            <button 
              onClick={() => setShowWriteReview(true)}
              className="bg-[#F5A623] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-[#F5A623]/20 hover:bg-[#E8A317] transition-all flex items-center gap-2 active:scale-[0.97] shrink-0"
            >
              <MessageSquare className="size-5" />
              Share Your Gratitude
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeFilter === tab
                  ? "bg-[#F5A623] text-white shadow-lg shadow-[#F5A623]/20"
                  : "bg-white text-[#6B6458] border border-[#E8E4DC] hover:border-[#F5A623] hover:text-[#F5A623]"
              }`}
            >
              {tab === "All" && <Filter className="size-3.5 inline mr-1.5" />}
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reviews Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <TrendingUp className="size-5 text-[#F5A623]" />
              Latest Community Praise
            </h2>
            {reviews.map((review) => (
              <div 
                key={review.id} 
                className={`bg-white p-7 rounded-3xl border-2 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                  review.featured 
                    ? "border-[#F5A623] bg-gradient-to-br from-white to-[#FFFBEB]" 
                    : "border-[#E8E4DC] hover:border-[#FFE49A]"
                }`}
              >
                {review.featured && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-[#FFF3D0] text-[#C78A0E] text-[10px] font-black uppercase tracking-wider rounded-full border border-[#FFE49A]">
                      ⭐ Featured Review
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-4">
                    <div className="size-14 bg-[#FFF3D0] rounded-2xl flex items-center justify-center font-bold text-[#C78A0E] text-xl border border-[#FFE49A]">
                      {review.donorName[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1A1A1A] text-lg">{review.donorName}</h3>
                      <p className="text-sm text-[#A39E93] font-medium">
                        Reviewed by <span className="text-[#F5A623] font-bold">{review.reviewerName}</span>
                        <span className="mx-2">·</span>
                        {new Date(review.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 bg-[#FFF3D0] px-3 py-1.5 rounded-xl border border-[#FFE49A]">
                    <Star className="size-4 text-[#F5A623] fill-[#F5A623]" />
                    <span className="font-bold text-[#C78A0E]">
                      {((review.trust + review.quality + review.convenience) / 3).toFixed(1)}
                    </span>
                  </div>
                </div>

                <p className="text-[#6B6458] leading-relaxed font-medium mb-6 text-[15px]">"{review.comment}"</p>

                {/* Rating Bars */}
                <div className="grid grid-cols-3 gap-4 border-t border-[#F5F2EC] pt-5 mb-4">
                  {[
                    { label: "Trust", value: review.trust },
                    { label: "Quality", value: review.quality },
                    { label: "Convenience", value: review.convenience },
                  ].map((dim) => (
                    <div key={dim.label}>
                      <div className="flex justify-between mb-1.5">
                        <p className="text-[10px] uppercase tracking-wider font-bold text-[#A39E93]">{dim.label}</p>
                        <p className="text-[10px] font-black text-[#F5A623]">{dim.value}/5</p>
                      </div>
                      <div className="h-1.5 w-full bg-[#F5F2EC] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#F5A623] rounded-full transition-all duration-700"
                          style={{ width: `${(dim.value / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Like Button */}
                <div className="flex items-center gap-4 pt-2">
                  <button 
                    onClick={() => handleLike(review.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      likedReviews.has(review.id)
                        ? "bg-[#FFF3D0] text-[#F5A623] border border-[#FFE49A]"
                        : "bg-[#F5F2EC] text-[#A39E93] border border-transparent hover:bg-[#FFF3D0] hover:text-[#F5A623]"
                    }`}
                  >
                    <Heart className={`size-4 ${likedReviews.has(review.id) ? "fill-[#F5A623]" : ""}`} />
                    {review.likes + (likedReviews.has(review.id) ? 1 : 0)}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <h2 className="text-xl font-bold text-[#1A1A1A] flex items-center gap-2">
              <Award className="size-5 text-[#F5A623]" />
              Donor Leaderboard
            </h2>
            <div className="bg-white rounded-3xl border border-[#E8E4DC] shadow-sm overflow-hidden">
              <div className="p-3 space-y-1">
                {LEADERBOARD.map((donor, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-[#FFFBEB] rounded-2xl transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`size-8 rounded-xl flex items-center justify-center font-black text-sm ${
                        i === 0 ? "bg-[#F5A623] text-white" : "bg-[#F5F2EC] text-[#A39E93]"
                      }`}>
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1A1A]">{donor.name}</p>
                        <div className="flex items-center gap-2 text-xs text-[#A39E93]">
                          <span className="font-bold">{donor.count} ratings</span>
                          <span className="text-[#F5A623] font-bold">{donor.trend}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#FFF3D0] px-2.5 py-1 rounded-lg border border-[#FFE49A]">
                      <Star className="size-3 text-[#F5A623] fill-[#F5A623]" />
                      <span className="font-bold text-[#C78A0E] text-xs">{donor.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full p-4 text-center text-sm font-bold text-[#F5A623] hover:bg-[#FFFBEB] transition-colors border-t border-[#F5F2EC] flex items-center justify-center gap-2">
                View Full Rankings
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Global Stats Card */}
            <div className="bg-[#1A1A1A] rounded-3xl p-8 text-white">
              <h3 className="font-bold mb-6" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.25rem' }}>Community Impact</h3>
              <div className="space-y-5">
                {[
                  { label: "Total Reviews", value: "847" },
                  { label: "Avg. Rating", value: "4.7" },
                  { label: "Active Donors", value: "126" },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-[#A39E93] text-sm font-bold uppercase tracking-wider">{stat.label}</span>
                    <span className="text-2xl font-black" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Write Review Modal */}
        {showWriteReview && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 border border-[#E8E4DC] animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl text-[#1A1A1A]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                  Share Your Gratitude
                </h2>
                <button onClick={() => setShowWriteReview(false)} className="p-2 hover:bg-[#F5F2EC] rounded-xl transition-colors">
                  <X className="size-5 text-[#A39E93]" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Select Donor</label>
                  <select 
                    value={newReview.donor}
                    onChange={(e) => setNewReview({ ...newReview, donor: e.target.value })}
                    className="w-full p-3 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] focus:ring-2 focus:ring-[#F5A623] focus:bg-white outline-none text-sm font-medium"
                  >
                    <option value="">Choose a partner...</option>
                    <option value="The Green Kitchen">The Green Kitchen</option>
                    <option value="Pasta Palace">Pasta Palace</option>
                    <option value="City Cafe">City Cafe</option>
                  </select>
                </div>

                {[
                  { key: "trust", label: "Trust & Reliability" },
                  { key: "quality", label: "Food Quality" },
                  { key: "convenience", label: "Convenience" },
                ].map((dim) => (
                  <div key={dim.key} className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-[#1A1A1A]">{dim.label}</label>
                    <InteractiveStars
                      category={dim.key}
                      value={(newReview as any)[dim.key]}
                      onChange={(v) => setNewReview({ ...newReview, [dim.key]: v })}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Your Message</label>
                  <textarea 
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Share your experience working with this donor..."
                    rows={4}
                    className="w-full p-4 border border-[#E8E4DC] rounded-xl bg-[#F5F2EC] focus:ring-2 focus:ring-[#F5A623] focus:bg-white outline-none text-sm font-medium resize-none placeholder-[#A39E93]"
                  />
                </div>

                <button
                  onClick={handleSubmitReview}
                  className="w-full bg-[#F5A623] text-white py-3.5 rounded-xl font-bold shadow-lg shadow-[#F5A623]/20 hover:bg-[#E8A317] transition-all flex items-center justify-center gap-2 active:scale-[0.97]"
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
