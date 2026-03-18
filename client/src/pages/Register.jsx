import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiFetch } from "../utils/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const response = await apiFetch(
        "/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save JWT token
        localStorage.setItem("token", data?.token || "");

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data?.message || "Registration failed");
      }
    } catch (error) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f3ee]">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 max-w-6xl w-full items-center">

          {/* Left Side - Register Form */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 w-full border border-gray-50 ring-1 ring-black/5 max-w-[500px]">

              <h1 className="text-5xl font-black text-[#2e2a27] mb-3 font-serif">
                Create account
              </h1>

              <p className="text-gray-400 font-medium mb-10 text-lg">
                Join the future of professional communication.
              </p>

              {error && (
                <p className="text-red-500 text-sm mb-6 bg-red-50 p-4 rounded-2xl border border-red-100 font-semibold">{error}</p>
              )}

              <form className="space-y-5" onSubmit={handleRegister}>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#fbfaf8] border border-gray-100 rounded-[1.25rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white focus:border-violet-500 transition-all font-medium text-sm shadow-inner"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#fbfaf8] border border-gray-100 rounded-[1.25rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white focus:border-violet-500 transition-all font-medium text-sm shadow-inner"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#fbfaf8] border border-gray-100 rounded-[1.25rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white focus:border-violet-500 transition-all font-medium text-sm shadow-inner"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-1">Confirm</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#fbfaf8] border border-gray-100 rounded-[1.25rem] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:bg-white focus:border-violet-500 transition-all font-medium text-sm shadow-inner"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#2e2a27] text-[#f6f3ee] py-5 rounded-[1.5rem] font-bold hover:bg-black transition-all duration-500 shadow-xl shadow-gray-200 active:scale-[0.98] mt-4"
                >
                  Create Premium Account
                </button>

              </form>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="hidden md:flex items-center justify-center relative">
            <div className="absolute -inset-4 bg-violet-100 rounded-[4rem] blur-3xl opacity-20 animate-pulse"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Workspace"
              className="rounded-[3.5rem] shadow-2xl object-cover h-[620px] w-full max-w-lg relative z-10 border-8 border-white group transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;