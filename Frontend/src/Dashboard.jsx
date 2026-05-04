import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Coinbaseimge from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/download.svg";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [cryptos, setCryptos] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    symbol: "",
    price: "",
    image: "",
    change_24h: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingCrypto, setLoadingCrypto] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  useEffect(() => {
    const loadCryptos = async () => {
      try {
        const response = await fetch(`${API_URL}/crypto`);
        const data = await response.json();
        if (response.ok) {
          setCryptos(data.cryptos || []);
        }
      } catch (error) {
        console.error("Error loading cryptos:", error);
      }
    };

    loadCryptos();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCrypto = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setLoadingCrypto(true);

    try {
      const response = await fetch(`${API_URL}/crypto`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          symbol: formData.symbol,
          price: Number(formData.price),
          image: formData.image,
          change_24h: Number(formData.change_24h),
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || "Cryptocurrency added successfully.");
        setFormData({
          name: "",
          symbol: "",
          price: "",
          image: "",
          change_24h: "",
        });
        setCryptos((prev) => [data.crypto, ...prev]);
      } else {
        setErrorMessage(data.message || "Failed to add cryptocurrency.");
      }
    } catch (error) {
      console.error("Error adding crypto:", error);
      setErrorMessage("Unable to add cryptocurrency. Please try again.");
    } finally {
      setLoadingCrypto(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Not Authenticated</h1>
          <p className="text-gray-400 mb-6">
            Please sign in to access your dashboard.
          </p>
          <button
            onClick={() => navigate("/signin")}
            className="px-6 py-3 bg-[#283e6c] hover:opacity-50 rounded-lg font-semibold text-lg"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={Coinbaseimge} alt="Coinbase" className="w-10 h-10" />
          <h1 className="text-3xl font-bold">Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-sm transition"
        >
          Logout
        </button>
      </div>

      {/* User Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Email Address
            </label>
            <div className="w-full bg-[#282b31] border border-gray-600 rounded-lg px-4 py-3 text-white text-lg">
              {user.email || "No email provided"}
            </div>
          </div>

          {/* User ID (if available) */}
          {user.id && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                User ID
              </label>
              <div className="w-full bg-[#282b31] border border-gray-600 rounded-lg px-4 py-3 text-white text-sm font-mono break-all">
                {user.id}
              </div>
            </div>
          )}

          {/* Account Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Account Status
            </label>
            <div className="w-full bg-[#282b31] border border-gray-600 rounded-lg px-4 py-3 text-white text-lg">
              <span className="inline-block px-3 py-1 bg-green-600/20 border border-green-600 rounded text-green-400 font-semibold text-sm">
                Active
              </span>
            </div>
          </div>

          {/* Additional Info */}
          {user.metadata && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Account Created
              </label>
              <div className="w-full bg-[#282b31] border border-gray-600 rounded-lg px-4 py-3 text-white text-sm">
                {new Date(user.created_at || Date.now()).toLocaleDateString()}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 px-6 py-3 bg-[#283e6c] hover:opacity-50 rounded-lg font-semibold text-lg transition"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>

      {/* Crypto Management */}
      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add New Cryptocurrency</h2>

          {successMessage && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500 rounded-lg text-green-200 text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-200 text-sm">
              {errorMessage}
            </div>
          )}

          <form
            onSubmit={handleAddCrypto}
            className="grid gap-4 md:grid-cols-2"
          >
            <input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="w-full rounded-lg border border-gray-600 bg-[#282b31] px-4 py-3 text-white"
              required
            />
            <input
              name="symbol"
              value={formData.symbol}
              onChange={handleInputChange}
              placeholder="Symbol (e.g. BTC)"
              className="w-full rounded-lg border border-gray-600 bg-[#282b31] px-4 py-3 text-white"
              required
            />
            <input
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price (USD)"
              className="w-full rounded-lg border border-gray-600 bg-[#282b31] px-4 py-3 text-white"
              required
            />
            <input
              name="change_24h"
              type="number"
              step="0.01"
              value={formData.change_24h}
              onChange={handleInputChange}
              placeholder="24h Change (%)"
              className="w-full rounded-lg border border-gray-600 bg-[#282b31] px-4 py-3 text-white"
              required
            />
            <input
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Image URL or symbol"
              className="md:col-span-2 w-full rounded-lg border border-gray-600 bg-[#282b31] px-4 py-3 text-white"
            />
            <button
              type="submit"
              disabled={loadingCrypto}
              className="md:col-span-2 w-full rounded-lg bg-[#283e6c] px-4 py-3 font-semibold text-white hover:opacity-80 disabled:opacity-50"
            >
              {loadingCrypto ? "Saving..." : "Add Cryptocurrency"}
            </button>
          </form>
        </div>

        <div className="mt-8 bg-[#1a1a1a] border border-gray-700 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Stored Cryptocurrencies</h2>
          <div className="grid gap-4">
            {cryptos.length === 0 ? (
              <p className="text-gray-400">No cryptocurrencies found.</p>
            ) : (
              cryptos.map((crypto) => (
                <div
                  key={crypto.id}
                  className="flex justify-between gap-4 rounded-lg border border-gray-700 bg-[#121212] px-4 py-3"
                >
                  <div>
                    <div className="text-white font-semibold">
                      {crypto.name}
                    </div>
                    <div className="text-gray-400 text-sm">{crypto.symbol}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white">${crypto.price.toFixed(2)}</div>
                    <div
                      className={`text-sm ${crypto.change_24h >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {crypto.change_24h >= 0 ? "+" : ""}
                      {crypto.change_24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
