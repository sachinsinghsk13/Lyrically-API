import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import * as cors from 'cors';

const app = express();

/* Setup Third Party Middlewares */ 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const server = http.createServer(app);
const SERVER_PORT = process.env.PORT;

server.on('connect', () => {

})

/* Start Server */
server.listen(SERVER_PORT, () => {
    console.log(`Server is Running on Port ${SERVER_PORT}`);  
})