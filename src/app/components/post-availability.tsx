import { useState, useEffect } from "react";
import { Plus, Store, Package, Clock, Calendar, Users, MapPin, X } from "lucide-react";
import { GoldAsterisk, DarkLeaf, GreenCircle } from "./decorators/Decorators";
import { api } from "../lib/api";

interface FoodPost {
  id: string;
  restaurant: string;
  foodType: string;
  quantity: string;
  availableUntil: string;
  pickupTime: string;
  location: string;
  description: string;
  status: "available" | "claimed" | "expired";
}

export function PostAvailability() {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<FoodPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const data = await api.getFoodPosts();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    restaurant: "",
    foodType: "",
    quantity: "",
    availableUntil: "",
    pickupTime: "",
    location: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost = await api.createFoodPost(formData);
      setPosts([newPost, ...posts]);
      setFormData({
        restaurant: "",
        foodType: "",
        quantity: "",
        availableUntil: "",
        pickupTime: "",
        location: "",
        description: "",
      });
      setShowForm(false);
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="h-full overflow-auto relative" style={{ backgroundColor: "var(--background)" }}>
      <DarkLeaf size={72} className="absolute top-4 right-6 opacity-25 pointer-events-none" />
      <GreenCircle size={100} className="absolute bottom-40 -left-4 opacity-15 pointer-events-none" />
      <GoldAsterisk size={48} className="absolute bottom-20 right-16 opacity-40 pointer-events-none" />

      <div className="max-w-4xl mx-auto p-6 pb-20 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}>
              Food Availability
            </h1>
            <p className="text-sm font-medium mt-2" style={{ color: "var(--muted-foreground)" }}>
              Restaurants posting surplus food
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
            style={{ backgroundColor: "var(--primary)", color: "white" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
          >
            <Plus className="size-5" />
            Post Food
          </button>
        </div>

        {showForm && (
          <div className="rounded-[32px] p-8 mb-8 border shadow-sm relative" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                Post Food Availability
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="p-2 rounded-xl transition-colors"
                style={{ color: "var(--cream-400)" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <X className="size-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Restaurant/Establishment Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.restaurant}
                  onChange={(e) => setFormData({ ...formData, restaurant: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Enter your restaurant name"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Food Type
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.foodType}
                    onChange={(e) => setFormData({ ...formData, foodType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                    placeholder="e.g., Pizza, Sandwiches"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Quantity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                    placeholder="e.g., Serves 30 people"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Enter pickup address"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Available Until
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.availableUntil}
                    onChange={(e) => setFormData({ ...formData, availableUntil: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                    Pickup Time
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pickupTime}
                    onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                    style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                    placeholder="e.g., 8:00 PM - 9:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2" style={{ color: "var(--foreground)" }}>
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl outline-none focus:ring-2 transition-all border"
                  style={{ backgroundColor: "var(--muted)", borderColor: "var(--border)", color: "var(--foreground)", "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                  placeholder="Describe the food items"
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                >
                  Post Availability
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 rounded-2xl font-bold transition-all border"
                  style={{ backgroundColor: "transparent", borderColor: "var(--border)", color: "var(--foreground)" }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--muted)")}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-10 text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Loading posts...</div>
        ) : (
          <div className="space-y-5">
            {posts.map((post) => (
            <div
              key={post.id}
              className="rounded-[32px] p-7 border shadow-sm transition-all hover:shadow-md relative overflow-hidden group"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-xl" style={{ backgroundColor: "var(--green-50)" }}>
                      <Store className="size-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                      {post.restaurant}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 ml-14" style={{ color: "var(--foreground)" }}>
                    <Package className="size-4" style={{ color: "var(--primary)" }} />
                    <span className="font-bold">{post.foodType}</span>
                  </div>
                </div>
                <span
                  className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border"
                  style={{
                    backgroundColor: post.status === "available" ? "var(--green-50)" : post.status === "claimed" ? "var(--gold-100)" : "var(--muted)",
                    color: post.status === "available" ? "var(--primary)" : post.status === "claimed" ? "var(--accent)" : "var(--cream-600)",
                    borderColor: post.status === "available" ? "var(--green-100)" : post.status === "claimed" ? "var(--gold-300)" : "var(--border)"
                  }}
                >
                  {post.status === "available" ? "Available" : post.status === "claimed" ? "Claimed" : "Expired"}
                </span>
              </div>

              <p className="text-sm font-medium mb-5 relative z-10" style={{ color: "var(--muted-foreground)" }}>
                {post.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm mb-5 relative z-10">
                <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: "var(--green-50)" }}>
                  <Users className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>{post.quantity}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-2xl" style={{ backgroundColor: "var(--green-50)" }}>
                  <Calendar className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>Until {new Date(post.availableUntil).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-2xl col-span-2" style={{ backgroundColor: "var(--green-50)" }}>
                  <Clock className="size-4" style={{ color: "var(--primary)" }} />
                  <span className="font-bold" style={{ color: "var(--foreground)" }}>Pickup: {post.pickupTime}</span>
                </div>
              </div>

              <div className="pt-4 border-t relative z-10" style={{ borderColor: "var(--muted)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="size-4" style={{ color: "var(--primary)" }} />
                  <p className="text-sm font-bold" style={{ color: "var(--foreground)" }}>{post.location}</p>
                </div>

                {post.status === "available" && (
                  <button className="w-full py-3 rounded-2xl font-bold transition-all shadow-sm hover:shadow-md" style={{ backgroundColor: "var(--primary)", color: "white" }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--primary-dark)")}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--primary)")}
                  >
                    Claim Food
                  </button>
                )}
              </div>

              <Package className="absolute -bottom-6 -right-6 size-32 opacity-5 pointer-events-none transition-transform group-hover:scale-110" style={{ color: "var(--primary)" }} />
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}