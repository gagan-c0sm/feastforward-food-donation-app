import React, { useState } from "react";
import { BookOpen, ChevronDown, Leaf, Store, Users, Truck, Heart, FileText, Star } from "lucide-react";
import { GoldAsterisk, DarkLeaf, GreenHerb, TinyLeaf } from "../components/decorators/Decorators";

const ROLE_GUIDES = {
  donor: {
    label: "Donor",
    icon: Store,
    color: "var(--primary)",
    bg: "var(--green-50)",
    border: "var(--green-100)",
    steps: [
      { title: "Post Surplus Food", desc: "Navigate to the Food Availability page and click 'Post Food'. Fill in the food type, quantity, pickup time, and location." },
      { title: "Wait for a Match", desc: "Shelters and NGOs will browse your listing. When someone claims it, you'll see the status update to 'Claimed'." },
      { title: "Coordinate Pickup", desc: "A volunteer driver will be assigned to pick up the food. Prepare the items at your specified pickup time." },
      { title: "Build Partnerships", desc: "Use Commitment Contracts to set up recurring donations with trusted receivers for a steady food rescue pipeline." },
    ],
  },
  receiver: {
    label: "Receiver",
    icon: Users,
    color: "var(--primary-dark)",
    bg: "var(--green-50)",
    border: "var(--green-100)",
    steps: [
      { title: "Submit a Request", desc: "Go to Food Requests and click 'New Request'. Specify your organization, people count, date, and any dietary needs." },
      { title: "Get Matched", desc: "Our system matches your request with available food posts from nearby donors based on quantity and timing." },
      { title: "Receive Delivery", desc: "A volunteer will deliver the food to your location. Track the delivery status in real time." },
      { title: "Leave Appreciation", desc: "After receiving food, visit the Appreciation Forum to rate and review the donor. This builds trust in the community." },
    ],
  },
  volunteer: {
    label: "Volunteer",
    icon: Truck,
    color: "var(--accent)",
    bg: "var(--gold-100)",
    border: "var(--gold-300)",
    steps: [
      { title: "Browse Deliveries", desc: "Open the Volunteer Transport page and check the 'Available' tab for open delivery routes near you." },
      { title: "Accept a Delivery", desc: "Choose a delivery that fits your schedule. Click 'Accept Delivery' to assign it to yourself." },
      { title: "Start & Complete", desc: "Pick up the food from the donor, deliver it to the receiver, and mark the delivery as 'Completed'." },
      { title: "Track Your Impact", desc: "Visit the Dashboard to see your total deliveries, distance driven, and time contributed to the community." },
    ],
  },
};

const FAQ = [
  { q: "How does FeastForward work?", a: "FeastForward connects restaurants with surplus food to shelters and NGOs in need. Volunteer drivers handle the logistics of transporting donations." },
  { q: "Is there a cost to use the platform?", a: "No. FeastForward is completely free for all users — donors, receivers, and volunteers." },
  { q: "How are food safety standards maintained?", a: "Donors are responsible for ensuring food is safe for consumption. We provide guidelines and all food must be consumed within the specified pickup window." },
  { q: "Can I set up recurring donations?", a: "Yes! Use Commitment Contracts to establish regular donation schedules with your preferred receivers." },
  { q: "How do I track my community impact?", a: "Your Dashboard shows personalized stats including food donated, people served, deliveries completed, and more." },
];

