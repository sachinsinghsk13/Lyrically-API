import express from 'express';
import http from 'http';
import * as dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { connect, connection, ConnectOptions } from 'mongoose';
import createModuleLogger from './utilities/logger'
import AdminRoute from './routes/AdminRoute';
const logger = createModuleLogger('LyricallyApp');
const app = express();
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import apiConfig from './apiDocConfig';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import path from 'path';
import RequestLogger from './utilities/request-logger';

app.use(cors());

expressJSDocSwagger(app)(apiConfig);

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
app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded());
app.use(RequestLogger());

/* Mount Routes */
app.use('/api', AdminRoute);

const server = http.createServer(app);
const SERVER_PORT = process.env.PORT;


/*  Server Events */
server.on('error', (err) => {
    logger.error(err.message);
})

/* Start Server */
server.listen(SERVER_PORT, () => {
    logger.info(`Server is Running on Port ${SERVER_PORT}`);
})
