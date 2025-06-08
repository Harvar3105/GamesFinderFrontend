import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import 'dotenv/config';
import logger from './logger.js';
import RegisterUserApi from "./ApiRegisters/RegisterUserApi";
import RegisterGamesApi from "./ApiRegisters/RegisterGamesApi.js";

const __moduleName = fileURLToPath(import.meta.url);
const __dirName = dirname(__moduleName).replace('server', 'spa'); // TODO: fix hardcode
const accessLogStream = fs.createWriteStream(join(dirname(__moduleName), '..', 'logs', 'access.log'), { flags: 'a' });

const app = express();
const port = process.env.SERVER_PORT || 5000;
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(join(__dirName)));

app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev'));



// Get Vue SPA
app.get('/', (req, res) => {
    res.sendFile(join(__dirName, 'index.html'));
});

RegisterUserApi(app);
RegisterGamesApi(app);

app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});

