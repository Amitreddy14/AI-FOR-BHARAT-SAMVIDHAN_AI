'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "@/lib/amplify";
import { signIn, signUp, confirmSignUp, resendSignUpCode, resetPassword, confirmResetPassword, signOut } from "aws-amplify/auth";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const clearSession = async () => {
      try {
        await signOut();
      } catch (err) {
        console.log('No active session');
      }
    };
    clearSession();
  }, []);

  const handleVerify = async () => {
    setLoading(true);
    setError("");

    try {
      await confirmSignUp({ username: email, confirmationCode: verificationCode });
      const result = await signIn({
        username: email,
        password,
      });
      if (result.isSignedIn) router.push("/");
    } catch (err: any) {
      console.error('Verify error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await resendSignUpCode({ username: email });
      setError("सत्यापन कोड आपके ईमेल पर भेजा गया / Verification code sent to your email");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    setError("");
    try {
      await resetPassword({ username: email });
      setForgotPassword(true);
      setError("पासवर्ड रीसेट कोड आपके ईमेल पर भेजा गया / Password reset code sent to your email");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    setError("");
    try {
      await confirmResetPassword({ username: email, confirmationCode: resetCode, newPassword });
      setForgotPassword(false);
      setResetCode("");
      setNewPassword("");
      setError("पासवर्ड सफलतापूर्वक बदल दिया गया! अब लॉगिन करें / Password reset successfully! Now login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await signIn({
        username: email,
        password,
      });

      console.log('Sign in result:', result);
      if (result.isSignedIn) {
        router.push("/");
      } else if (result.nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        setNeedsVerification(true);
        setError("Please enter the verification code from your email");
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.name === "UserNotConfirmedException") {
        setNeedsVerification(true);
        setError("कृपया अपने ईमेल से सत्यापन कोड दर्ज करें / Please enter the verification code from your email");
      } else if (err.name === "UserNotFoundException" || err.name === "NotAuthorizedException") {
        try {
          const signUpResult = await signUp({
            username: email,
            password,
            options: {
              userAttributes: { email, name },
            },
          });
          console.log('Sign up result:', signUpResult);
          setNeedsVerification(true);
          setError("अपने ईमेल पर सत्यापन कोड जांचें / Check your email for verification code");
        } catch (signupErr: any) {
          console.error('Sign up error:', signupErr);
          if (signupErr.name === "UsernameExistsException") {
            setError("गलत पासवर्ड / Incorrect password");
          } else {
            setError(signupErr.message);
          }
        }
      } else if (err.name === "UserAlreadyAuthenticatedException") {
        router.push("/");
      } else {
        setError(err.name + ": " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-green-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Ashoka Chakra Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 text-9xl">⚖️</div>
        <div className="absolute bottom-1/4 right-1/4 text-9xl">🏛️</div>
      </div>

      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-orange-200">
        {/* Indian Flag Colors Header */}
        <div className="flex gap-1 mb-6">
          <div className="flex-1 h-2 bg-orange-500 rounded"></div>
          <div className="flex-1 h-2 bg-white rounded border border-gray-300"></div>
          <div className="flex-1 h-2 bg-green-600 rounded"></div>
        </div>

        <div className="text-center mb-6">
          <div className="text-5xl mb-3">✧༺⚖️༻✧</div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            SamvidhanAI
          </h1>
          <p className="text-sm text-gray-600 mt-2">भारत का संविधान सहायक / India's Constitution Assistant</p>
        </div>

        <input
          type="text"
          placeholder="नाम / Name"
          className="w-full border p-2 rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="ईमेल / Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="पासवर्ड / Password"
          className="w-full border p-2 rounded mb-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="bg-yellow-50 border border-yellow-300 rounded p-3 mb-4 text-xs">
          <p className="font-semibold text-yellow-800 mb-1">⚠️ पासवर्ड नीति / Password Policy:</p>
          <ul className="text-yellow-700 space-y-1">
            <li>• न्यूनतम 8 अक्षर / Minimum 8 characters</li>
            <li>• बड़े और छोटे अक्षर / Uppercase & lowercase</li>
            <li>• संख्या और प्रतीक / Numbers & symbols (@, !, #)</li>
          </ul>
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        {needsVerification && (
          <>
            <input
              type="text"
              placeholder="सत्यापन कोड / Verification Code"
              className="w-full border p-2 rounded mb-3"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button
              onClick={handleResendCode}
              className="w-full text-sm text-blue-600 mb-3"
            >
              कोड फिर से भेजें / Resend Code
            </button>
          </>
        )}

        {forgotPassword && (
          <>
            <input
              type="text"
              placeholder="रीसेट कोड / Reset Code"
              className="w-full border p-2 rounded mb-3"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
            />
            <input
              type="password"
              placeholder="नया पासवर्ड / New Password"
              className="w-full border p-2 rounded mb-3"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </>
        )}

        <button
          onClick={needsVerification ? handleVerify : forgotPassword ? handleResetPassword : handleLogin}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {loading ? "प्रोसेसिंग... / Processing..." : needsVerification ? "सत्यापित करें और लॉगिन / Verify & Login" : forgotPassword ? "पासवर्ड बदलें / Reset Password" : "लॉगिन / साइन अप / Login / Sign Up"}
        </button>

        {!needsVerification && !forgotPassword && (
          <button
            onClick={handleForgotPassword}
            className="w-full text-sm text-blue-600 mt-3"
          >
            पासवर्ड भूल गए? / Forgot Password?
          </button>
        )}

        <p className="text-xs text-gray-500 mt-4 text-center">
          नए उपयोगकर्ता स्वचालित रूप से पंजीकृत होंगे / New users will be registered automatically
        </p>

        {/* Footer with Ashoka Chakra */}
        <div className="text-center mt-6 text-2xl opacity-70">☸</div>
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
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </main>
  );
}