import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connect, connection, ConnectOptions } from 'mongoose';
import createModuleLogger from './utilities/logger'
import AdminRoute from './routes/admin';
const logger = createModuleLogger('LyricallyApp');
const app = express();

const mongodbConfig: ConnectOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

/* Setup Database */
connection.on('connecting', () => logger.info('Connecting to Database...'));
connection.on('connected', () => logger.info('Connected to Database Successfully'));
connection.on('error', () => logger.error('An error occured in database'));
connect(`mongodb://${process.env.DATABASE_HOST}/${process.env.DATABASE}`, mongodbConfig);

/* Setup Third Party Middlewares */
// app.use(cors);
app.use(express.json());
app.use(express.urlencoded());

/* Mount Routes */
app.use('/api', AdminRoute);

const server = http.createServer(app);
const SERVER_PORT = process.env.PORT;


/*  Server Events */
server.on('error', (err) => {
    logger.error(err.message);
})

server.on('request', () => {
    logger.info('Request Received');
})

/* Start Server */
server.listen(SERVER_PORT, () => {
    logger.info(`Server is Running on Port ${SERVER_PORT}`);
})