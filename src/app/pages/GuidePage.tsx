import React, { useState } from "react";
import { BookOpen, Utensils, Users, Truck, HelpCircle, ArrowRight, Lightbulb } from "lucide-react";

export function GuidePage() {
  const [activeTab, setActiveTab] = useState("donor");

  const tabs = [
    { id: "donor", label: "For Donors", icon: Utensils },
    { id: "receiver", label: "For Receivers", icon: Users },
    { id: "volunteer", label: "For Volunteers", icon: Truck },
  ];

  const content = {
    donor: {
      title: "Become a Hunger Hero",
      subtitle: "Join hundreds of restaurants reducing waste and feeding the community.",
      steps: [
        { title: "Register & Profile", desc: "Sign up and add your restaurant details so we can verify your food handles." },
        { title: "Post Surplus", desc: "List your leftover food, specify quantity, and set a pickup window." },
        { title: "System Matching", desc: "Our system matches your post with local NGOs and shelters in need." },
        { title: "Volunteer Pickup", desc: "A verified volunteer will arrive at your door during the pickup window." },
      ],
      faqs: [
        { q: "What kind of food can I donate?", a: "Any cooked or fresh food that is safe for consumption and follows local health guidelines." },
        { q: "Is there any liability?", a: "Most regions have 'Good Samaritan' laws protecting food donors who act in good faith." },
      ]
    },
    receiver: {
      title: "Managing Food Supply",
      subtitle: "Simplify how your organization receives and tracks food donations.",
      steps: [
        { title: "Register NGO", desc: "Sign up with your organization's credentials and specify your capacity." },
        { title: "Browse or Request", desc: "Claim active donations or post a specific request for what you need." },
        { title: "Coordinated Logistics", desc: "Receive notifications once a volunteer picks up your matched donation." },
        { title: "Rate & Review", desc: "Leave feedback for donors to help us maintain high community standards." },
      ],
      faqs: [
        { q: "How quickly can we get food?", a: "It depends on donor availability, but most matches are completed within 4 hours." },
        { q: "Can we set up regular drops?", a: "Yes! Use our 'Commitment Contracts' to formalize recurring supply lines." },
      ]
    },
    volunteer: {
      title: "Deliver Impact",
      subtitle: "Your time and transport can bridge the gap between waste and hunger.",
      steps: [
        { title: "Verified Sign-up", desc: "Join our network after a quick background check and vehicle verification." },
        { title: "Find Local Jobs", desc: "Our map shows active transports that need a driver near you." },
        { title: "Pickup & Go", desc: "Scan the donor's QR code, pick up the items, and follow the delivery route." },
        { title: "Mark Complete", desc: "Confirm delivery at the drop-off point and see your impact grow!" },
      ],
      faqs: [
        { q: "Do I need a special vehicle?", a: "A standard clean car is enough for most deliveries. Some may require a larger van." },
        { q: "What's the typical delivery distance?", a: "Most deliveries are within a 5-10km radius to ensure food freshness." },
      ]
    }
  };

  const activeContent = content[activeTab as keyof typeof content];

  return (
    <div className="flex-1 overflow-auto p-4 lg:p-8" style={{ backgroundColor: '#FFF8E7' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl text-[#1A1A1A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
            How FeastForward Works
          </h1>
          <p className="text-[#6B6458] text-lg font-medium max-w-2xl mx-auto">Everything you need to know about joining our mission and making an impact in your community.</p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-white rounded-[32px] shadow-sm border border-[#E8E4DC] p-2 max-w-2xl mx-auto mb-16 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[28px] font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-[#F5A623] text-white shadow-lg shadow-[#F5A623]/20"
                  : "text-[#A39E93] hover:text-[#1A1A1A] hover:bg-[#F5F2EC]"
              }`}
            >
              <tab.icon className="size-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Steps */}
          <div>
            <div className="mb-12">
              <h2 className="text-3xl text-[#1A1A1A] mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900 }}>
                {activeContent.title}
              </h2>
              <p className="text-[#6B6458] font-medium text-lg leading-relaxed">{activeContent.subtitle}</p>
            </div>

            <div className="space-y-8">
              {activeContent.steps.map((step, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="size-12 rounded-2xl bg-[#FFF3D0] border border-[#FFE49A] flex items-center justify-center font-black text-[#C78A0E] group-hover:bg-[#F5A623] group-hover:text-white group-hover:border-[#F5A623] transition-all duration-300">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">{step.title}</h3>
                    <p className="text-[#6B6458] font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* FAQs */}
            <div className="bg-[#FFF3D0] rounded-[32px] p-10 border border-[#FFE49A]">
              <h3 className="text-2xl text-[#1A1A1A] mb-8 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                <HelpCircle className="size-8 text-[#F5A623]" />
                Frequently Asked
              </h3>
              <div className="space-y-8">
                {activeContent.faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="text-lg font-bold text-[#1A1A1A] mb-2 italic">"{faq.q}"</p>
                    <p className="text-[#6B6458] font-medium leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-[#1A1A1A] rounded-[32px] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="size-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Lightbulb className="size-6 text-[#F5A623]" />
                </div>
                <h3 className="text-2xl mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}>
                  Pro Tip for {activeTab}s
                </h3>
                <p className="text-[#A39E93] font-medium leading-relaxed mb-8">
                  {activeTab === 'donor' && "Consistency is key. Posting even small amounts regularly builds trust and lets NGOs plan their meal support better."}
                  {activeTab === 'receiver' && "Keep your profile up to date with your storage capacity and specific dietary restrictions to receive better-matched donations."}
                  {activeTab === 'volunteer' && "Plan your route in advance. Most pickup locations have designated areas for fast food handovers."}
                </p>
                <button className="flex items-center gap-2 font-bold text-[#F5A623] hover:text-[#FFE49A] transition-colors">
                  Join the Community Forum
                  <ArrowRight className="size-4" />
                </button>
              </div>
              <BookOpen className="absolute -bottom-10 -right-10 size-48 text-white/5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
