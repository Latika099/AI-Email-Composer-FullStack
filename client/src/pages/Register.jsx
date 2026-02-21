import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
      const response = await fetch(
        "http://localhost:5000/api/auth/register",
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
        localStorage.setItem("token", data.token);

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Registration failed");
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

          {/* Left Side - Register Form */}
          <div className="w-full flex justify-center md:justify-end">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 max-w-md w-full">

              <h2 className="text-3xl font-bold text-[#1F2A37] mb-2">
                Create your account
              </h2>

              <p className="text-gray-500 mt-2 mb-6">
                Join AI Email Composer and start writing smarter emails
              </p>

              {error && (
                <p className="text-red-500 text-sm mb-4">{error}</p>
              )}

              <form className="space-y-4" onSubmit={handleRegister}>

                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37]"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37]"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37]"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1F2A37]"
                />

                <button
                  type="submit"
                  className="w-full bg-[#1F2A37] text-white py-3 rounded-xl font-semibold hover:bg-[#111827] transition shadow-md"
                >
                  Register
                </button>

              </form>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="hidden md:flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
              alt="Workspace"
              className="rounded-3xl shadow-xl object-cover h-[520px] w-full max-w-lg"
            />
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;