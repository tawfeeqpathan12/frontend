import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

const SignupForm = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) return setError("Passwords don't match");
    if (password.length < 6) return setError("Password must be at least 6 characters");

    setLoading(true);
    const result = await signup(name, email, password);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-green-500 to-blue-600 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">🌱</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Join EcoTrack</h2>
          <p className="text-gray-600 mt-2">Start tracking your environmental impact today</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input type="text" placeholder="Full Name" required value={name} onChange={(e) => setName(e.target.value)} className="w-full p-4 border-2 rounded-lg" />
          <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-4 border-2 rounded-lg" />
          <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-4 border-2 rounded-lg" />
          <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-4 border-2 rounded-lg" />

          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-4 rounded-lg">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Already have an account?{" "}
            <button onClick={onSwitchToLogin} className="text-green-600 font-semibold">Sign in here</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
