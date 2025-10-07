import { useState, useEffect } from "react";
import { Plus, Store, Package, Clock, Calendar, Users, Edit2, Trash2, CheckCircle2, MapPin } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

interface FoodPost {
  id: string;
  userId: string;
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
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [posts, setPosts] = useState<FoodPost[]>([
    {
      id: "1",
      userId: "1", // donor@feastforward.com
      restaurant: "The Green Kitchen",
      foodType: "Mixed Vegetables & Rice",
      quantity: "Serves 40-50 people",
      availableUntil: "2026-03-30",
      pickupTime: "8:00 PM - 9:00 PM",
      location: "Downtown, 789 Food St",
      description: "Fresh vegetable curry with rice, fully vegetarian",
      status: "available",
    },
    {
      id: "2",
      userId: "4", // pasta@feastforward.com (Pasta Palace)
      restaurant: "Pasta Palace",
      foodType: "Penne alla Vodka & Breadsticks",
      quantity: "Serves 30 people",
      availableUntil: "2026-03-31",
      pickupTime: "9:00 PM - 10:00 PM",
      location: "North District, 555 Italian Way",
      description: "Creamy tomato vodka sauce with penne pasta and garlic bread",
      status: "available",
    },
    {
      id: "3",
      userId: "0", // Unknown user
      restaurant: "City Cafe",
      foodType: "Sandwiches & Salads",
      quantity: "Serves 25-30 people",
      availableUntil: "2026-03-29",
      pickupTime: "7:00 PM - 8:00 PM",
      location: "West End, 321 Cafe Lane",
      description: "Assorted sandwiches and fresh salads",
      status: "claimed",
    },
    {
      id: "4",
      userId: "1",
      restaurant: "The Green Kitchen",
      foodType: "Lentil Soup",
      quantity: "10 Liters",
      availableUntil: "2026-03-31",
      pickupTime: "7:30 PM - 8:30 PM",
      location: "Downtown, 789 Food St",
      description: "Nutritious lentil soup, great for cold evenings",
      status: "available",
    },
  ]);

  const [formData, setFormData] = useState({
    foodType: "",
    quantity: "",
    availableUntil: "",
    pickupTime: "",
    location: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setPosts(posts.map(p => p.id === editingId ? {
        ...p,
        ...formData,
      } as FoodPost : p));
      toast.success("Post updated successfully");
      setEditingId(null);
    } else {
      const newPost: FoodPost = {
        id: Date.now().toString(),
        userId: user?.id || "anonymous",
        restaurant: user?.name || "Unknown Establishment",
        ...formData,
        status: "available",
      };
      setPosts([newPost, ...posts]);
      toast.success("Food availability posted!");
    }

    setFormData({
      foodType: "",
      quantity: "",
      availableUntil: "",
      pickupTime: "",
      location: "",
      description: "",
    });
    setShowForm(false);
  };

  const handleEdit = (post: FoodPost) => {
    setFormData({
      foodType: post.foodType,
      quantity: post.quantity,
      availableUntil: post.availableUntil,
      pickupTime: post.pickupTime,
      location: post.location,
      description: post.description,
    });
    setEditingId(post.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter(p => p.id !== id));
      toast.success("Post deleted");
    }
  };

  const handleClaim = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, status: 'claimed' } as FoodPost : p));
    toast.info("Food item claimed successfully");
  };

  // Only donors can see their own "Edit/Delete" actions
  const isOwner = (post: FoodPost) => user?.id === post.userId;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 pb-20 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Food Availability
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {user?.role === 'donor' 
                ? "Manage your surplus food donations" 
                : "Browse available food from restaurants"}
            </p>
          </div>
          {user?.role === "donor" && (
            <button
              onClick={() => {
                setEditingId(null);
                setShowForm(!showForm);
              }}
              className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition-all shadow-sm font-semibold"
            >
              <Plus className="size-5" />
              Post Surplus
            </button>
          )}
        </div>

        {showForm && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 animate-in fade-in zoom-in duration-200">
            <h2 className="text-xl font-bold mb-6 text-gray-900">
              {editingId ? "Edit Food Post" : "Post Food Availability"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Food Type
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.foodType}
                    onChange={(e) =>
                      setFormData({ ...formData, foodType: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 placeholder-gray-400"
                    placeholder="e.g., Pizza, Sandwiches"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Quantity
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 placeholder-gray-400"
                    placeholder="e.g., Serves 30 people"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Pickup Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 placeholder-gray-400"
                  placeholder="Enter full address"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Available Until
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.availableUntil}
                    onChange={(e) =>
                      setFormData({ ...formData, availableUntil: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Pickup Window
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pickupTime}
                    onChange={(e) =>
                      setFormData({ ...formData, pickupTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 placeholder-gray-400"
                    placeholder="e.g., 8:00 PM - 9:00 PM"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-gray-50 placeholder-gray-400 resize-none"
                  placeholder="Describe the items..."
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-all font-bold shadow-lg shadow-orange-100"
                >
                  {editingId ? "Update Post" : "Confirm Posting"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-all font-bold"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`bg-white rounded-2xl shadow-sm p-6 border transition-all hover:shadow-md ${
                isOwner(post) ? "border-orange-200 bg-orange-50/10" : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Store className={`size-5 ${isOwner(post) ? "text-orange-600" : "text-gray-400"}`} />
                    <h3 className="font-bold text-lg text-gray-900">
                      {post.restaurant} 
                      {isOwner(post) && <span className="ml-2 text-xs font-normal text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-100">You</span>}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="size-4" />
                    <span className="font-semibold text-sm">{post.foodType}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      post.status === "available"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : post.status === "claimed"
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}
                  >
                    {post.status}
                  </span>
                  
                  {isOwner(post) && (
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(post)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit post"
                      >
                        <Edit2 className="size-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete post"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 leading-relaxed">{post.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                  <Users className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">{post.quantity}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100">
                  <Calendar className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">Until {new Date(post.availableUntil).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2.5 p-2 bg-gray-50 rounded-xl border border-gray-100 sm:col-span-2">
                  <Clock className="size-4 text-gray-400" />
                  <span className="text-sm text-gray-700 font-medium">Pickup window: <span className="font-bold">{post.pickupTime}</span></span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
                <MapPin className="size-4 shrink-0" />
                <span className="truncate">{post.location}</span>
              </div>

              {user?.role === "receiver" && post.status === "available" && (
                <button 
                  onClick={() => handleClaim(post.id)}
                  className="w-full bg-orange-600 text-white py-3 rounded-xl hover:bg-orange-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg shadow-orange-100"
                >
                  Claim This Surplus
                </button>
              )}
              
              {post.status === "claimed" && (
                <div className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl border border-blue-100">
                  <CheckCircle2 className="size-5" />
                  Claimed & Scheduled
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}