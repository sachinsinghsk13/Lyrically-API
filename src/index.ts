import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import createModuleLogger from './utilities/logger'
const logger = createModuleLogger('LyricallyApp');
const app = express();

/* Setup Third Party Middlewares */ 
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded());


const server = http.createServer(app);
const SERVER_PORT = process.env.PORT;

server.on('error', (err) => {
    logger.error(err.message);
})

/* Start Server */
server.listen(SERVER_PORT, () => {
    logger.info(`Server is Running on Port ${SERVER_PORT}`)  
})