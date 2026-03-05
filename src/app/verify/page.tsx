'use client';

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import LoadingIndicator from "@/components/LoadingIndicator";

function VerifyContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === "VALID") {
          setApplication(data.application);
          setValid(true);
        } else {
          setValid(false);
        }
      })
      .catch(() => setValid(false))
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingIndicator text="आपका आवेदन सत्यापित किया जा रहा है..." />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">

        {valid && application ? (
          <>
            <h1 className="text-2xl font-bold text-green-600">
              ✅ Government Verified
            </h1>
            <p className="mt-4 text-gray-700">
              Application ID: <strong>{application.id}</strong>
            </p>
            <p>Status: {application.status}</p>
            <p>Scheme: {application.scheme}</p>
            <p>Applicant: {application.name}</p>
            <p>Submitted On: {application.submittedAt}</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-red-600">
              ❌ Invalid Certificate
            </h1>
            <p className="mt-4 text-gray-600">
              This document is not found in government records.
            </p>
          </>
        )}

      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingIndicator text="आपका आवेदन सत्यापित किया जा रहा है..." />
      </main>
    }>
      <VerifyContent />
    </Suspense>
  );
}