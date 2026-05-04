import PublicIcon from "@mui/icons-material/Public";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdvanceToolsimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Advancedtools.png";
import Alltradables from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Alltradablesimg.png";
import BaseAppimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Baseappimg.png";
import Bitcoinimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Bitcoinimg.png";
import BNBimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/BNBimg.png";
import ETHimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/ETHimg.png";
import StockImage from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/imgi_45_Hero__4_.png";
import Newtocrypto1 from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Newtocryptoimg1.webp";
import Newtocrypto2 from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Newtocryptoimg2.png";
import Newtocrypto3 from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Newtocryptoimg3.png";
import USDCimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/USDCimg.png";
import USDT from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/USDTimg.png";
import XRPimg from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/XRPimg.png";
import Zerofees from "./assets/Coinbase - Buy and Sell Bitcoin, Ethereum, and more with trust/Zerofeesimg.png";
import Lasthomepagesection from "./Lasthomepagesection";

// Crypto price configuration - using valid CoinGecko API IDs
const CRYPTO_CONFIG = {
  tradable: [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC", img: Bitcoinimg },
    { id: "ethereum", name: "Ethereum", symbol: "ETH", img: ETHimg },
    { id: "tether", name: "Tether", symbol: "USDT", img: USDT },
    { id: "binancecoin", name: "BNB", symbol: "BNB", img: BNBimg },
    { id: "ripple", name: "XRP", symbol: "XRP", img: XRPimg },
    { id: "usd-coin", name: "USDC", symbol: "USDC", img: USDCimg },
  ],
  topGainers: [
    { id: "solana", name: "Solana", symbol: "SOL", img: ETHimg },
    { id: "dogecoin", name: "Dogecoin", symbol: "DOGE", img: XRPimg },
    { id: "cardano", name: "Cardano", symbol: "ADA", img: XRPimg },
    { id: "polkadot", name: "Polkadot", symbol: "DOT", img: BNBimg },
    { id: "avalanche-2", name: "Avalanche", symbol: "AVAX", img: ETHimg },
    { id: "chainlink", name: "Chainlink", symbol: "LINK", img: ETHimg },
  ],
  newOnCoinbase: [
    { id: "matic-network", name: "Polygon", symbol: "MATIC", img: ETHimg },
    { id: "litecoin", name: "Litecoin", symbol: "LTC", img: Bitcoinimg },
    { id: "uniswap", name: "Uniswap", symbol: "UNI", img: ETHimg },
    { id: "cosmos", name: "Cosmos", symbol: "ATOM", img: ETHimg },
    { id: "filecoin", name: "Filecoin", symbol: "FIL", img: ETHimg },
    { id: "near", name: "NEAR", symbol: "NEAR", img: ETHimg },
  ],
};

// Fetch all prices from backend API (which calls CoinGecko)
const fetchAllPricesFromAPI = async () => {
  try {
    const response = await fetch(`${API_URL}/crypto`);

    if (!response.ok) {
      console.error(
        "Backend API response not OK:",
        response.status,
        response.statusText,
      );
      return getMockPrices();
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      console.error("Invalid backend API response data");
      return getMockPrices();
    }

    return data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return getMockPrices();
  }
};

