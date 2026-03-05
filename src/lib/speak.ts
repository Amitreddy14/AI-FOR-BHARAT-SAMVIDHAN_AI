export function speakText(text: string, lang = "hi-IN") {
  if (typeof window === "undefined") return;

  const synth = window.speechSynthesis;

  // Stop any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1;

  synth.speak(utterance);
}