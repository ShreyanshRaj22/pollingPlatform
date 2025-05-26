// app.js
require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const initSocket = require('./websockets');
const connectToDB = require('./db/mongodb/connection');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./helpers/logger');

const app = express();
const server = http.createServer(app);

const cookieParser = require('cookie-parser');
app.use(cookieParser());


const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

connectToDB();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

app.get('/', (req, res) => {
    res.send('Live Polling Server is running.');
});

initSocket(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
});
