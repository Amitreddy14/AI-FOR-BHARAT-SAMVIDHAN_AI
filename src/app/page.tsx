'use client';

import { useState, useEffect, type MouseEvent } from "react";
import Link from "next/link";

type VisualMode = "light" | "dark" | "harvest";

const toFixedCoord = (value: number) => Number(value.toFixed(6));

const chakraSpokesLarge = Array.from({ length: 24 }, (_, i) => {
  const rad = (i * 15 * Math.PI) / 180;
  return {
    x1: toFixedCoord(100 + 10 * Math.cos(rad)),
    y1: toFixedCoord(100 + 10 * Math.sin(rad)),
    x2: toFixedCoord(100 + 88 * Math.cos(rad)),
    y2: toFixedCoord(100 + 88 * Math.sin(rad)),
  };
});

const chakraSpokesSmall = Array.from({ length: 24 }, (_, i) => {
  const rad = (i * 15 * Math.PI) / 180;
  return {
    x1: toFixedCoord(100 + 13 * Math.cos(rad)),
    y1: toFixedCoord(100 + 13 * Math.sin(rad)),
    x2: toFixedCoord(100 + 86 * Math.cos(rad)),
    y2: toFixedCoord(100 + 86 * Math.sin(rad)),
  };
});

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
              href="/dashboard"
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

        {/* Base gradient */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
              : isHarvest
                ? "bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100"
                : "bg-gradient-to-br from-orange-50 via-white to-green-50"
          }`}
        />

        {/* ── INDIAN FLAG ANIMATED BACKGROUND ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          {/* Top saffron + bottom green subtle bars */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-400 opacity-40 tricolor-pulse" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 via-green-600 to-green-500 opacity-40 tricolor-pulse" style={{animationDelay:'1s'}} />

          {isDark && <div className="absolute inset-0 aurora-night" />}
          {isHarvest && <div className="absolute inset-0 harvest-glow" />}

          {/* Large central spinning Ashoka Chakra */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`chakra-halo ${isDark ? "chakra-halo-dark" : "chakra-halo-light"}`} />
            <svg
              className={`w-[34rem] h-[34rem] md:w-[44rem] md:h-[44rem] chakra-spin-strong ${
                isDark ? "opacity-[0.38]" : isHarvest ? "opacity-[0.28]" : "opacity-[0.22]"
              }`}
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="100" cy="100" r="92" stroke="#1e3a8a" strokeWidth="3.6"/>
              <circle cx="100" cy="100" r="12" fill="#1e3a8a"/>
              {chakraSpokesLarge.map((spoke, i) => (
                <line key={i} x1={spoke.x1} y1={spoke.y1} x2={spoke.x2} y2={spoke.y2} stroke="#1e3a8a" strokeWidth="1.9"/>
              ))}
            </svg>
          </div>

          {/* Floating small Ashoka Chakras at corners/edges */}
          {[
            {size:80,  top:'6%',  left:'4%',  delay:'0s',   dur:'20s', op:0.07},
            {size:55,  top:'12%', left:'87%', delay:'3s',   dur:'24s', op:0.06},
            {size:65,  top:'68%', left:'2%',  delay:'6s',   dur:'18s', op:0.07},
            {size:45,  top:'74%', left:'89%', delay:'1.5s', dur:'26s', op:0.05},
            {size:50,  top:'42%', left:'93%', delay:'4s',   dur:'21s', op:0.06},
            {size:40,  top:'86%', left:'44%', delay:'2s',   dur:'23s', op:0.05},
            {size:35,  top:'30%', left:'1%',  delay:'5s',   dur:'19s', op:0.05},
          ].map((c,i) => (
            <div key={i} className="absolute chakra-spin-slow" style={{width:c.size,height:c.size,top:c.top,left:c.left,animationDelay:c.delay,animationDuration:c.dur,opacity:c.op}}>
              <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="100" cy="100" r="90" stroke="#1a56db" strokeWidth="4"/>
                <circle cx="100" cy="100" r="13" fill="#1a56db"/>
                {chakraSpokesSmall.map((spoke, j) => (
                  <line key={j} x1={spoke.x1} y1={spoke.y1} x2={spoke.x2} y2={spoke.y2} stroke="#1a56db" strokeWidth="2"/>
                ))}
              </svg>
            </div>
          ))}

          {/* Rising particles — saffron, white, green, navy */}
          {[
            {left:'3%', color:'#f97316', delay:'0s', dur:'7.8s', size:3},
            {left:'6%', color:'#16a34a', delay:'2.2s', dur:'9.1s', size:2},
            {left:'9%', color:'#1e40af', delay:'1.1s', dur:'8.5s', size:3},
            {left:'12%', color:'#ffffff', delay:'3.3s', dur:'9.8s', size:2},
            {left:'15%', color:'#f97316', delay:'0.7s', dur:'8.1s', size:4},
            {left:'19%', color:'#16a34a', delay:'2.8s', dur:'10.2s', size:2},
            {left:'23%', color:'#1e40af', delay:'1.4s', dur:'8.9s', size:3},
            {left:'27%', color:'#ffffff', delay:'3.6s', dur:'9.4s', size:2},
            {left:'31%', color:'#f97316', delay:'0.9s', dur:'7.9s', size:3},
            {left:'35%', color:'#16a34a', delay:'2.6s', dur:'9.6s', size:2},
            {left:'39%', color:'#1e40af', delay:'1.7s', dur:'8.3s', size:3},
            {left:'43%', color:'#ffffff', delay:'3.1s', dur:'10.4s', size:2},
            {left:'47%', color:'#f97316', delay:'0.4s', dur:'8.2s', size:4},
            {left:'51%', color:'#16a34a', delay:'2.1s', dur:'9.7s', size:2},
            {left:'55%', color:'#1e40af', delay:'1.3s', dur:'8.6s', size:3},
            {left:'59%', color:'#ffffff', delay:'3.8s', dur:'9.9s', size:2},
            {left:'63%', color:'#f97316', delay:'0.5s', dur:'7.7s', size:3},
            {left:'67%', color:'#16a34a', delay:'2.9s', dur:'10.1s', size:2},
            {left:'71%', color:'#1e40af', delay:'1.6s', dur:'8.7s', size:3},
            {left:'75%', color:'#ffffff', delay:'3.2s', dur:'9.2s', size:2},
            {left:'79%', color:'#f97316', delay:'0.8s', dur:'8.4s', size:4},
            {left:'83%', color:'#16a34a', delay:'2.4s', dur:'9.5s', size:2},
            {left:'87%', color:'#1e40af', delay:'1.8s', dur:'8.8s', size:3},
            {left:'91%', color:'#ffffff', delay:'3.5s', dur:'10.3s', size:2},
            {left:'95%', color:'#f97316', delay:'1.0s', dur:'8.0s', size:3},
            {left:'98%', color:'#16a34a', delay:'2.7s', dur:'9.3s', size:2},
          ].map((p,i) => (
            <div key={i} className="absolute bottom-0 rounded-full rising-dot" style={{
              left:p.left, width:p.size, height:p.size,
              backgroundColor:p.color,
              animationDelay:p.delay, animationDuration:p.dur,
              opacity:0.72,
              boxShadow:`0 0 8px ${p.color}`,
            }}/>
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
              <div
                className={`absolute inset-0 rounded-full bg-orange-400 opacity-20 scale-150 ${
                  orbPulsing ? "animate-ping" : "group-hover:animate-ping"
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full bg-green-400 opacity-15 scale-125 ${
                  orbPulsing ? "animate-ping" : ""
                }`}
                style={{ animationDelay: "300ms" }}
              />
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
              { icon: "👨🌾", label: "Farmers", hindi: "किसान" },
              { icon: "👩🎓", label: "Students", hindi: "छात्र" },
              { icon: "👩💼", label: "Women", hindi: "महिलाएं" },
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
      <footer className="bg-blue-950 text-gray-400 py-12 px-4">
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
                {["Voice AI", "Scheme Detection", "Application Tracking","Smart Application Filling"].map((l) => (
                  <p key={l} className="mb-2 hover:text-orange-400 cursor-pointer transition-colors">
                    {l}
                  </p>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold mb-3">Contact</p>
                <p className="mb-2">👤 Abhijit Ranjan ,Amit Reddy</p>
                <p className="mb-2">
                  📧{" "}
                  <a href="mailto:your@email.com" className="hover:text-orange-400 transition-colors">
                    abhijitgyan121@gmail.com, jsammureddy140804@gmail.com
                  </a>
                </p>
                <p className="mb-2">
                  📱{" "}
                  <a href="tel:+91XXXXXXXXXX" className="hover:text-orange-400 transition-colors">
                    Not Disclosed, please email for any query
                  </a>
                </p>
                <p className="mb-2">
                  🔗{" "}
                  <a
                    href="https://www.linkedin.com/in/abhijit-ranjan-3b5399288"
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
            <p>© 2026 SamvidhanAI. All rights reserved.    AI-FOR-BHARAT</p>
            <p className="text-red-600">Made with ❤️ for Bharat · भारत के लिए</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Ashoka Chakra slow spin */
        @keyframes chakraSpinSlow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .chakra-spin-slow {
          animation: chakraSpinSlow 30s linear infinite;
        }

        .chakra-spin-strong {
          animation: chakraSpinSlow 18s linear infinite;
          filter: drop-shadow(0 0 22px rgba(30, 64, 175, 0.34));
        }

        .chakra-halo {
          position: absolute;
          width: min(70vw, 44rem);
          aspect-ratio: 1 / 1;
          border-radius: 9999px;
          background: conic-gradient(#f97316 0deg 120deg, #ffffff 120deg 240deg, #16a34a 240deg 360deg);
          filter: blur(42px);
          animation: tricolorPulse 4.8s ease-in-out infinite;
        }

        .chakra-halo-dark {
          opacity: 0.36;
        }

        .chakra-halo-light {
          opacity: 0.26;
        }

        /* Rising particles from bottom */
        @keyframes particleRise {
          0%   { transform: translateY(0) scale(1);   opacity: 0.6; }
          50%  { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.4); opacity: 0; }
        }
        .particle-rise {
          animation: particleRise 7s ease-in infinite;
        }

        .rising-dot {
          animation: risingEmber linear infinite;
        }

        @keyframes risingEmber {
          0% { transform: translateY(0) translateX(0) scale(1); opacity: 0.72; }
          50% { opacity: 0.95; }
          100% { transform: translateY(-100vh) translateX(12px) scale(0.52); opacity: 0; }
        }

        /* Tricolor bar pulse */
        @keyframes tricolorPulse {
          0%, 100% { opacity: 0.3; }
          50%      { opacity: 0.6; }
        }
        .tricolor-pulse {
          animation: tricolorPulse 3s ease-in-out infinite;
        }
        .aurora-night {
          background:
            radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.2), transparent 45%),
            radial-gradient(circle at 75% 25%, rgba(99, 102, 241, 0.2), transparent 42%),
            radial-gradient(circle at 50% 75%, rgba(16, 185, 129, 0.2), transparent 48%);
        }
        .harvest-glow {
          background:
            radial-gradient(circle at 18% 22%, rgba(245, 158, 11, 0.22), transparent 40%),
            radial-gradient(circle at 72% 30%, rgba(234, 88, 12, 0.2), transparent 42%),
            radial-gradient(circle at 48% 70%, rgba(202, 138, 4, 0.22), transparent 46%);
        }
      `}</style>
    </main>
  );
}
