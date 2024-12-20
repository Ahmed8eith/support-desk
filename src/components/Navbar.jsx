// Navbar.js
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./globalAuth";
import { logout } from "./auth";
import { toast } from "react-toastify";

function Navbar() {

  const {currentUser}=useAuth()
  const navigate=useNavigate()

  const handleLogout = async () => {
    try {
      await logout(); // Log the user out
      toast.success("Logged out succsefully!")
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error.message);
      toast.error("Failed to logout")
    }
  };


  return (
    <div className="navbar bg-base-100 border-b-2 border-gray-200 shadow-sm px-20 max-w-4x1 mx-auto">
      <div className="navbar-start flex-1">
        <Link to="/" className="text-lg font-semibold">
          Support
        </Link>
      </div>
      <div className="navbar-end flex-none">
        {currentUser ? (
          // Show Logout button if user is logged in
          <button
            onClick={handleLogout}
            className="btn btn-neutral normal-case text-white "
          >
            Logout
          </button>
        ) : (
          // Show Login and Register buttons if no user is logged in
          <>
            <Link to="/login" className="btn btn-ghost normal-case mr-20">
              <img src="/icons/login.png" alt="Login icon" className="w-4 h-4" />
              Login
            </Link>
            <Link to="/register" className="btn btn-ghost normal-case ">
              <img src="/icons/person.png" alt="Register icon" className="w-4 h-4" />
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;