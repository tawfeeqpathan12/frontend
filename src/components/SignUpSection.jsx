import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ParticleField = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white/20 animate-float"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative group">
      <label className="block text-sm font-semibold text-white/90 mb-2">
        {label} {required && <span className="text-yellow-300">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 text-white placeholder-white/60 transition-all duration-300 focus:outline-none ${
            isFocused
              ? "border-yellow-300 shadow-lg shadow-yellow-300/25"
              : "border-white/30 hover:border-white/50"
          }`}
          required={required}
        />
        {isFocused && (
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/20 to-green-400/20 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

const SignUpSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { signup } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    goal: "reduce-carbon",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("signup-section");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword)
      return setError("Passwords don't match");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");

    setLoading(true);
    const result = await signup(form.name, form.email, form.password);
    if (!result.success) setError(result.error);
    else setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <ParticleField />
        <div className="relative z-10 container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-bounce mb-8 text-8xl">🎉</div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Welcome to EcoTrack!
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Your account has been created. You can now log in and start your
              journey.
            </p>
            <Button onClick={() => setSubmitted(false)}>
              Continue Exploring
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="signup-section"
      className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden"
    >
      <ParticleField />

      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <h2 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Join the{" "}
              <span className="text-yellow-300">EcoTrack Movement</span>
            </h2>
            <p className="text-xl text-white/90">
              Track your carbon footprint and get AI-powered environmental
              insights.
            </p>
          </div>

          {/* Right: Form */}
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
              {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-300">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  label="Full Name"
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
                <InputField
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
                <InputField
                  label="Password"
                  type="password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                />
                <InputField
                  label="Confirm Password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  required
                />

                <div>
                  <label className="text-white/90 font-semibold text-sm mb-2 block">
                    Primary Goal
                  </label>
                  <select
                    value={form.goal}
                    onChange={(e) => handleChange("goal", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white"
                  >
                    <option value="reduce-carbon">
                      Reduce Carbon Footprint
                    </option>
                    <option value="save-energy">Save Energy</option>
                    <option value="eco-transport">Eco Transport</option>
                    <option value="improve-recycling">Improve Recycling</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Credits */}
      <div className="mt-16 text-center text-lg text-white/80 animate-fade-in">
        Developed with 💚 by{" "}
        <a
          href="https://www.linkedin.com/in/tawfeeq-ahmad-khan-452b4b293/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          Tawfeeq Khan
        </a>
        ,{" "}
        <a
          href="https://www.linkedin.com/in/paras-tyagi-772a9336b/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          Paras Tyagi
        </a>{" "}
        &{" "}
        <a
          href="https://www.linkedin.com/in/raish-vadaviya/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-yellow-300 hover:text-yellow-400 transition-colors"
        >
          Raish Vadaviya
        </a>
        <br />
        <a
          href="https://github.com/tawfeeqpathan12/frontend"
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg underline text-green-300 hover:text-green-400 transition-colors mt-6 inline-block"
        >
          View Project on GitHub
        </a>
      </div>
    </section>
  );
};

export default SignUpSection;
