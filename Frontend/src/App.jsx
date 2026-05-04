import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AssetDetail from "./AssetDetail";
import Dashboard from "./Dashboard";
import Heropage from "./Heropage";
import Menubar from "./Menubar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Submenu from "./Submenu";

const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [subMenu, setSubmenu] = useState("");
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";
  const isAssetsdetailsPage = location.pathname === "/assetsdetails";
  const isDashboardPage = location.pathname === "/dashboard";
  const loggedIn = !!user;

  const handleActiveMenu = (name) => {
    setSubmenu(name);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setEmail("");
    setPassword("");
    navigate("/");
  };

  const handleSigninsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Sign in failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to connect to the backend. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignupsubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to connect to the backend. Make sure the backend is running.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isSignUpPage && !isSignInPage && !isAssetsdetailsPage && (
        <Menubar
          subMenu={subMenu}
          setSubmenu={setSubmenu}
          handleActiveMenu={handleActiveMenu}
          handleSignupsubmit={handleSignupsubmit}
          handleSigninsubmit={handleSigninsubmit}
          loggedIn={loggedIn}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <div className={subMenu ? "blur-sm pointer-events-none" : ""}>
              <Heropage
                handleSignupsubmit={handleSignupsubmit}
                handleSigninsubmit={handleSigninsubmit}
                loggedIn={loggedIn}
              />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              setEmail={setEmail}
              setPassword={setPassword}
              handleSignupsubmit={handleSignupsubmit}
              error={error}
              email={email}
              password={password}
              success={success}
              loading={loading}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn
              setEmail={setEmail}
              setPassword={setPassword}
              handleSigninsubmit={handleSigninsubmit}
              error={error}
              email={email}
              password={password}
              success={success}
              loading={loading}
            />
          }
        />
        <Route path="/assetsdetails" element={<AssetDetail />} />
        <Route
          path="/dashboard"
          element={
            loggedIn ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
                </div>
              </div>
            )
          }
        />
      </Routes>

      {!isSignUpPage && <Submenu subMenu={subMenu} setSubmenu={setSubmenu} />}
    </>
  );
}

export default App;
