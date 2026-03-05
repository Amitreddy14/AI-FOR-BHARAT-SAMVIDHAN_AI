'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getCurrentUserId } from "@/lib/auth"; // 🔥 ADD test
import { getCurrentUser } from "aws-amplify/auth";//add test

type Application = {
  id: string;
  scheme: string;
  status: string;
  submittedAt: string;
  expectedDays: number;
  progress: number;
  pdfUrl?: string;
};

export default function TrackPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


/*aadded for test*/
useEffect(() => {
  const checkAuth = async () => {
    try {
      await getCurrentUser();
    } catch {
      router.push("/login");
    }
  };
  checkAuth();
}, [router]);


  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const userId = await getCurrentUserId(); // 🔥 GET COGNITO USER

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/applications?userId=${userId}`
        );

        const data = await res.json();

        const parsed =
          typeof data.body === "string"
            ? JSON.parse(data.body)
            : data;

        if (Array.isArray(parsed)) {
          setApplications(parsed);
        } else {
          setApplications([]);
        }

      } catch (error) {
        console.error("Failed to fetch applications", error);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xl font-semibold text-gray-700">आपका आवेदन सत्यापित किया जा रहा है...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* 🔥 Top Header */}
      <div className="flex justify-between items-center mb-6 bg-white/70 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-orange-100 relative z-10">
        {/* Indian Flag Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 flex">
          <div className="flex-1 bg-orange-500"></div>
          <div className="flex-1 bg-white"></div>
          <div className="flex-1 bg-green-600"></div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-2xl">📄</span>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
            Track Applications / आवेदन ट्रैक करें
          </h1>
        </div>

        <button
          onClick={() => router.push("/")}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
        >
          🏠 Home
        </button>
      </div>

      {applications.length === 0 && (
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg text-center border border-orange-100 relative z-10">
          <div className="text-6xl mb-4">📭</div>
          <p className="text-gray-600 text-lg">कोई आवेदन नहीं मिला / No applications found.</p>
        </div>
      )}

      <div className="space-y-4 relative z-10">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border-2 border-orange-100 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="font-bold text-xl text-gray-800">{app.scheme}</p>
                <p className="text-sm text-gray-600 mt-1">
                  ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{app.id}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  📅 Submitted: {app.submittedAt}
                </p>
              </div>

              <span className="text-xs bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 px-3 py-1.5 rounded-full font-semibold border border-yellow-300">
                {app.status}
              </span>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${app.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 font-semibold">
                {app.progress}% complete • ⏱️ Est. {app.expectedDays} days
              </p>
            </div>

            <div className="flex gap-3 mt-4">
              {app.pdfUrl && (
                <a
                  href={app.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-1"
                >
                  📄 View PDF
                </a>
              )}

              {app.progress < 50 && app.expectedDays > 30 && (
                <button className="text-sm bg-gradient-to-r from-red-100 to-red-200 text-red-700 px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 border border-red-300 flex items-center gap-1">
                  ⚠️ Escalate
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

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
      `}</style>
    </main>
  );
}