// Fallback to alternative free API (Coincap)
const fetchFromAlternativeAPI = async (allIds) => {
  try {
    // Use CoinCap API as fallback (free, no API key needed)
    const idMapping = {
      bitcoin: "btc",
      ethereum: "eth",
      tether: "usdt",
      binancecoin: "bnb",
      ripple: "xrp",
      "usd-coin": "usdc",
      solana: "sol",
      dogecoin: "doge",
      cardano: "ada",
      polkadot: "dot",
      "avalanche-2": "avax",
      chainlink: "link",
      "matic-network": "matic",
      litecoin: "ltc",
      uniswap: "uni",
      cosmos: "atom",
      filecoin: "fil",
      near: "near",
    };

    const capIds = allIds.map((id) => idMapping[id]).join(",");
    const response = await fetch(
      `https://api.coincap.io/v2/assets?ids=${capIds}`,
    );

    if (!response.ok) {
      console.error("Alternative API also failed:", response.status);
      return getMockPrices();
    }

    const result = await response.json();
    const prices = {};

    if (result.data && Array.isArray(result.data)) {
      result.data.forEach((asset) => {
        const originalId = Object.keys(idMapping).find(
          (key) => idMapping[key] === asset.id,
        );
        if (originalId) {
          prices[originalId] = {
            usd: parseFloat(asset.priceUsd),
            usd_24h_change: parseFloat(asset.changePercent24Hr) || 0,
          };
        }
      });
    }

    return prices;
  } catch (error) {
    console.error("Alternative API error:", error);
    return getMockPrices();
  }
};

// Mock prices as final fallback (so UI never shows N/A) with 24h changes
const getMockPrices = () => {
  return {
    bitcoin: { usd: 67500, usd_24h_change: 2.45 },
    ethereum: { usd: 3450, usd_24h_change: 1.82 },
    tether: { usd: 1, usd_24h_change: 0.01 },
    binancecoin: { usd: 580, usd_24h_change: -0.75 },
    ripple: { usd: 0.52, usd_24h_change: 3.21 },
    "usd-coin": { usd: 1, usd_24h_change: 0.02 },
    solana: { usd: 145, usd_24h_change: 5.67 },
    dogecoin: { usd: 0.12, usd_24h_change: 4.33 },
    cardano: { usd: 0.45, usd_24h_change: -1.23 },
    polkadot: { usd: 7.2, usd_24h_change: 2.89 },
    "avalanche-2": { usd: 35, usd_24h_change: -3.45 },
    chainlink: { usd: 15, usd_24h_change: 1.56 },
    "matic-network": { usd: 0.57, usd_24h_change: -2.11 },
    litecoin: { usd: 72, usd_24h_change: 0.89 },
    uniswap: { usd: 7.5, usd_24h_change: -4.56 },
    cosmos: { usd: 9.2, usd_24h_change: 2.34 },
    filecoin: { usd: 5.8, usd_24h_change: -1.78 },
    near: { usd: 5.2, usd_24h_change: 6.12 },
  };
};

