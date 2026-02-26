import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-[#EEF3F5]">
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-4 pt-16 pb-20">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl w-full items-center">
          {/* Left Side - Login Form Card */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full">
              {/* Title */}
              <h2 className="text-3xl font-bold text-[#1F2A37] mb-2">
                Welcome back
              </h2>

              {/* Subtitle */}
              <p className="text-gray-500 mt-2 mb-6">
                Sign in to continue to AI Email Composer
              </p>

              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              {/* Form */}
              <form className="space-y-4" onSubmit={handleLogin}>
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37] transition"
                  />
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1F2A37] text-white py-3 rounded-xl font-semibold hover:bg-[#111827] transition shadow-md"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>

          {/* Right Side - Premium Workspace Image (Desktop Only) */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Premium workspace"
              className="rounded-3xl shadow-xl object-cover h-[520px] w-full max-w-lg"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

