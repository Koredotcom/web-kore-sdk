import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

dotenv.config();
const app = express();
app.use(cors());

// Serve environment variables
app.get('/config', (req, res) => {
    res.json({
        JWT_URL: process.env.JWTURL,
        USER_EMAIL_ID: process.env.USER_EMAIL_ID,
        BOT_NAME: process.env.BOT_NAME,
        BOT_ID: process.env.BOT_ID,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
    });
});

// Serve frontend files from the 'examples/esm/chat' folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'examples', 'esm', 'chat')));

// Default route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'examples', 'esm', 'chat', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
