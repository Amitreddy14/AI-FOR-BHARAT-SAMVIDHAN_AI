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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in this browser");
      return;
    }

    const rec = new SpeechRecognition();
    rec.lang = lang;
    rec.continuous = false;
    rec.interimResults = false;

    rec.onstart = () => setListening(true);
    rec.onend = () => setListening(false);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      onResult(text);
    };

    setRecognition(rec);
  }, [lang, onResult]);

  return (
    <button
      onClick={() => recognition && recognition.start()}
      className={`w-20 h-20 rounded-full flex items-center justify-center
        text-white transition
        ${listening ? "bg-red-500" : "bg-green-600 hover:bg-green-700"}`}
    >
      {listening ? <MicOff size={32} /> : <Mic size={32} />}
    </button>
  );
}
