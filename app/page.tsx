"use client";

 
import React ,{ useState }  from "react";
import { useRouter } from "next/navigation"; // Import the useRouter hook

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error message state

  const router = useRouter(); // Initialize the router for navigation

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Set loading state

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error message returned by the API
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      // Successful sign-in, redirect to dashboard
      router.push("/tickets");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleGetStarted = () => {
    router.push("/Register"); // Navigate to the "Register" route
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between h-screen bg-gray-50">
      {/* Left Column */}
      <div className="flex flex-col justify-center px-8 lg:px-16 w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
          <span className="lg:text-6xl italic">Ticket</span> <br /> <br />
          Reliable Financial Solutions for Business
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          We provide reliable financial services for businesses powered by cutting-edge AI solutions.
          Join us to experience efficient, robust, and intelligent tools for success.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={handleGetStarted} // Add click handler to navigate
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md"
          >
            Get Started Now
          </button>
        </div>

        <div className="flex mt-10 space-x-8 text-gray-600">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">20+</h2>
            <p className="text-sm">Multinational businesses have trusted us.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">4K+</h2>
            <p className="text-sm">Daily transactions from around the globe.</p>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="flex items-center justify-center w-full lg:w-2/5 bg-white">
        <form
          onSubmit={handleSignIn}
          className="bg-gray-100 rounded-lg p-8 w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-400 rounded-md p-3 mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="johnsmith@work.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none px-4 py-2"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none px-4 py-2"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading} // Disable button when loading
            className={`w-full mt-6 ${
              loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
            } text-white py-2 rounded-md font-semibold transition duration-300`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
