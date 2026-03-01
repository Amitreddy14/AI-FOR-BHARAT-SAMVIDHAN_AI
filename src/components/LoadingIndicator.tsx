'use client';

export default function LoadingIndicator({
  text = "SamvidhanAI सोच रहा है..."
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 mt-4">
      {/* Animated dots */}
      <div className="flex gap-2">
        <span className="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-3 h-3 bg-green-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-3 h-3 bg-green-600 rounded-full animate-bounce" />
      </div>

      {/* Text */}
      <p className="text-sm text-gray-600 font-medium">
        🤖 ✨ 🛡 🔎 {text}
      </p>
    </div>
  );
}