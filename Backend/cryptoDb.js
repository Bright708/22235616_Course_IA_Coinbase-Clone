import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "crypto.json");

const defaultCryptos = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: 67500,
    image: "BTC",
    change_24h: 2.45,
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: 3450,
    image: "ETH",
    change_24h: 1.82,
  },
  { name: "Tether", symbol: "USDT", price: 1, image: "USDT", change_24h: 0.01 },
  {
    name: "Binance Coin",
    symbol: "BNB",
    price: 580,
    image: "BNB",
    change_24h: -0.75,
  },
  {
    name: "Ripple",
    symbol: "XRP",
    price: 0.52,
    image: "XRP",
    change_24h: 3.21,
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    price: 1,
    image: "USDC",
    change_24h: 0.02,
  },
  { name: "Solana", symbol: "SOL", price: 145, image: "SOL", change_24h: 5.67 },
  {
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    image: "DOGE",
    change_24h: 4.33,
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: 0.45,
    image: "ADA",
    change_24h: -1.23,
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: 7.2,
    image: "DOT",
    change_24h: 2.89,
  },
  {
    name: "Avalanche",
    symbol: "AVAX",
    price: 35,
    image: "AVAX",
    change_24h: -3.45,
  },
  {
    name: "Chainlink",
    symbol: "LINK",
    price: 15,
    image: "LINK",
    change_24h: 1.56,
  },
  {
    name: "Polygon",
    symbol: "MATIC",
    price: 0.57,
    image: "MATIC",
    change_24h: -2.11,
  },
  {
    name: "Litecoin",
    symbol: "LTC",
    price: 72,
    image: "LTC",
    change_24h: 0.89,
  },
  {
    name: "Uniswap",
    symbol: "UNI",
    price: 7.5,
    image: "UNI",
    change_24h: -4.56,
  },
  {
    name: "Cosmos",
    symbol: "ATOM",
    price: 9.2,
    image: "ATOM",
    change_24h: 2.34,
  },
  {
    name: "Filecoin",
    symbol: "FIL",
    price: 5.8,
    image: "FIL",
    change_24h: -1.78,
  },
  {
    name: "NEAR Protocol",
    symbol: "NEAR",
    price: 5.2,
    image: "NEAR",
    change_24h: 6.12,
  },
];

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf-8");
};

const readData = () => {
  if (!fs.existsSync(dataPath)) {
    const now = new Date().toISOString();
    const initialData = defaultCryptos.map((crypto, index) => ({
      id: index + 1,
      ...crypto,
      created_at: now,
    }));
    writeData(initialData);
    return initialData;
  }

  const content = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(content);
};

const getAllCryptos = () => {
  const data = readData();
  return data.sort((a, b) => a.name.localeCompare(b.name));
};

const getTopGainers = (limit = 6) => {
  const data = readData();
  return data.sort((a, b) => b.change_24h - a.change_24h).slice(0, limit);
};

const getNewListings = (limit = 6) => {
  const data = readData();
  return data
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
};

const addCrypto = ({ name, symbol, price, image, change_24h }) => {
  const data = readData();
  const nextId = data.length ? Math.max(...data.map((item) => item.id)) + 1 : 1;
  const newCrypto = {
    id: nextId,
    name,
    symbol,
    price,
    image,
    change_24h,
    created_at: new Date().toISOString(),
  };
  data.unshift(newCrypto);
  writeData(data);
  return newCrypto;
};

export { addCrypto, getAllCryptos, getNewListings, getTopGainers };
