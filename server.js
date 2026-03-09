import cors from 'cors';
import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Path to email.json
const emailDataPath = join(__dirname, 'src', 'Emaildata', 'Email.json');

// Helper function to read email data
const readEmailData = () => {
    try {
        const data = readFileSync(emailDataPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading email data:', error);
        return { email: [], password: [] };
    }
};

// Helper function to write email data
const writeEmailData = (data) => {
    try {
        writeFileSync(emailDataPath, JSON.stringify(data, null, 2));
        return true;
    } catch (error) {
        console.error('Error writing email data:', error);
        return false;
    }
};

// GET endpoint to get all emails
app.get('/api/emails', (req, res) => {
    const data = readEmailData();
    res.json(data);
});

// POST endpoint for signup
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const data = readEmailData();

    // Check if email already exists
    const existingEmail = data.email.find(e => e.email.toLowerCase() === email.toLowerCase());
    if (existingEmail) {
        return res.status(409).json({ message: 'Email already exists' });
    }

    // Add new email
    const newId = (data.email.length + 1).toString();
    data.email.push({ id: newId, email });
    data.password.push({ id: newId, email, password });

    if (writeEmailData(data)) {
        res.status(201).json({ message: 'User created successfully', email });
    } else {
        res.status(500).json({ message: 'Failed to save user data' });
    }
});

// POST endpoint for sign in (email-only verification)
app.post('/api/auth/signin', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const data = readEmailData();

    // Check if email exists (case-insensitive)
    const existingEmail = data.email.find(e => e.email.toLowerCase() === email.toLowerCase());

    if (existingEmail) {
        return res.status(200).json({
            message: 'Sign in successful',
            email: existingEmail.email
        });
    } else {
        return res.status(401).json({ message: 'Email not found. Please sign up first.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});