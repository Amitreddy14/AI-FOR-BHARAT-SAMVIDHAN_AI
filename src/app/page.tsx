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
 const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Home() {
  const router = useRouter();

  const [schemes, setSchemes] = useState<any[]>([]);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [showSchemes, setShowSchemes] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingScheme, setPendingScheme] = useState<string | null>(null);

  /* 🔹 FETCH ALL SCHEMES */
  useEffect(() => {
    
      fetch(`${API}/schemes`)
      .then(res => res.json())
      .then(data => setSchemes(data));
  }, []);

  const handleVoice = async (text: string) => {
    setUserText(text);
    setLoading(true);

    try {
      /* 🧠 NLU */
        //const API = process.env.NEXT_PUBLIC_API_BASE_URL;
      const nluRes = await fetch(`${API}/nlu`, {
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
      const chatRes = await fetch(`${API}/chat`, {
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

    </div>


      <VoiceInput onResult={handleVoice} />
<ManualApply />



      {/* {userText && <div className="bg-blue-100 p-3 rounded w-full max-w-md">
        <b>आप:</b> {userText}
      </div>} */}
      {userText && (
  <div className="w-full max-w-2xl flex justify-end">
    <div className="bg-blue-600 text-white p-4 rounded-2xl shadow-md max-w-lg">
      <span className="text-sm opacity-80">आप</span>
      <p className="mt-1">{userText}</p>
    </div>
  </div>
)}



{/* 
      {aiText && <div className="bg-white p-3 rounded w-full max-w-md">
        <b>SamvidhanAI:</b> {aiText}
      </div>} */}
      

{aiText && (
  <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
    
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
        🏛 SamvidhanAI
      </div>
    </div>

    <div className="prose prose-sm max-w-none text-gray-800">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h2 className="text-xl font-bold text-red-700 mt-4" {...props} />,
          h2: ({node, ...props}) => <h3 className="text-lg font-semibold text-red-600 mt-3" {...props} />,
          strong: ({node, ...props}) => <span className="font-semibold text-black" {...props} />,
          li: ({node, ...props}) => <li className="ml-4 list-disc mb-1" {...props} />,
        }}
      >
        {aiText.replace(/\*\*/g, "")}
      </ReactMarkdown>
    </div>

  </div>
)}





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
    </main>
  );
}