import React, { useState } from "react";
import { login } from "../components/auth"; // Import the login function
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [visiblity,setVisiblity]=useState(true)
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Call the login function to authenticate the user
      await login(email, password);
      toast.success("Login successful!"); // Show success toast
      navigate("/"); // Redirect to the home page or dashboard
    } catch (error) {
      toast.error(error.message); // Show error toast on failure
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header>
        <h1 className="text-center text-3xl font-bold mt-20">
          Please log in to get support
        </h1>
      </header>
      <div className="flex items-center justify-center mt-6">
        <form onSubmit={handleLogin} className="space-y-4 w-80">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email} // Bind state to input
            onChange={(e) => setEmail(e.target.value)} // Update state on change
            required
          />
          {/* Password Input with Toggle Button */}
        <div className="relative">
            <input
              type={visiblity ? "password" : "text"}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setVisiblity((prevState) => !prevState)}
            >
              {visiblity ? "Show" : "Hide"}
            </button>
          </div>
          {/* Submit Button */}
          <button type="submit" className="btn btn-block bg-black text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