// Convert USD to GHS (approximate rate)
const convertToGHS = (usdPrice, exchangeRate = 16.5) => {
  if (!usdPrice || usdPrice === 0) return 0;
  return usdPrice * exchangeRate;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const SYMBOL_IMAGE_MAP = {
  BTC: Bitcoinimg,
  ETH: ETHimg,
  USDT: USDT,
  BNB: BNBimg,
  XRP: XRPimg,
  USDC: USDCimg,
  SOL: ETHimg,
  DOGE: XRPimg,
  ADA: XRPimg,
  DOT: BNBimg,
  AVAX: ETHimg,
  LINK: ETHimg,
  MATIC: ETHimg,
  LTC: Bitcoinimg,
  UNI: ETHimg,
  ATOM: ETHimg,
  FIL: ETHimg,
  NEAR: ETHimg,
};

const isUrl = (value) =>
  typeof value === "string" && /^(https?:\/\/)/i.test(value);

const getImageSource = (crypto) => {
  if (isUrl(crypto.image)) return crypto.image;
  return SYMBOL_IMAGE_MAP[crypto.symbol] || Bitcoinimg;
};

// Format number with commas
const formatPrice = (price) => {
  if (!price || price === 0) return "N/A";
  return `GHS ${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Format percentage change with sign and color
const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null || isNaN(percentage))
    return "0.00%";
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
};
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Heropage = ({ loggedIn }) => {
  const navigate = useNavigate();
  const [hoverEffect, setHovereffect] = useState(false);

  // State for crypto prices and percentage changes
  const [tradableList, setTradableList] = useState(CRYPTO_CONFIG.tradable);
  const [topGainersList, setTopGainersList] = useState(
    CRYPTO_CONFIG.topGainers,
  );
  const [newListingsList, setNewListingsList] = useState(
    CRYPTO_CONFIG.newOnCoinbase,
  );
  const [loading, setLoading] = useState(true);

  // Fetch all prices on component mount and update every second
  useEffect(() => {
    const fetchCryptoList = async (endpoint) => {
      const response = await fetch(`${API_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Backend request failed: ${response.status}`);
      }
      const data = await response.json();
      return data.cryptos || [];
    };

    const fetchAllCryptoData = async () => {
      try {
        const [allCryptos, gainers, newCryptos] = await Promise.all([
          fetchCryptoList("/crypto"),
          fetchCryptoList("/crypto/gainers"),
          fetchCryptoList("/crypto/new"),
        ]);

        setTradableList(allCryptos);
        setTopGainersList(gainers);
        setNewListingsList(newCryptos);
      } catch (error) {
        console.error("Error fetching crypto from backend:", error);
        setTradableList(CRYPTO_CONFIG.tradable);
        setTopGainersList(CRYPTO_CONFIG.topGainers);
        setNewListingsList(CRYPTO_CONFIG.newOnCoinbase);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCryptoData();
  }, []);

  const [value, setValue] = useState(0);
  const handleHOvereffect = () => {
    setHovereffect(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-evenly items-center w-full relative pt-16 p-4">
        <div>
          <img
            src={StockImage}
            alt=""
            className=" w-70 lg:w-106.75 max-h-10.78 md:max-w-176.75 max-h-18.78 rounded-[25px]"
          />
        </div>
        <div className="mt-8">
          <h1 className="text-[5.5rem] flex-col leading-16">
            The future of <br />
            finance is here.
          </h1>
          <h2 className="text-[1.3rem] font-light mt-6">
            Trade crypto and more on a platform you can trust.
          </h2>
          {!loggedIn && (
            <form
              className="flex flex-col md:flex-row gap-4 items-center mt-8"
              onSubmit={handleSignUp}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Frimpong22235616@gmail.com"
                className="h-10 w-full md:h-15 w-99 border-b-neutral-700 border-1 p-4 font-semibold text-[1.1rem] rounded-[5px] hover:bg-[#eef0f4]"
              />
              <button
                type="submit"
                className="flex items-center justify-center h-10 w-full text-[1.1rem] md:h-15 md:w-32 bg-[#0350f5] hover:opacity-50 px-4 rounded-[25px] cursor-pointer text-white whitespace-nowrap md:text-[1.3rem] font-semibold"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-col lg:flex-row items-center max-h-auto w-full justify-between p-16 font-semibold bg-[#eef0f3] sm:flex-col gap-y-6 ">
        <div className="flex flex-col gap-y-8 items-start">
          <h1 className="text-[3.2rem]">
            Explore crypto like Bitcoin,
            <br /> Ethereum, and Dogecoin.
          </h1>
          <h2 className="text-[1.2rem] opacity-50">
            Simply and securely buy, sell, and manage hundreds of
            cryptocurrencies.
          </h2>
          <Link
            to={"/assetsdetails"}
            className="h-14 w-53.25 flex items-center justify-center bg-black text-white rounded-[25px] text-[1.2rem] font-bold cursor-pointer hover:opacity-80"
          >
            See more assets
          </Link>
        </div>
        <div className="w-90 p-8 bg-black h-170 rounded-[30px] text-white flex flex-col items-center  lg:w-177 ">
          <Box sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
              sx={{ padding: "1rem" }}
            >
              <Tab
                label="Tradable"
                {...a11yProps(0)}
                sx={{
                  color: "white",
                  borderRadius: "25px",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderBottom: "none",
                  },
                  "&.Mui-selected": {
                    color: "white",
                    borderRadius: "25px",
                    borderBottom: "none",
                  },
                }}
              />
              <Tab
                label="Top Gainers"
                {...a11yProps(1)}
                sx={{
                  color: "white",
                  borderRadius: "25px",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderBottom: "none",
                  },
                  "&.Mui-selected": {
                    color: "white",
                    borderRadius: "25px",
                    borderBottom: "none",
                  },
                }}
              />
              <Tab
                label="New on Coinbase"
                {...a11yProps(2)}
                sx={{
                  color: "white",
                  borderRadius: "25px",
                  "&:hover": {
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderBottom: "none",
                  },
                  "&.Mui-selected": {
                    color: "white",
                    borderRadius: "25px",
                    borderBottom: "none",
                  },
                }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="flex flex-col gap-16 w-full ">
              <div className="gap-y-12 text-[1.1rem] lg:text-[2.1rem] h-auto flex flex-col gap-y-15  ">
                {tradableList.slice(0, 6).map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex justify-between gap-x-36 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 h-8">
                      <img
                        src={getImageSource(crypto)}
                        alt={crypto.name}
                        className="w-8 h-8"
                      />
                      <span>{crypto.name}</span>
                    </div>
                    <div className="flex-col h-6 ">
                      <span className=" text-[1rem] lg:flex justify-end">
                        {loading ? "Loading..." : formatPrice(crypto.price)}
                      </span>
                      <span
                        className={` flex justify-end text-[1rem] lg:text-[1.5rem] ${crypto.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {loading ? "..." : formatPercentage(crypto.change_24h)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="flex flex-col gap-16 w-full">
              <div className="gap-y-12 text-[1.1rem] lg:text-[2.1rem] h-auto flex flex-col gap-y-15  ">
                {topGainersList.map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex justify-between gap-x-36 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 h-8">
                      <img
                        src={getImageSource(crypto)}
                        alt={crypto.name}
                        className="w-8 h-8"
                      />
                      <span>{crypto.name}</span>
                    </div>
                    <div className="flex-col justify-end h-6">
                      <span className="text-[1rem] lg:flex justify-end">
                        {loading ? "Loading..." : formatPrice(crypto.price)}
                      </span>
                      <span
                        className={` flex justify-end text-[1rem] lg:text-[1.5rem] ${crypto.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {loading ? "..." : formatPercentage(crypto.change_24h)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="flex flex-col gap-16 w-full">
              <div className="gap-y-12 text-[1.1rem] lg:text-[2.1rem] h-auto flex flex-col gap-y-15 ">
                {newListingsList.map((crypto) => (
                  <div
                    key={crypto.id}
                    className="flex justify-between gap-x-36 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 h-8">
                      <img
                        src={getImageSource(crypto)}
                        alt={crypto.name}
                        className="w-8 h-8"
                      />
                      <span>{crypto.name}</span>
                    </div>
                    <div className="flex-col justify-end h-6">
                      <span className=" text-[1rem] lg:flex justify-end">
                        {loading ? "Loading..." : formatPrice(crypto.price)}
                      </span>
                      <span
                        className={`flex justify-end text-[1rem] lg:text-[1.5rem] ${crypto.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}
                      >
                        {loading ? "..." : formatPercentage(crypto.change_24h)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CustomTabPanel>
        </div>
      </div>
      <div className="flex flex-col mt-7 lg:flex-row bg-white items-center max-h-auto w-full justify-center p-16 gap-x-[54px] font-semibold ">
        <img
          src={AdvanceToolsimg}
          alt=""
          className="w-100 h-90 lg:h-108.75 lg:w-135  rounded-[25px]"
        />
        <div className="flex flex-col gap-y-8 items-start">
          <h1 className="text-[3.2rem]">
            Powerful tools, designed <br />
            for the advanced trader.
          </h1>
          <h2 className="text-[1.2rem] opacity-50">
            Powerful analytical tools with the safety and security of Coinbase{" "}
            <br />
            deliver the ultimate trading experience. Tap into sophisticated{" "}
            <br />
            charting capabilities, real-time order books, and deep liquidity{" "}
            <br />
            across hundreds of markets.
          </h2>
          <button className="h-14 w-53.25 bg-black text-white rounded-[25px] text-[1.2rem] font-bold cursor-pointer hover:opacity-80">
            Start trading
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-y-8 lg:flex-row  bg-white items-center max-h-auto w-full justify-center p-16 gap-x-[54px] font-semibold ">
        <div className="flex flex-col gap-y-8 items-start">
          <h1 className="text-[3.2rem] flex flex-col">
            <span className="border-1 border-gray-200 rounded-[10px] p-1.5 text-[1rem] font-light w-46">
              COINBASE ONE
            </span>
            Zero trading fees,
            <br />
            more rewards.
          </h1>
          <h2 className="text-[1.2rem] opacity-50">
            Get more out of crypto with one membership: zero trading fees,
            <br />
            boosted rewards, priority support, and more.
          </h2>
          <button className="h-14 w-53.25 bg-black text-white rounded-[25px] text-[1.2rem] font-bold cursor-pointer hover:opacity-80">
            Claim free trial
          </button>
        </div>
        <img
          src={Zerofees}
          alt=""
          className="h-50 lg:h-109 w-136  rounded-[25px] bg-[#eef0f4]"
        />
      </div>
      <div className=" flex flex-col lg:flex-row bg-white items-center max-h-auto w-full justify-center p-7 gap-x-[54px] font-semibold ">
        <img
          src={BaseAppimg}
          alt=""
          className=" h-50 lg:h-109 w-136  rounded-[25px] bg-[#eef0f4]"
        />
        <div className="flex flex-col gap-y-8 items-start">
          <h1 className="text-[3.2rem] flex flex-col">
            <span className="border-1 border-gray-200 rounded-[10px] p-1.5 text-[1rem] font-light w-46">
              BASE APP
            </span>
            Countless ways to earn
            <br /> crypto with the Base App.
          </h1>
          <h2 className="text-[1.2rem] opacity-50">
            An everything app to trade, create, discover, and chat, all in one
            <br />
            place.
          </h2>
          <button className="h-14 w-53.25 bg-black text-white rounded-[25px] text-[1.2rem] font-bold cursor-pointer hover:opacity-80">
            Learn More
          </button>
        </div>
      </div>
      <div className="bg-[#eef0f4] flex flex-col items-center max-h-auto w-full justify-center p-7 gap-x-[54px] font-semibold ">
        <div className="flex flex-col gap-y-7 lg:flex-row gap-x-48.75 ">
          <h1 className="text-[4.2rem] leading-14">
            New to crypto? <br />
            Learn some <br />
            crypto basics
          </h1>
          <section>
            <h2 className="text-[1.2rem] opacity-50">
              Beginner guides, practical tips, and market updates for <br />
              first-timers, experienced investors, and everyone in <br />
              between
            </h2>
            <button className="h-14 w-53.25 bg-black text-white rounded-[25px] text-[1.2rem] font-bold cursor-pointer mt-2 hover:opacity-80">
              Read More
            </button>
          </section>
        </div>
        <div className="grid grid-cols-1 lg:flex gap-8 items-center mt-8 leading-10">
          <section
            onMouseEnter={handleHOvereffect}
            className={`cursor-pointer ${hoverEffect ? "hover:underline" : "underline-offset-0"} `}
          >
            <img
              src={Newtocrypto1}
              alt=""
              className="w-91.75 h-52.25 rounded-[35px] mt-9"
            />
            <h2 className="text-[2.3rem] font-medium">
              USDC:The digital <br />
              dollar for the global <br />
              crypto economy
            </h2>
            <p className="text-[1.2rem] opacity-40">
              Coinbase believes cryto will be part of the <br />
              solution for creatingan open financial <br />
              system that is both more effecient and more...{" "}
            </p>
          </section>
          <section
            onMouseEnter={handleHOvereffect}
            className={`cursor-pointer ${hoverEffect ? "hover:underline" : "underline-offset-0"} `}
          >
            <img
              src={Newtocrypto2}
              alt=""
              className="w-91.75 h-52.25 rounded-[35px]"
            />
            <h2 className="text-[2.3rem] font-medium">
              Can crypto really replace <br />
              your bank account?
            </h2>
            <p className="text-[1.2rem] opacity-40">
              if you're a big enough fan of crypto ,you've <br />
              probablyn heard the phrase "be your own <br />
              bank" or the tern "bankless" -the idea...
            </p>
          </section>
          <section
            onMouseEnter={handleHOvereffect}
            className={`cursor-pointer ${hoverEffect ? "hover:underline" : "underline-offset-0"} `}
          >
            <img
              src={Newtocrypto3}
              alt=""
              className="w-91.75 h-52.25 rounded-[35px]"
            />
            <h2 className="text-[2.3rem] font-medium">
              When is the best time <br />
              to invest in crypto?
            </h2>
            <p className="text-[1.2rem] opacity-40">
              Cryptocurrencies like Bitcoin can experience <br />
              daily (or even hourly) price volatality. As with <br />
              any kind of investment, volatality may cause...
            </p>
          </section>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row bg-white items-center max-h-auto w-full justify-center p-7 gap-x-[44px] font-semibold ">
        <div className="mt-8 pl-0">
          <h1 className="text-[5.5rem] flex-col leading-18">
            Take control <br />
            of your money
          </h1>
          <h2 className="text-[1.3rem] font-light mt-6">
            Start your portfolio today and discover crypto
          </h2>
          {!loggedIn && (
            <form
              className="flex flex-col md:flex-row gap-4 items-center mt-8"
              onSubmit={handleSignUp}
            >
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Frimpong22235616@gmail.com"
                className="h-10 w-full md:h-15 w-99 border-b-neutral-700 border-1 p-4 font-semibold text-[1.1rem] rounded-[5px] hover:bg-[#eef0f4]"
              />
              <button
                type="submit"
                className="flex items-center justify-center h-10 w-full text-[1.1rem] md:h-15 md:w-32 bg-[#0350f5] hover:opacity-50 px-4 rounded-[25px] cursor-pointer text-white whitespace-nowrap md:text-[1.3rem] font-semibold"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
        <img
          src={Alltradables}
          alt=""
          className=" hidden lg:block h-[481px] w-[641px] "
        />
      </div>
      <div className="bg-white flex flex-col items-center h-[50vh] mt-50 justify-end  w-full  p-16 gap-x-[54px] font-semibold opacity-50">
        <h1>DEX trading is offered by Coinbase Bermuda Technologies Ltd.</h1>
        <h2 className="mt-4">
          Products and features may not be available in all regions. Information
          is for or informational purposes only, and is not (i) an offer, or{" "}
          <br />
          solicitation of an offer, to invest in, or to buy or sell, any
          interests or shares, or to participate in any investment or trading
          strategy or (ii) <br />
          intended to provide accounting, legal, or tax advice, or investment
          recommendations. Trading cryptocurrency comes with risk.
        </h2>
      </div>
      <Lasthomepagesection />
      <div className="p-2 flex flex-col text-[1rem] gap-y-6 lg:flex-row p-7 bg-[#eef0f4]  h-auto justify-between  w-full  font-semibold text-[1.2rem] opacity-50">
        <div className="gap-x-7 lg:gap-x-8 flex ">
          <h1>© 2026 Coinbase</h1>
          <ul className="gap-5 lg:flex gap-4 list-disc">
            <li>Privacy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>
        <div className="flex gap-x-6 cursor-pointer">
          <PublicIcon fontSize="small" />
          <p>Global</p>
          <h1>English</h1>
        </div>
      </div>
    </>
  );
};

export default Heropage;
