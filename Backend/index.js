import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import { mongooseConnection } from './src/Database/DB.js'
import router from './src/router/index.js'
const PORT = process.env.PORT || 3000;

if (!globalThis.crypto) {
    globalThis.crypto = crypto
}

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

const app = express()

app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        callback(null, true);
    },
    credentials: true,
}))
app.use(router)

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.originalUrl || req.url}`
    });
});


// Handle uncaught exceptions and unhandled promise rejections
process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Promise Rejection:', reason);
});

mongooseConnection();

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});