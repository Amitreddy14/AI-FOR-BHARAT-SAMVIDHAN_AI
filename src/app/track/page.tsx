'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/components/LoadingIndicator";

type Application = {
  id: string;
  scheme: string;
  status: string;
  submittedAt: string;
  expectedDays: number;
  progress: number;
  pdfUrl?: string; // ✅ Added for PDF
};

export default function TrackPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(
          "https://yhccfdamhd.execute-api.us-east-1.amazonaws.com/applications"
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
    <main className="min-h-screen flex items-center justify-center bg-gray-50"> 
      <LoadingIndicator text="आपका आवेदन सत्यापित किया जा रहा है..." />
    </main>
  );
}

  return (
    <main className="min-h-screen bg-gray-50 p-4">

      {/* 🔥 Top Header with Home Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📄 Track Applications</h1>

        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          🏠 Home
        </button>
      </div>

      {applications.length === 0 && (
        <p className="text-gray-500">No applications found.</p>
      )}

      <div className="space-y-4">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">{app.scheme}</p>
                <p className="text-sm text-gray-600">
                  ID: {app.id}
                </p>
                <p className="text-xs text-gray-500">
                  Submitted on: {app.submittedAt}
                </p>
              </div>

              <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                {app.status}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${app.progress}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {app.progress}% complete • Est. {app.expectedDays} days
              </p>
            </div>

            {/* ✅ PDF BUTTON ADDED HERE */}
            {app.pdfUrl && (
              <a
                href={app.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition"
              >
                📄 View Official PDF
              </a>
            )}

            {/* Escalation Logic */}
            {app.progress < 50 && app.expectedDays > 30 && (
              <button className="mt-4 text-sm bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200">
                ⚠️ Escalate Application
              </button>
            )}

          </div>
        ))}
      </div>
    </main>
  );
}