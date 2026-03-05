'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VoiceInput from "@/components/VoiceInput";
import SchemeCard from "@/components/SchemeCard";
import Link from "next/link";
import { speakText } from "@/lib/speak";
import { detectSchemeFromText } from "@/lib/detect";
import ManualApply from "@/components/ManualApply";
import ReactMarkdown from "react-markdown";
<<<<<<< HEAD
import "@/lib/amplify";
import { getCurrentUser, signOut, fetchUserAttributes } from "aws-amplify/auth";
=======
 const API = process.env.NEXT_PUBLIC_API_BASE_URL;
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e

export default function Home() {
  const router = useRouter();

  const [schemes, setSchemes] = useState<any[]>([]);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [showSchemes, setShowSchemes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingScheme, setPendingScheme] = useState<string | null>(null);
<<<<<<< HEAD
  const [authChecked, setAuthChecked] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = async () => {
    await signOut();
    router.push("/login");
  };

  /* 🔹 FETCH ALL SCHEMES */
  useEffect(() => {
    fetch("/api/schemes")
=======

  /* 🔹 FETCH ALL SCHEMES */
  useEffect(() => {
    
      fetch(`${API}/schemes`)
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
      .then(res => res.json())
      .then(data => setSchemes(data));
  }, []);

<<<<<<< HEAD
  /*use-effect for login page*/
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        const attributes = await fetchUserAttributes();
        setAuthChecked(true);
        setUserName(attributes.name || attributes.email?.split('@')[0] || 'User');
      } catch (err) {
        console.error('Auth check error:', err);
        setAuthChecked(true);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  if(!authChecked) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">जाँच हो रही है... / Checking login…</p>
        </div>
      </main>
    );
  }

=======
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
  const handleVoice = async (text: string) => {
    setUserText(text);
    setLoading(true);

    try {
      /* 🧠 NLU */
<<<<<<< HEAD
      const nluRes = await fetch("/api/nlu", {
=======
        //const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const nluRes = await fetch(`${API}/nlu`, {
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const nlu = await nluRes.json();

      /* ✅ CONFIRM */
      if (pendingScheme && nlu.intent === "confirm") {
        setPendingScheme(null);
        router.push(`/apply/${pendingScheme}`);
        return;
      }

      /* ✅ APPLY WITH SCHEME */
      if (nlu.intent === "apply" && nlu.schemeId) {
        const scheme = schemes.find(s => s.id === nlu.schemeId);
        setPendingScheme(nlu.schemeId);

        const msg = `क्या आप ${scheme?.name} योजना में आवेदन करना चाहते हैं?`;
        setAiText(msg);
        speakText(msg);
        return;
      }

      /* 🔁 FALLBACK */
      if (nlu.intent === "apply") {
        const detected = detectSchemeFromText(text, schemes);
        if (detected) {
          setPendingScheme(detected.id);
          const msg = `क्या आप ${detected.name} योजना में आवेदन करना चाहते हैं?`;
          setAiText(msg);
          speakText(msg);
          return;
        }
      }

      /* 🗨️ CHAT */
<<<<<<< HEAD
      const chatRes = await fetch("/api/chat", {
=======
      const chatRes = await fetch(`${API}/chat`, {
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const chat = await chatRes.json();
      setAiText(chat.reply);
      speakText(chat.reply);
      setShowSchemes(true);

    } finally {
      setLoading(false);
    }
  };

  return (
<<<<<<< HEAD
    <main className="min-h-screen flex flex-col items-center gap-4 md:gap-6 bg-gradient-to-br from-orange-50 via-white to-green-50 p-2 sm:p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* ✅ HEADER START */}
    <div className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center gap-3 mt-2 sm:mt-4 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-orange-100 relative z-10">
      {/* Indian Flag Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-orange-500"></div>
        <div className="flex-1 bg-white"></div>
        <div className="flex-1 bg-green-600"></div>
      </div>

      {/* LEFT SIDE TITLE */}
      <div className="flex items-center gap-2">
        <span className="text-3xl"> ꧁⚖️꧂</span>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
          SamvidhanAI
        </h1>
      </div>

      {/* CENTER - USER NAME */}
      <div className="flex items-center gap-2 bg-gradient-to-r from-orange-100 to-green-100 px-4 py-2 rounded-full">
        <span className="text-xl">👤</span>
        <span className="text-sm sm:text-base md:text-lg font-semibold text-gray-700">
          नमस्ते, {userName}
        </span>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        <Link
          href="/track"
          className="px-3 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          📄 Track/पता करे
        </Link>
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 sm:px-5 sm:py-2 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          🚪 Logout/बहार निकले  
          {/* ALL DONE  */}
        </button>
      </div>
=======
    <main className="min-h-screen flex flex-col items-center gap-6 bg-red-50 p-4">
      {/* ✅ HEADER START */}
    <div className="w-full max-w-6xl flex justify-between items-center mt-4">

      {/* LEFT SIDE TITLE */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
        ⚖️ SamvidhanAI
      </h1>

      {/* RIGHT SIDE TRACK BUTTON */}
      <Link
        href="/track"
        className="px-5 py-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition duration-300"
      >
        📄 Track Applications
      </Link>

>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
    </div>


      <VoiceInput onResult={handleVoice} />
<ManualApply />



      {/* {userText && <div className="bg-blue-100 p-3 rounded w-full max-w-md">
        <b>आप:</b> {userText}
      </div>} */}
      {userText && (
<<<<<<< HEAD
  <div className="w-full max-w-2xl flex justify-end px-2 relative z-10">
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 rounded-2xl shadow-lg max-w-lg text-sm sm:text-base">
      <span className="text-xs sm:text-sm opacity-80 font-semibold">आप</span>
=======
  <div className="w-full max-w-2xl flex justify-end">
    <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-md max-w-lg">
      <span className="text-sm opacity-80">आप</span>
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
      <p className="mt-1">{userText}</p>
    </div>
  </div>
)}

<<<<<<< HEAD
{aiText && (
  <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-6 border-2 border-orange-200 mx-2 relative z-10">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
=======


{/* 
      {aiText && <div className="bg-white p-3 rounded w-full max-w-md">
        <b>SamvidhanAI:</b> {aiText}
      </div>} */}
      

{aiText && (
  <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
    
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
        🏛 SamvidhanAI
      </div>
    </div>

<<<<<<< HEAD
    <div className="prose prose-sm max-w-none text-gray-800 text-sm sm:text-base">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 className="text-lg sm:text-xl font-bold text-orange-700 mt-4" {...props} />,
          h2: ({node, ...props}) => <h3 className="text-base sm:text-lg font-semibold text-green-600 mt-3" {...props} />,
=======
    <div className="prose prose-sm max-w-none text-gray-800">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 className="text-xl font-bold text-red-700 mt-4" {...props} />,
          h2: ({node, ...props}) => <h3 className="text-lg font-semibold text-red-600 mt-3" {...props} />,
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
          strong: ({node, ...props}) => <span className="font-semibold text-black" {...props} />,
          li: ({node, ...props}) => <li className="ml-4 list-disc mb-1" {...props} />,
        }}
      >
        {aiText.replace(/\*\*/g, "")}
      </ReactMarkdown>
    </div>
<<<<<<< HEAD
  </div>
)}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
=======

  </div>
)}

>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e




<<<<<<< HEAD

=======
      {/* {showSchemes && (
        <div className="grid gap-4 w-full max-w-md">
          {schemes.slice(0, 2).map(s => (
            <SchemeCard
              key={s.id}
              {...s}
              onApply={() => router.push(`/apply/${s.id}`)}
            />
          ))}
        </div>
      )} */}

      {/* <Link href="/track" className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-purple-500 transition duration-300">
        📄 Track Applications
      </Link> */}
>>>>>>> cf24c4d5051794bc8b2d18c83c7f4df8ea72920e
    </main>
  );
}