import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import './index.css';
import { AuthProvider } from "./components/globalAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewIssue from "./pages/newIssue";
import ViewIssues from "./pages/viewIssues";
import ProtectedRoute from "./components/protectedRoutes";
import Issue from "./pages/Issue";



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <ToastContainer position="top-right" autoClose={3000} />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/newIssue" element={<ProtectedRoute><NewIssue /></ProtectedRoute>} />
            <Route path="/viewIssues" element={<ProtectedRoute><ViewIssues /></ProtectedRoute>} />
            <Route path="/Issue" element={<ProtectedRoute><Issue /></ProtectedRoute>} />
          </Routes>
        </Router>
      </AuthProvider>

    </div>
  );
}

export default App;