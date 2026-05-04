import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { getAllCryptos, getTopGainers, getNewListings, addCrypto } from "./cryptoDb.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.warn("Warning: SUPABASE_URL or SUPABASE_SERVICE_KEY is not defined. Set these values in Backend/.env");
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/auth/signup", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.json({ user: data.user, message: "Signup request submitted." });
});

app.post("/auth/signin", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    res.json({ session: data.session, user: data.user });
});

app.get("/crypto", (req, res) => {
    try {
        const cryptos = getAllCryptos();
        res.json({ cryptos });
    } catch (error) {
        console.error("Error fetching cryptos:", error);
        res.status(500).json({ message: "Unable to fetch cryptocurrencies." });
    }
});

app.get("/crypto/gainers", (req, res) => {
    try {
        const cryptos = getTopGainers();
        res.json({ cryptos });
    } catch (error) {
        console.error("Error fetching top gainers:", error);
        res.status(500).json({ message: "Unable to fetch top gainers." });
    }
});

app.get("/crypto/new", (req, res) => {
    try {
        const cryptos = getNewListings();
        res.json({ cryptos });
    } catch (error) {
        console.error("Error fetching new listings:", error);
        res.status(500).json({ message: "Unable to fetch new listings." });
    }
});

app.post("/crypto", (req, res) => {
    try {
        const { name, symbol, price, image, change_24h } = req.body;

        if (!name || !symbol || price === undefined || change_24h === undefined) {
            return res.status(400).json({
                message: "All fields are required: name, symbol, price, image, change_24h.",
            });
        }

        const normalizedPrice = Number(price);
        const normalizedChange = Number(change_24h);

        if (Number.isNaN(normalizedPrice) || Number.isNaN(normalizedChange)) {
            return res
                .status(400)
                .json({ message: "Price and change_24h must be numeric values." });
        }

        const crypto = addCrypto({
            name,
            symbol,
            price: normalizedPrice,
            image: image || symbol,
            change_24h: normalizedChange,
        });

        res.status(201).json({ message: "Cryptocurrency added successfully.", crypto });
    } catch (error) {
        console.error("Error adding crypto:", error);
        res.status(500).json({ message: "Unable to add cryptocurrency." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});