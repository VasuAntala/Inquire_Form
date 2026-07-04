import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import crypto from 'crypto'

// Polyfill crypto for older Node.js versions (e.g. Node 18)
if (!globalThis.crypto) {
    globalThis.crypto = crypto
}

import { mongooseConnection } from './src/Database/DB.js'
import router from './src/router/index.js'
const PORT = process.env.PORT || 3000;

// Support multiple allowed origins (comma-separated in env)
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map(o => o.trim());

const app = express()

app.use(express.json())
app.use(cors({
    origin: (origin, callback) => {
        // Automatically allow any origin (reflects the request origin)
        callback(null, true);
    },
    credentials: true,
}))
app.use(router)

mongooseConnection();

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});