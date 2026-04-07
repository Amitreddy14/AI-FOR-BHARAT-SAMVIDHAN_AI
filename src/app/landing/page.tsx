'use client';

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";

type VisualMode = "light" | "dark" | "harvest";

const toFixedCoord = (value: number) => Number(value.toFixed(6));

const chakraSpokes = Array.from({ length: 24 }, (_, i) => {
  const rad = (i * 15 * Math.PI) / 180;
  return {
    x1: toFixedCoord(100 + 14 * Math.cos(rad)),
    y1: toFixedCoord(100 + 14 * Math.sin(rad)),
    x2: toFixedCoord(100 + 92 * Math.cos(rad)),
    y2: toFixedCoord(100 + 92 * Math.sin(rad)),
  };
});

const risingDots = [
  { left: "3%", delay: "0s", dur: "7.8s", size: 3, color: "#f97316" },
  { left: "6%", delay: "2.2s", dur: "9.1s", size: 2, color: "#16a34a" },
  { left: "9%", delay: "1.1s", dur: "8.5s", size: 3, color: "#1e40af" },
  { left: "12%", delay: "3.3s", dur: "9.8s", size: 2, color: "#ffffff" },
  { left: "15%", delay: "0.7s", dur: "8.1s", size: 4, color: "#f97316" },
  { left: "19%", delay: "2.8s", dur: "10.2s", size: 2, color: "#16a34a" },
  { left: "23%", delay: "1.4s", dur: "8.9s", size: 3, color: "#1e40af" },
  { left: "27%", delay: "3.6s", dur: "9.4s", size: 2, color: "#ffffff" },
  { left: "31%", delay: "0.9s", dur: "7.9s", size: 3, color: "#f97316" },
  { left: "35%", delay: "2.6s", dur: "9.6s", size: 2, color: "#16a34a" },
  { left: "39%", delay: "1.7s", dur: "8.3s", size: 3, color: "#1e40af" },
  { left: "43%", delay: "3.1s", dur: "10.4s", size: 2, color: "#ffffff" },
  { left: "47%", delay: "0.4s", dur: "8.2s", size: 4, color: "#f97316" },
  { left: "51%", delay: "2.1s", dur: "9.7s", size: 2, color: "#16a34a" },
  { left: "55%", delay: "1.3s", dur: "8.6s", size: 3, color: "#1e40af" },
  { left: "59%", delay: "3.8s", dur: "9.9s", size: 2, color: "#ffffff" },
  { left: "63%", delay: "0.5s", dur: "7.7s", size: 3, color: "#f97316" },
  { left: "67%", delay: "2.9s", dur: "10.1s", size: 2, color: "#16a34a" },
  { left: "71%", delay: "1.6s", dur: "8.7s", size: 3, color: "#1e40af" },
  { left: "75%", delay: "3.2s", dur: "9.2s", size: 2, color: "#ffffff" },
  { left: "79%", delay: "0.8s", dur: "8.4s", size: 4, color: "#f97316" },
  { left: "83%", delay: "2.4s", dur: "9.5s", size: 2, color: "#16a34a" },
  { left: "87%", delay: "1.8s", dur: "8.8s", size: 3, color: "#1e40af" },
  { left: "91%", delay: "3.5s", dur: "10.3s", size: 2, color: "#ffffff" },
  { left: "95%", delay: "1.0s", dur: "8.0s", size: 3, color: "#f97316" },
  { left: "98%", delay: "2.7s", dur: "9.3s", size: 2, color: "#16a34a" },
];

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [orbPulsing, setOrbPulsing] = useState(false);
  const [visualMode, setVisualMode] = useState<VisualMode>("light");

  const isDark = visualMode === "dark";
  const isHarvest = visualMode === "harvest";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    const navbarOffset = 96;
    const targetTop = section.getBoundingClientRect().top + window.scrollY - navbarOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  const features = [
    {
      icon: "🎙️",
      title: "Voice Interaction",
      titleHindi: "आवाज़ से बात करें",
      desc: "Speak in Hindi or your native language. Our AI listens, understands, and responds — no typing needed.",
      color: "from-orange-400 to-orange-600",
      bg: "from-orange-50 to-orange-100",
      border: "border-orange-200",
    },
    {
      icon: "🧠",
      title: "AI Scheme Detection",
      titleHindi: "योजना खोज",
      desc: "Instantly discover all government schemes you are eligible for based on your profile and location.",
      color: "from-blue-400 to-blue-600",
      bg: "from-blue-50 to-blue-100",
      border: "border-blue-200",
    },
    {
      icon: "📋",
      title: "Smart Application & Tracking",
      titleHindi: "आवेदन और ट्रैकिंग",
      desc: "Auto-fill forms, submit applications, and track status — all in one place without visiting any office.",
      color: "from-green-400 to-green-600",
      bg: "from-green-50 to-green-100",
      border: "border-green-200",
    },
  ];

  const stats = [
    { value: "400M+", label: "Citizens Served", labelHindi: "नागरिक" },
    { value: "5000+", label: "Govt Schemes", labelHindi: "सरकारी योजनाएं" },
    { value: "22", label: "Indian Languages", labelHindi: "भारतीय भाषाएं" },
    { value: "₹1.3L Cr", label: "Welfare Unlocked", labelHindi: "कल्याण राशि" },
  ];

  return (
    <main
      className={`min-h-screen overflow-x-hidden transition-colors duration-500 ${
        isDark ? "bg-slate-950" : isHarvest ? "bg-amber-50" : "bg-white"
      }`}
    >

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? "bg-slate-950/85 backdrop-blur-md shadow-md shadow-black/30"
              : isHarvest
                ? "bg-amber-100/85 backdrop-blur-md shadow-md"
                : "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚖️</span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 via-blue-700 to-green-600 bg-clip-text text-transparent tracking-tight">
              SamvidhanAI
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Platform", "Citizens", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(event) => handleNavClick(event, item.toLowerCase())}
                className={`font-medium transition-colors duration-200 text-sm ${
                  isDark ? "text-slate-300 hover:text-orange-400" : "text-gray-600 hover:text-orange-600"
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={`px-4 py-2 text-sm font-semibold border rounded-full transition-all duration-200 ${
                isDark
                  ? "text-slate-100 border-slate-600 hover:border-orange-400 hover:text-orange-300"
                  : "text-gray-700 border-gray-300 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              Login
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              Dashboard →
            </Link>
          </div>
        </div>

        {/* Indian flag stripe */}
        <div className="h-0.5 flex">
          <div className="flex-1 bg-orange-500" />
          <div className="flex-1 bg-white border-t border-b border-gray-100" />
          <div className="flex-1 bg-green-600" />
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">

        {/* Gradient Background */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
              : isHarvest
                ? "bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100"
                : "bg-gradient-to-br from-orange-50 via-white to-green-50"
          }`}
        />

        {isDark && (
          <>
            <div className="absolute inset-0 aurora-night" />
            {[
              { left: "8%", top: "15%", delay: "0s" },
              { left: "20%", top: "35%", delay: "1.1s" },
              { left: "33%", top: "22%", delay: "0.6s" },
              { left: "47%", top: "11%", delay: "1.9s" },
              { left: "62%", top: "38%", delay: "0.4s" },
              { left: "75%", top: "18%", delay: "1.4s" },
              { left: "88%", top: "29%", delay: "2.2s" },
              { left: "14%", top: "68%", delay: "1.3s" },
              { left: "28%", top: "80%", delay: "0.2s" },
              { left: "52%", top: "72%", delay: "1.7s" },
              { left: "68%", top: "84%", delay: "0.9s" },
              { left: "84%", top: "70%", delay: "2.5s" },
            ].map((star, idx) => (
              <span
                key={idx}
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200/70 twinkle-star"
                style={{ left: star.left, top: star.top, animationDelay: star.delay }}
              />
            ))}
          </>
        )}

        {isHarvest && (
          <>
            <div className="absolute inset-0 harvest-glow" />
            {[
              { left: "10%", size: 8, delay: "0s", dur: "10s" },
              { left: "24%", size: 10, delay: "1.2s", dur: "11s" },
              { left: "36%", size: 7, delay: "2.4s", dur: "9s" },
              { left: "49%", size: 9, delay: "0.8s", dur: "12s" },
              { left: "61%", size: 11, delay: "2.1s", dur: "10s" },
              { left: "74%", size: 8, delay: "1.6s", dur: "11s" },
              { left: "86%", size: 9, delay: "0.4s", dur: "9s" },
            ].map((leaf, idx) => (
              <span
                key={idx}
                className="absolute -top-8 rounded-full harvest-leaf"
                style={{
                  left: leaf.left,
                  width: leaf.size,
                  height: leaf.size,
                  animationDelay: leaf.delay,
                  animationDuration: leaf.dur,
                }}
              />
            ))}
          </>
        )}

        {/* Animated blobs */}
        <div className={`absolute top-20 left-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl blob-anim ${isDark ? "bg-cyan-400 opacity-20" : isHarvest ? "bg-amber-300 opacity-30" : "bg-orange-200 opacity-25"}`} />
        <div className={`absolute top-40 right-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl blob-anim blob-delay-2 ${isDark ? "bg-indigo-500 opacity-20" : isHarvest ? "bg-orange-300 opacity-30" : "bg-green-200 opacity-25"}`} />
        <div className={`absolute bottom-20 left-1/3 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl blob-anim blob-delay-4 ${isDark ? "bg-fuchsia-500 opacity-15" : isHarvest ? "bg-yellow-300 opacity-25" : "bg-blue-200 opacity-20"}`} />

        {/* Ashoka Chakra watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`chakra-halo ${isDark ? "chakra-halo-dark" : "chakra-halo-light"}`} />
          <svg
            className={`w-[28rem] h-[28rem] md:w-[36rem] md:h-[36rem] chakra-spin ${
              isDark ? "opacity-[0.28]" : isHarvest ? "opacity-[0.22]" : "opacity-[0.16]"
            }`}
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="94" stroke="#1e3a8a" strokeWidth="4" />
            <circle cx="100" cy="100" r="14" fill="#1e3a8a" />
            {chakraSpokes.map((spoke, i) => (
              <line
                key={i}
                x1={spoke.x1}
                y1={spoke.y1}
                x2={spoke.x2}
                y2={spoke.y2}
                stroke="#1e3a8a"
                strokeWidth="2.2"
              />
            ))}
          </svg>
        </div>

        {/* Tricolor rising embers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {risingDots.map((dot, idx) => (
            <span
              key={idx}
              className="absolute bottom-0 rounded-full rising-dot"
              style={{
                left: dot.left,
                width: dot.size,
                height: dot.size,
                backgroundColor: dot.color,
                animationDelay: dot.delay,
                animationDuration: dot.dur,
                boxShadow: `0 0 8px ${dot.color}`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto opacity-100 translate-y-0 transition-all duration-1000">
          <div className="mb-6 flex items-center justify-center gap-2">
            {([
              { id: "light", label: "Light" },
              { id: "dark", label: "Dark" },
              { id: "harvest", label: "Harvest" },
            ] as const).map((mode) => {
              const active = visualMode === mode.id;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setVisualMode(mode.id)}
                  className={`px-4 py-1.5 text-xs font-bold tracking-wide rounded-full border transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-orange-500 to-green-600 text-white border-transparent shadow-lg"
                      : isDark
                        ? "bg-slate-900/70 text-slate-200 border-slate-600 hover:border-orange-400"
                        : "bg-white/80 text-gray-700 border-gray-300 hover:border-orange-400"
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}
          </div>

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 shadow-sm border ${
            isDark
              ? "bg-slate-900/70 border-slate-700 text-cyan-200"
              : isHarvest
                ? "bg-amber-100 border-amber-300 text-amber-800"
                : "bg-orange-100 border-orange-200 text-orange-700"
          }`}>
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            Powered by Voice-First AI · Built for Bharat
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              AI FOR BHARAT
            </span>
            <br />
            <span className={`bg-clip-text text-transparent ${
              isDark
                ? "bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300"
                : "bg-gradient-to-r from-blue-700 via-blue-600 to-green-600"
            }`}>
              SAMVIDHAN-AI
            </span>
          </h1>

          {/* Subheading */}
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-4 leading-relaxed ${
            isDark ? "text-slate-300" : "text-gray-600"
          }`}>
            Built for Indian citizens. Powered by voice-first AI.
            <br className="hidden sm:block" />
            Making government schemes accessible to{" "}
            <span className="font-semibold text-green-700">everyone</span>.
          </p>
          <p className="text-sm sm:text-base mb-10 font-semibold tracking-wide text-green-500">
            भारत के नागरिकों के लिए · सरकारी योजनाओं तक आसान पहुंच
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link
              href="/login"
              className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-lg hover:shadow-orange-300 hover:scale-105 transition-all duration-300"
            >
              🚀 Experience SamvidhanAI
            </Link>
            <a
              href="#platform"
              className="px-8 py-4 text-base font-semibold text-gray-700 border-2 border-gray-200 rounded-full hover:border-orange-400 hover:text-orange-600 transition-all duration-300"
            >
              Learn More ↓
            </a>
          </div>

          {/* ── VOICE ORB ── */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative cursor-pointer group"
              onClick={() => setOrbPulsing(!orbPulsing)}
            >
              {/* Outer ping rings */}
              <div
                className={`absolute inset-0 rounded-full bg-orange-400 opacity-20 scale-150 ${
                  orbPulsing ? "animate-ping" : "group-hover:animate-ping"
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full bg-green-400 opacity-15 scale-125 ${
                  orbPulsing ? "orb-ping-delay" : ""
                }`}
              />

              {/* Orb */}
              <div
                className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110
                  bg-gradient-to-br from-orange-400 via-orange-500 to-green-500
                  ${orbPulsing ? "scale-110 shadow-orange-300" : ""}`}
              >
                <span className="text-4xl">🎙️</span>
              </div>
            </div>
            <p className={`text-sm font-semibold tracking-widest uppercase ${isDark ? "text-slate-300" : "text-gray-500"}`}>
              Speak Now · अभी बोलें
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 py-10 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {stats.map((s) => (
            <div key={s.value}>
              <p className="text-3xl md:text-4xl font-extrabold">{s.value}</p>
              <p className="text-sm font-semibold opacity-90 mt-1">{s.label}</p>
              <p className="text-xs opacity-70">{s.labelHindi}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES SECTION ── */}
      <section id="platform" className="scroll-mt-28 py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-bold tracking-widest text-orange-500 uppercase">
              What We Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2">
              Everything a citizen needs
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              From discovering schemes to submitting applications — all through your voice, in your language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className={`group relative bg-gradient-to-br ${f.bg} border ${f.border} rounded-2xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl shadow-md mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{f.title}</h3>
                <p className="text-xs font-semibold text-gray-400 mb-3">{f.titleHindi}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                <div className="mt-6 flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-orange-500 transition-colors duration-200">
                  Learn more{" "}
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITIZENS SECTION ── */}
      <section id="citizens" className="scroll-mt-28 py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-bold tracking-widest text-green-600 uppercase">
            Who We Serve
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Built for every Indian
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12">
            Whether you are a farmer, student, woman entrepreneur, or person with disability — SamvidhanAI is for you.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: "👨‍🌾", label: "Farmers", hindi: "किसान" },
              { icon: "👩‍🎓", label: "Students", hindi: "छात्र" },
              { icon: "👩‍💼", label: "Women", hindi: "महिलाएं" },
              { icon: "♿", label: "Differently Abled", hindi: "दिव्यांग" },
            ].map((p) => (
              <div
                key={p.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{p.icon}</div>
                <p className="font-bold text-gray-800 text-sm">{p.label}</p>
                <p className="text-xs text-gray-400">{p.hindi}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / CTA SECTION ── */}
      <section id="about" className="scroll-mt-28 py-20 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-green-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Ready to claim what&apos;s yours?
          </h2>
          <p className="text-orange-100 mb-8 text-lg">
            Join thousands of citizens already using SamvidhanAI to access their rights.
            <br />
            <span className="text-sm opacity-80">अपने अधिकार पाने के लिए अभी शुरू करें</span>
          </p>
          <Link
            href="/login"
            className="inline-block px-10 py-4 text-base font-bold text-orange-600 bg-white rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            🚀 Start Exploring Free
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-950 text-gray-400 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 mb-10">

            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">⚖️</span>
                <span className="text-lg font-bold text-white">SamvidhanAI</span>
              </div>
              <p className="text-sm leading-relaxed">
                AI-powered platform making India&apos;s government welfare schemes accessible to every citizen through voice-first technology.
              </p>
            </div>

            {/* Links + Contact */}
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <p className="text-white font-semibold mb-3">Platform</p>
                {["Voice AI", "Scheme Detection", "Application Tracking", "RTI Filing"].map((l) => (
                  <p key={l} className="mb-2 hover:text-orange-400 cursor-pointer transition-colors">
                    {l}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold mb-3">Contact</p>
                <p className="mb-2">👤 &lt;Your Name&gt;</p>
                <p className="mb-2">
                  📧{" "}
                  <a href="mailto:your@email.com" className="hover:text-orange-400 transition-colors">
                    &lt;your@email.com&gt;
                  </a>
                </p>
                <p className="mb-2">
                  📱{" "}
                  <a href="tel:+91XXXXXXXXXX" className="hover:text-orange-400 transition-colors">
                    &lt;+91-XXXXXXXXXX&gt;
                  </a>
                </p>
                <p className="mb-2">
                  🔗{" "}
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-orange-400 transition-colors"
                  >
                    LinkedIn
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-orange-600 via-white/10 to-green-600 mb-6" />

          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs">
            <p>© 2025 SamvidhanAI. All rights reserved.</p>
            <p className="text-gray-600">Made with ❤️ for Bharat · भारत के लिए</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blobMove {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes auroraDrift {
          0%, 100% { transform: translateX(-8%) translateY(0%); }
          50% { transform: translateX(8%) translateY(-4%); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.25; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.25); }
        }
        @keyframes harvestFall {
          0% { transform: translateY(-4vh) translateX(0) rotate(0deg); opacity: 0.75; }
          50% { transform: translateY(48vh) translateX(10px) rotate(100deg); opacity: 0.6; }
          100% { transform: translateY(105vh) translateX(-14px) rotate(220deg); opacity: 0; }
        }
        @keyframes harvestGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.45; }
        }
        @keyframes chakraSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes haloPulse {
          0%, 100% { transform: scale(0.98); opacity: 0.28; }
          50% { transform: scale(1.02); opacity: 0.42; }
        }
        @keyframes risingEmber {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.7; }
          50% { opacity: 0.95; }
          100% { transform: translateY(-100vh) translateX(12px) scale(0.5); opacity: 0; }
        }
        .blob-anim {
          animation: blobMove 8s infinite ease-in-out;
        }
        .blob-delay-2 {
          animation-delay: 2s;
        }
        .blob-delay-4 {
          animation-delay: 4s;
        }
        .orb-ping-delay {
          animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 300ms;
        }
        .aurora-night {
          background:
            radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.26), transparent 45%),
            radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.22), transparent 42%),
            radial-gradient(circle at 50% 75%, rgba(16, 185, 129, 0.22), transparent 48%);
          animation: auroraDrift 10s ease-in-out infinite;
        }
        .twinkle-star {
          animation: twinkle 2.6s ease-in-out infinite;
        }
        .harvest-glow {
          background:
            radial-gradient(circle at 18% 22%, rgba(245, 158, 11, 0.22), transparent 40%),
            radial-gradient(circle at 72% 30%, rgba(234, 88, 12, 0.2), transparent 42%),
            radial-gradient(circle at 48% 70%, rgba(202, 138, 4, 0.22), transparent 46%);
          animation: harvestGlow 4s ease-in-out infinite;
        }
        .harvest-leaf {
          background: linear-gradient(140deg, #f59e0b, #ea580c);
          box-shadow: 0 0 10px rgba(245, 158, 11, 0.45);
          animation: harvestFall 10s linear infinite;
        }
        .chakra-spin {
          animation: chakraSpin 18s linear infinite;
          filter: drop-shadow(0 0 20px rgba(30, 64, 175, 0.35));
        }
        .chakra-halo {
          position: absolute;
          width: min(70vw, 40rem);
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          background: conic-gradient(#f97316 0deg 120deg, #ffffff 120deg 240deg, #16a34a 240deg 360deg);
          filter: blur(42px);
          animation: haloPulse 5s ease-in-out infinite;
        }
        .chakra-halo-dark {
          opacity: 0.34;
        }
        .chakra-halo-light {
          opacity: 0.24;
        }
        .rising-dot {
          animation: risingEmber linear infinite;
        }
        @keyframes ping {
          75%, 100% { transform: scale(1.25); opacity: 0; }
        }
      `}</style>
    </main>
  );
}
