import { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import AssetDetail from "./AssetDetail";
import Heropage from "./Heropage";
import Menubar from "./Menubar";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Submenu from "./Submenu";

const API_URL = "http://localhost:3001/api";
function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [subMenu, setSubmenu] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const isSignUpPage = location.pathname === "/signup";
  const isSignInPage = location.pathname === "/signin";
  const isAssetsdetailsPage = location.pathname === "/assetsdetails";
  const [loggedIn, setLoggedIn] = useState(() => {
    const saved = localStorage.getItem("loggedIn");
    return saved === "true";
  });

  const handleActiveMenu = (name) => {
    setSubmenu(name);
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
        body: JSON.stringify({ email }),
      });

      const text = await response.text();

      if (!text) {
        setError("Empty response from server. Is the backend running?");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);

      if (response.ok) {
        setSuccess(true);
        setError("");
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        alert("Logged in successfully!");
        navigate("/");
      } else {
        setError(data.message || "Sign in failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError(
        "Failed to connect to server. Make sure the backend is running on port 3001.",
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
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();

      if (!text) {
        setError("Empty response from server. Is the backend running?");
        setLoading(false);
        return;
      }

      const data = JSON.parse(text);

      if (response.ok) {
        setSuccess(true);
        setEmail("");
        setPassword("");
        setLoggedIn(true);
        localStorage.setItem("loggedIn", "true");
        alert("Account created successfully!");
        navigate("/");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      setError(
        "Failed to connect to server. Make sure the backend is running.",
      );
      console.error("Error:", err);
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
              handleSigninsubmit={handleSigninsubmit}
              error={error}
              email={email}
              success={success}
              loading={loading}
            />
          }
        />
        <Route path="/assetsdetails" element={<AssetDetail />} />
      </Routes>

      {!isSignUpPage && <Submenu subMenu={subMenu} setSubmenu={setSubmenu} />}
    </>
  );
}

export default App;
