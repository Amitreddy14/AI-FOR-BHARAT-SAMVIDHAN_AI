'use client';

import { useEffect, useState } from "react";
import { Mic, MicOff } from "lucide-react";

export default function VoiceInput({
  onResult,
  lang = "hi-IN",
}: {
  onResult: (text: string) => void;
  lang?: string;
}) {
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("ब्राउज़र वॉयस सपोर्ट नहीं करता / Browser not supported");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => { setListening(true); setError(""); };
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };
    rec.onerror = (e: any) => {
      setListening(false);
      if (e.error === 'no-speech') {
        setError("कुछ सुनाई नहीं दिया, फिर कोशिश करें / No speech detected, try again");
      } else if (e.error === 'network') {
        setError("नेटवर्क त्रुटि / Network error, try again");
      } else {
        setError("फिर कोशिश करें / Please try again");
      }
    };

    setRecognition(rec);
  }, [lang, onResult]);

  const handleClick = () => {
    if (!recognition) return;
    if (listening) {
      recognition.stop();
    } else {
      setError("");
      try {
        recognition.start();
      } catch (e) {
        recognition.stop();
        setTimeout(() => recognition.start(), 300);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleClick}
        className={`w-20 h-20 rounded-full flex items-center justify-center
          text-white transition
          ${listening ? "bg-red-500 animate-pulse" : "bg-green-600 hover:bg-green-700"}`}
      >
        {listening ? <MicOff size={32} /> : <Mic size={32} />}
      </button>
      {listening && <p className="text-sm text-green-600 font-semibold">🎙️ सुन रहा है... / Listening...</p>}
      {error && <p className="text-xs text-red-500 text-center max-w-xs">{error}</p>}
    </div>
  );
}



