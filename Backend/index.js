import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { mongooseConnection } from './src/Database/DB.js'
import router from './src/router/index.js'
const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

mongooseConnection();

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});