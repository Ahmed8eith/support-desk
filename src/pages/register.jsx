import React, { useState } from "react";
import { register } from "../components/auth"; // Import the register function
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function NewUser() {
  const [name, setName] = useState(""); // Track name input
  const [email, setEmail] = useState(""); // Track email input
  const [password, setPassword] = useState(""); // Track password input
  const [visibility, setVisibility] = useState(true);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent form default submission behavior

    try {
      // Call the register function to create the user
      await register(email, password);
      toast.success("Registration successful!");
      navigate("/"); // Redirect to the login page
    } catch (error) {
      toast.error(error.message); // Show error toast on failure
    }
  };

  return (
    <div className="flex flex-col h-screen p-4 sm:p-8">
      <header>
        <h1 className="text-center text-2xl sm:text-3xl font-bold mt-10 sm:mt-20">
          Please register to get support
        </h1>
      </header>
      <div className="flex items-center justify-center mt-6">
        <form
          onSubmit={handleRegister}
          className="space-y-4 w-full max-w-sm sm:w-80"
        >
          {/* Name Input */}
          <input
            type="text"
            placeholder="Enter your name"
            className="input input-bordered w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Email Input */}
          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {/* Password Input with Toggle Button */}
          <div className="relative">
            <input
              type={visibility ? "password" : "text"}
              placeholder="Enter your password"
              className="input input-bordered w-full pr-16"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={() => setVisibility((prevState) => !prevState)}
            >
              {visibility ? "Show" : "Hide"}
            </button>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-block bg-black text-white hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
