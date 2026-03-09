import { Icon } from "@coinbase/cds-web/icons";
import { HStack } from "@coinbase/cds-web/layout";
import { Tooltip } from "@coinbase/cds-web/overlays";
import { Pagination } from "@coinbase/cds-web/pagination/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
} from "@coinbase/cds-web/tables";
import { Text } from "@coinbase/cds-web/typography";
import { useEffect, useState } from "react";

import { mockAccounts } from "./data";

// Fetch all prices from CoinGecko API
const fetchAllPricesFromAPI = async () => {
  try {
    const allIds = [
      "bitcoin",
      "ethereum",
      "tether",
      "binancecoin",
      "ripple",
      "usd-coin",
      "solana",
      "dogecoin",
      "cardano",
      "polkadot",
      "avalanche-2",
      "chainlink",
      "matic-network",
      "litecoin",
      "uniswap",
      "cosmos",
      "filecoin",
      "near",
      "bitcoin-cash",
      "ethereum-classic",
      "0x",
      "basic-attention-token",
      "zcash",
      "maker",
      "dai",
      "omg-network",
      "kyber-network",
      "augur",
      "stellar",
      "eos",
      "dogecoin",
      "tezos",
      "algorand",
      "dash",
      "orchid",
      "compound",
      "balancer",
      "yearn-finance",
      "bancor",
      "synthetix",
      "skale",
      "cardano",
      "internet-computer",
      "1inch",
      "polymath",
      "amp",
      "barnbridge",
      "rally",
      "clover",
      "harvest-finance",
      "mask-network",
      "fetch-ai",
      "paxos-standard",
      "alchemy-pay",
      "assemble-protocol",
      "playdapp",
      "rai",
      "tribe",
      "orion-protocol",
      "iotex",
      "terrausd",
      "quickswap",
      "axie-infinity",
      "request",
      "wrapped-luna",
      "truefi",
      "radicle",
      "derivadao",
      "suku",
      "rari-governance-token",
      "xyo",
      "coti",
      "horizen",
    ];

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${allIds.join(",")}&vs_currencies=usd&include_24hr_change=true`,
    );

    if (!response.ok) {
      return await fetchFromAlternativeAPI(allIds);
    }

    const data = await response.json();
    if (!data || typeof data !== "object") {
      return await fetchFromAlternativeAPI(allIds);
    }
    return data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    return getMockPrices();
  }
};

// Fallback to CoinCap API
const fetchFromAlternativeAPI = async (allIds) => {
  try {
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
      "bitcoin-cash": "bch",
      "ethereum-classic": "etc",
      "0x": "zrx",
      "basic-attention-token": "bat",
      zcash: "zec",
      maker: "mk",
      dai: "dai",
      "omg-network": "omg",
      "kyber-network": "knc",
      augur: "rep",
      stellar: "xlm",
      eos: "eos",
      tezos: "xtz",
      algorand: "algo",
      dash: "dash",
      orchid: "oxt",
      compound: "comp",
      balancer: "bal",
      "yearn-finance": "yfii",
      bancor: "bnt",
      synthetix: "snx",
      skale: "skl",
      "internet-computer": "icp",
      "1inch": "1inch",
      polymath: "poly",
      amp: "amp",
      barnbridge: "bond",
      rally: "rly",
      clover: "clv",
      "harvest-finance": "farm",
      "mask-network": "mask",
      "fetch-ai": "fet",
      "paxos-standard": "pax",
      "alchemy-pay": "ach",
      "assemble-protocol": "asm",
      playdapp: "pla",
      rai: "rai",
      tribe: "tribe",
      "orion-protocol": "orn",
      iotx: "iotx",
      terrausd: "ust",
      quickswap: "quick",
      "axie-infinity": "axs",
      request: "req",
      "wrapped-luna": "wluna",
      truefi: "tru",
      radicle: "rad",
      derivadao: "ddx",
      suku: "suku",
      "rari-governance-token": "rgt",
      xyo: "xyo",
      coti: "coti",
      horizen: "zen",
    };

    const capIds = allIds
      .map((id) => idMapping[id])
      .filter(Boolean)
      .join(",");
    if (!capIds) return getMockPrices();

    const response = await fetch(
      `https://api.coincap.io/v2/assets?ids=${capIds}`,
    );

    if (!response.ok) return getMockPrices();

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
    return getMockPrices();
  }
};