export function GuidePage() {
  const [activeRole, setActiveRole] = useState<"donor" | "receiver" | "volunteer">("donor");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const guide = ROLE_GUIDES[activeRole];

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8 relative" style={{ backgroundColor: "var(--background)" }}>
      <DarkLeaf size={64} className="absolute top-4 right-6 pointer-events-none opacity-80" />
      <GreenHerb size={44} className="absolute top-24 right-24 pointer-events-none opacity-60" />
      <GoldAsterisk size={36} className="absolute bottom-16 left-10 pointer-events-none opacity-50" />
      <TinyLeaf size={28} className="absolute bottom-40 right-16 pointer-events-none opacity-40" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 rounded-2xl" style={{ backgroundColor: "var(--primary)" }}>
              <BookOpen className="size-6 text-white" />
            </div>
            <h1 className="text-3xl tracking-tight" style={{ fontFamily: "var(--font-heading)", fontWeight: 900, color: "var(--foreground)" }}>
              How It Works
            </h1>
          </div>
          <p className="font-medium" style={{ color: "var(--muted-foreground)" }}>
            A step-by-step guide for every role in the FeastForward community.
          </p>
        </div>

        {/* Role tabs */}
        <div className="flex gap-2 mb-10 p-1.5 rounded-2xl border shadow-sm" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          {Object.entries(ROLE_GUIDES).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setActiveRole(key as any)}
              className="flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: activeRole === key ? "var(--primary)" : "transparent",
                color: activeRole === key ? "white" : "var(--cream-400)",
                fontFamily: "var(--font-heading)",
              }}
              onMouseEnter={e => { if (activeRole !== key) e.currentTarget.style.backgroundColor = "var(--muted)"; }}
              onMouseLeave={e => { if (activeRole !== key) e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <cfg.icon className="size-4" />
              {cfg.label}
            </button>
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-5 mb-14">
          {guide.steps.map((step, i) => (
            <div
              key={i}
              className="rounded-[32px] p-7 border shadow-sm transition-all hover:shadow-md hover:-translate-y-1 duration-300"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start gap-5">
                <div
                  className="size-10 rounded-xl flex items-center justify-center font-black text-sm shrink-0"
                  style={{ backgroundColor: guide.bg, color: guide.color, borderColor: guide.border }}
                >
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--foreground)" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {[
            { label: "Appreciation Forum", desc: "Rate and review donors", icon: Star, path: "/appreciation", color: "var(--primary)" },
            { label: "Contracts", desc: "Set up recurring donations", icon: FileText, path: "/contracts", color: "var(--accent)" },
            { label: "Dashboard", desc: "Track your community impact", icon: Heart, path: "/dashboard", color: "var(--primary-dark)" },
          ].map((link, i) => (
            <div
              key={i}
              className="rounded-3xl p-6 border shadow-sm transition-all hover:shadow-md cursor-pointer group"
              style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}
            >
              <div className="p-2 rounded-xl inline-flex mb-4" style={{ backgroundColor: "var(--green-50)" }}>
                <link.icon className="size-5" style={{ color: link.color }} />
              </div>
              <h4 className="font-bold mb-1" style={{ color: "var(--foreground)" }}>{link.label}</h4>
              <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>{link.desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl mb-6" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "var(--foreground)" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {FAQ.map((faq, i) => (
              <div
                key={i}
                className="rounded-3xl border overflow-hidden transition-all"
                style={{ backgroundColor: "var(--card)", borderColor: openFaq === i ? "var(--primary)" : "var(--border)" }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold transition-all"
                  style={{ color: "var(--foreground)" }}
                >
                  {faq.q}
                  <ChevronDown
                    className={`size-5 shrink-0 transition-transform duration-300 ${openFaq === i ? "rotate-180" : ""}`}
                    style={{ color: openFaq === i ? "var(--primary)" : "var(--cream-400)" }}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="p-8 rounded-3xl shadow-xl relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", boxShadow: "0 20px 60px rgba(91,155,71,0.30)" }}
        >
          <div className="relative z-10 text-center text-white">
            <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "var(--font-heading)" }}>Ready to make a difference?</h2>
            <p className="font-medium opacity-80 mb-6">Every meal shared is a step toward a zero-waste, caring community.</p>
            <button className="px-8 py-4 rounded-2xl font-black shadow-lg transition-all" style={{ backgroundColor: "var(--card)", color: "var(--primary-dark)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--green-50)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--card)")}
            >
              Go to Dashboard →
            </button>
          </div>
          <Leaf className="absolute -bottom-8 -right-8 size-48 opacity-10 text-white" />
          <TinyLeaf size={50} className="absolute top-4 left-8 opacity-20" />
        </div>
      </div>
    </div>
  );
}
