'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VoiceInput from "@/components/VoiceInput";
import { speakText } from "@/lib/speak";
import { getCurrentUserId } from "@/lib/auth";
type FormField = "name" | "age" | "state" | "occupation";
type Step = FormField | "documents";
import { getCurrentUser } from "aws-amplify/auth";   /*import new added for test*/


const FIELD_PROMPTS: Record<Step, string> = {
  name: "कृपया अपना पूरा नाम बताइए",
  age: "अब अपनी उम्र बताइए",
  state: "अब अपना राज्य बताइए",
  occupation: "अब अपना पेशा बताइए",
  documents:
    "अब कृपया सरकार द्वारा जारी पहचान पत्र अपलोड करें। आप आधार कार्ड, पैन कार्ड, मतदाता पहचान पत्र या राशन कार्ड अपलोड कर सकते हैं।",
};

export default function ApplyPage() {
  const { schemeId } = useParams();
  const router = useRouter();

  const [scheme, setScheme] = useState<any>(null);
  const [loadingScheme, setLoadingScheme] = useState(true);

  const [form, setForm] = useState({
    name: "",
    age: "",
    state: "",
    occupation: "",
  });

  const [documents, setDocuments] = useState({
    aadhaar: "",
    pan: "",
    voter: "",
    ration: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [currentField, setCurrentField] = useState<Step>("name");
  const [submitting, setSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);

/*added for login test*/
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




  /* 🔹 FETCH SCHEME */
  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const res = await fetch(
          `/api/schemes?search=${encodeURIComponent(String(schemeId))}`
        );
        const data = await res.json();
        const matched = data.find((s: any) => s.id === schemeId);
        setScheme(matched || null);
      } catch {
        setScheme(null);
      } finally {
        setLoadingScheme(false);
      }
    };
    fetchScheme();
  }, [schemeId]);

  /* 🔊 Speak instruction */
  useEffect(() => {
    if (!loadingScheme && scheme) {
      speakText(FIELD_PROMPTS[currentField], "hi-IN");
    }
  }, [currentField, loadingScheme, scheme]);

  /* 🎤 Voice fill */
  const handleVoiceAnswer = (text: string) => {
    setForm(prev => ({ ...prev, [currentField]: text }));
    setErrors({ ...errors, [currentField]: "" });

    if (currentField === "name") setCurrentField("age");
    else if (currentField === "age") setCurrentField("state");
    else if (currentField === "state") setCurrentField("occupation");
    else if (currentField === "occupation") setCurrentField("documents");
  };

  /* 📎 Convert file to base64 */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof documents
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("फाइल बहुत बड़ी है! कृपया 2MB से छोटी फाइल अपलोड करें / File too large! Please upload file smaller than 2MB");
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setDocuments(prev => ({
        ...prev,
        [type]: reader.result as string,
      }));
      setErrors({ ...errors, documents: "" });
    };
    reader.readAsDataURL(file);
  };

  /* ✅ VALIDATION */
  const validateForm = () => {
    let newErrors: any = {};

    if (!form.name.trim())
      newErrors.name = "Name is mandatory";

    if (!form.age.trim())
      newErrors.age = "Age is mandatory";
    else if (isNaN(Number(form.age)))
      newErrors.age = "Age must be a number";

    if (!form.state.trim())
      newErrors.state = "State is mandatory";

    if (!form.occupation.trim())
      newErrors.occupation = "Occupation is mandatory";

    const hasDocument =
      documents.aadhaar ||
      documents.pan ||
      documents.voter ||
      documents.ration;

    if (!hasDocument)
      newErrors.documents = "At least one document is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  /* 🚀 Submit */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    setSubmitting(true);
/* applied <tests></tests>*/
const userId = await getCurrentUserId();


    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schemeId: scheme.id,
            userId,   /*  changed user-id*/ 
            ...form,
            documents,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        console.error('API Error:', data);
        alert(`Error: ${data.message || 'Failed to submit application'}`);
        return;
      }

      speakText("आपका आवेदन सफलतापूर्वक जमा हो गया है", "hi-IN");
      setApplicationId(data.id);

    } catch (error) {
      console.error('Submit error:', error);
      alert(`Something went wrong: ${error}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingScheme) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow animate-pulse">
          <p className="text-center text-sm text-gray-400">
            ⏳ 🔄 योजना की जानकारी तैयार की जा रही है... ⚙️ 🤖
          </p>
        </div>
      </main>
    );
  }

  if (!scheme) return <p className="p-4">Scheme not found</p>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* 🔹 Top Navigation */}
      <div className="max-w-2xl mx-auto flex justify-between items-center mb-6 relative z-10">
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-white/70 backdrop-blur-md shadow-lg rounded-full hover:scale-105 transition text-sm font-medium border border-orange-100"
        >
          🏠 Home
        </button>

        <button
          onClick={() => router.push("/track")}
          className="px-4 py-2 bg-gradient-to-r from-orange-500 to-green-600 text-white rounded-full shadow-lg hover:scale-105 transition text-sm font-medium"
        >
          📄 Track Applications
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border-2 border-orange-100 relative z-10">

        {/* 🏛 Scheme Header */}
        <div className="border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-green-700">
            {scheme.hindiName}
          </h1>
          <p className="text-lg text-gray-700">
            {scheme.name}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            🎯 Benefit: {scheme.benefit}
          </p>
        </div>

        {/* 🎤 Voice Section */}
        <div className="bg-gradient-to-r from-blue-100 to-green-100 p-4 rounded-xl shadow-inner mb-6">
          <p className="text-sm font-semibold text-blue-800 mb-2">
            🎤 {FIELD_PROMPTS[currentField]}
          </p>
          <VoiceInput onResult={handleVoiceAnswer} />
          <p className="text-xs text-gray-600 mt-2">
            🎙️ बोलकर भरें या नीचे टाइप करें
          </p>
        </div>

        <form className="space-y-5">

          {(["name", "age", "state", "occupation"] as FormField[]).map(field => (
            <div key={field} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1 capitalize">
                {field} <span className="text-red-500">*</span>
              </label>
              <input
                placeholder={`Enter ${field}`}
                className={`w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 transition ${
                  errors[field]
                    ? "border-red-500 focus:ring-red-300"
                    : "border-gray-300 focus:ring-green-400"
                }`}
                value={form[field]}
                onChange={e =>
                  setForm({ ...form, [field]: e.target.value })
                }
              />
              {errors[field] && (
                <span className="text-xs text-red-500 mt-1">
                  {errors[field]}
                </span>
              )}
            </div>
          ))}

          {/* 📄 Documents */}
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              📑 Government Authorized Documents *
            </h2>

            <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 mb-4">
              <p className="text-xs text-yellow-800">
                ⚠️ <span className="font-semibold">फ़ाइल साइज़ सीमा / File Size Limit:</span> Maximum 2MB per file
              </p>
              <p className="text-xs text-yellow-700 mt-1">
                कृपया छोटी फ़ाइलें अपलोड करें / Please upload compressed files
              </p>
            </div>

            {errors.documents && (
              <p className="text-xs text-red-500 mb-3">
                {errors.documents}
              </p>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: "aadhaar", label: "Aadhaar Card" },
                { key: "pan", label: "PAN Card" },
                { key: "voter", label: "Voter ID" },
                { key: "ration", label: "Ration Card" },
              ].map(doc => (
                <div
                  key={doc.key}
                  className="border border-dashed border-green-400 p-4 rounded-xl hover:bg-green-50 transition"
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {doc.label}
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) =>
                      handleFileChange(e, doc.key as keyof typeof documents)
                    }
                    className="w-full text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 🚀 Submit */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting}
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition ${
              submitting
                ? "bg-gray-400"
                : "bg-gradient-to-r from-green-600 to-blue-600 hover:scale-105"
            }`}
          >
            {submitting ? "⏳ Submitting..." : "🚀 Generate Official Application"}
          </button>

        </form>
      </div>

      {/* 🎉 Success Modal */}
      {applicationId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">

            <div className="text-4xl mb-3">🎉</div>

            <h2 className="text-2xl font-bold text-green-700 mb-2">
              आवेदन सफलतापूर्वक जमा हो गया!
            </h2>

            <p className="text-gray-600 mb-4">
              Your Application ID is:
            </p>

            <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl text-xl font-semibold text-blue-700 mb-6">
              {applicationId}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setApplicationId(null)}
                className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Close
              </button>

              <button
                onClick={() => router.push("/track")}
                className="flex-1 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-white hover:scale-105 transition"
              >
                📄 Track Now
              </button>
            </div>

          </div>
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

    </main>
  );
}