// Mock prices as final fallback
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
    "bitcoin-cash": { usd: 450, usd_24h_change: 1.15 },
    "ethereum-classic": { usd: 25, usd_24h_change: -0.95 },
    "0x": { usd: 0.35, usd_24h_change: 2.33 },
    "basic-attention-token": { usd: 0.28, usd_24h_change: -1.45 },
    zcash: { usd: 45, usd_24h_change: 3.67 },
    maker: { usd: 1500, usd_24h_change: 0.78 },
    dai: { usd: 1, usd_24h_change: 0.01 },
    "omg-network": { usd: 1.5, usd_24h_change: -2.34 },
    "kyber-network": { usd: 0.65, usd_24h_change: 1.89 },
    augur: { usd: 15, usd_24h_change: -3.21 },
    stellar: { usd: 0.12, usd_24h_change: 4.56 },
    eos: { usd: 0.8, usd_24h_change: -1.67 },
    tezos: { usd: 0.9, usd_24h_change: 2.45 },
    algorand: { usd: 0.18, usd_24h_change: 5.12 },
    dash: { usd: 35, usd_24h_change: -0.89 },
    orchid: { usd: 0.15, usd_24h_change: 3.45 },
    compound: { usd: 55, usd_24h_change: 1.23 },
    balancer: { usd: 3.5, usd_24h_change: -2.67 },
    "yearn-finance": { usd: 2500, usd_24h_change: 0.45 },
    bancor: { usd: 1.2, usd_24h_change: 2.89 },
    synthetix: { usd: 2.8, usd_24h_change: -1.34 },
    skale: { usd: 0.045, usd_24h_change: 6.78 },
    "internet-computer": { usd: 10, usd_24h_change: -0.56 },
    "1inch": { usd: 0.35, usd_24h_change: 3.21 },
    polymath: { usd: 0.2, usd_24h_change: -2.45 },
    amp: { usd: 0.007, usd_24h_change: 1.89 },
    barnbridge: { usd: 3, usd_24h_change: -0.67 },
    rally: { usd: 0.02, usd_24h_change: 5.43 },
    clover: { usd: 0.12, usd_24h_change: 2.15 },
    "harvest-finance": { usd: 25, usd_24h_change: -1.78 },
    "mask-network": { usd: 2.5, usd_24h_change: 4.32 },
    "fetch-ai": { usd: 0.2, usd_24h_change: -3.21 },
    "paxos-standard": { usd: 1, usd_24h_change: 0.02 },
    "alchemy-pay": { usd: 0.035, usd_24h_change: 2.67 },
    "assemble-protocol": { usd: 0.04, usd_24h_change: -1.45 },
    playdapp: { usd: 0.18, usd_24h_change: 3.89 },
    rai: { usd: 2.8, usd_24h_change: 0.34 },
    tribe: { usd: 0.03, usd_24h_change: 5.12 },
    "orion-protocol": { usd: 0.8, usd_24h_change: -2.89 },
    iotex: { usd: 0.04, usd_24h_change: 4.56 },
    terrausd: { usd: 0.01, usd_24h_change: -5.67 },
    quickswap: { usd: 35, usd_24h_change: 1.23 },
    "axie-infinity": { usd: 6, usd_24h_change: -3.45 },
    request: { usd: 0.1, usd_24h_change: 2.78 },
    "wrapped-luna": { usd: 0.5, usd_24h_change: -1.89 },
    truefi: { usd: 0.06, usd_24h_change: 4.12 },
    radicle: { usd: 1.5, usd_24h_change: -0.45 },
    derivadao: { usd: 0.8, usd_24h_change: 3.67 },
    suku: { usd: 0.15, usd_24h_change: 2.34 },
    "rari-governance-token": { usd: 8, usd_24h_change: -1.23 },
    xyo: { usd: 0.008, usd_24h_change: 5.89 },
    coti: { usd: 0.1, usd_24h_change: -2.56 },
    horizen: { usd: 12, usd_24h_change: 1.78 },
  };
};

// Map currency codes to CoinGecko IDs
const currencyToId = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "binancecoin",
  XRP: "ripple",
  USDC: "usd-coin",
  SOL: "solana",
  DOGE: "dogecoin",
  ADA: "cardano",
  DOT: "polkadot",
  AVAX: "avalanche-2",
  LINK: "chainlink",
  MATIC: "matic-network",
  LTC: "litecoin",
  UNI: "uniswap",
  ATOM: "cosmos",
  FIL: "filecoin",
  NEAR: "near",
  BCH: "bitcoin-cash",
  ETC: "ethereum-classic",
  ZRX: "0x",
  BAT: "basic-attention-token",
  ZEC: "zcash",
  MKR: "maker",
  DAI: "dai",
  OMG: "omg-network",
  KNC: "kyber-network",
  REP: "augur",
  XLM: "stellar",
  EOS: "eos",
  XTZ: "tezos",
  ALGO: "algorand",
  DASH: "dash",
  OXT: "orchid",
  COMP: "compound",
  BAL: "balancer",
  YFII: "yearn-finance",
  BNT: "bancor",
  SNX: "synthetix",
  SKL: "skale",
  ICP: "internet-computer",
  "1INCH": "1inch",
  POLY: "polymath",
  AMP: "amp",
  BOND: "barnbridge",
  RLY: "rally",
  CLV: "clover",
  FARM: "harvest-finance",
  MASK: "mask-network",
  FET: "fetch-ai",
  PAX: "paxos-standard",
  ACH: "alchemy-pay",
  ASM: "assemble-protocol",
  PLA: "playdapp",
  RAI: "rai",
  TRIBE: "tribe",
  ORN: "orion-protocol",
  IOTX: "iotex",
  UST: "terrausd",
  QUICK: "quickswap",
  AXS: "axie-infinity",
  REQ: "request",
  WLUNA: "wrapped-luna",
  TRU: "truefi",
  RAD: "radicle",
  DDX: "derivadao",
  SUKU: "suku",
  RGT: "rari-governance-token",
  XYO: "xyo",
  COTI: "coti",
  ZEN: "horizen",
};

// Format percentage change with sign and color
const formatPercentage = (percentage) => {
  if (percentage === undefined || percentage === null || isNaN(percentage))
    return "0.00%";
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
};

export const AssetList = ({ pageSize }) => {
  const totalResults = mockAccounts.length;
  const [activePage, setActivePage] = useState(1);
  const [cryptoPrices, setCryptoPrices] = useState({});

  // Fetch prices on mount - using mock data as default to avoid API issues
  useEffect(() => {
    // Initialize with mock data immediately
    setCryptoPrices(getMockPrices());

    const fetchPrices = async () => {
      const prices = await fetchAllPricesFromAPI();
      // Only update if we get valid data with percentage changes
      const hasData = Object.keys(prices).some(
        (key) => prices[key]?.usd_24h_change,
      );
      if (hasData) {
        setCryptoPrices(prices);
      }
    };
    fetchPrices();

    // Update prices every 30 seconds
    const interval = setInterval(fetchPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const startIndex = (activePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const accountsCopy = mockAccounts.slice(startIndex, endIndex);

  // Calculate USD value for an account
  const getUsdValue = (account) => {
    const currencyCode = account.balance.currency;

    // For fiat currencies
    if (account.type === "fiat") {
      if (currencyCode === "USD") return parseFloat(account.balance.amount);
      if (currencyCode === "EUR")
        return parseFloat(account.balance.amount) * 1.08;
      if (currencyCode === "GBP")
        return parseFloat(account.balance.amount) * 1.27;
      return 0;
    }

    // For crypto, get the price
    const coinGeckoId = currencyToId[currencyCode];
    if (!coinGeckoId || !cryptoPrices[coinGeckoId]) return 0;

    const price = cryptoPrices[coinGeckoId].usd;
    const amount = parseFloat(account.balance.amount);
    return amount * price;
  };

  // Get percentage change for an account
  const getPercentageChange = (account) => {
    const currencyCode = account.balance.currency;

    // For fiat currencies, no percentage change
    if (account.type === "fiat") {
      return null;
    }

    // For crypto, get the 24h change
    const coinGeckoId = currencyToId[currencyCode];
    console.log(
      `Getting percentage for ${currencyCode} -> ${coinGeckoId}`,
      cryptoPrices[coinGeckoId],
    );

    if (!coinGeckoId || !cryptoPrices[coinGeckoId]) return 0;

    return cryptoPrices[coinGeckoId].usd_24h_change || 0;
  };

  return (
    <Table tableLayout="auto" variant="ruled">
      <TableHeader>
        <TableRow>
          <TableCell title="Currency" width="40%" />
          <TableCell width="20%">
            <Tooltip content="Information about balance">
              <Text as="span" color="currentColor">
                <HStack>
                  Balance <Icon name="info" size="xs" />
                </HStack>
              </Text>
            </Tooltip>
          </TableCell>
          <TableCell width="20%" alignItems="flex-end" title="Value (USD)" />
          <TableCell width="20%" alignItems="flex-end" title="24h Change" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {accountsCopy.map((account) => {
          const percentChange = getPercentageChange(account);
          return (
            <TableRow key={account.id}>
              <TableCell
                start={
                  <HStack gap={2}>
                    <Icon name="currencies" size="m" />
                  </HStack>
                }
                subtitle={account.currency.name}
                title={account.name}
                width="40%"
              />
              <TableCell
                subtitle={account.balance.currency}
                title={`${parseFloat(account.balance.amount).toLocaleString()}`}
                width="20%"
              />
              <TableCell
                direction="horizontal"
                justifyContent="flex-end"
                width="20%"
              >
                <Text
                  as="span"
                  color={account.type === "fiat" ? "inherit" : "inherit"}
                >
                  $
                  {getUsdValue(account).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Text>
              </TableCell>
              <TableCell
                direction="horizontal"
                justifyContent="flex-end"
                width="20%"
              >
                {percentChange !== null ? (
                  <Text as="span" color={percentChange >= 0 ? "green" : "red"}>
                    {formatPercentage(percentChange)}
                  </Text>
                ) : (
                  <Text as="span" color="inherit">
                    -
                  </Text>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} direction="horizontal">
            <Pagination
              activePage={activePage}
              onChange={setActivePage}
              totalPages={5}
            />
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
