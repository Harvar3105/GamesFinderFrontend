import express from 'express';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import fs from 'fs';
import bodyParser from 'body-parser';
import logger from './logger.js';
import { userAuthInstance, userDataInstance } from "./ControllersInit.js";
import util from 'util';

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

// Request login
app.post('/api/login', async (req, res) => {
    const { username, firstName, lastName, email, password, jwt, rt } = req.body;
    logger.info("SERVER: LOGIN request", req.body);

    try {
        const response = await userAuthInstance.login({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            jwt: jwt,
            refreshToken: rt,
        });

        if (!response) throw new Error(`No response returned. Is Identity server down? ${response}`)

        return res.status(200).json(response);
    } catch (error: any) {
        logger.error('Error auth:\n' + util.inspect(error, { depth: null }));

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Login error'

        return res.status(status).json({ error: message })
    }
});

// Request register
app.post('/api/register', async (req, res) => {
    const { username, firstName, lastName, email, password, jwt, rt } = req.body

    try {
        const response = await userAuthInstance.register({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        return res.status(200).json(response)
    } catch (error: any) {
        logger.error('Error auth:', error.message)

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Register error'

        return res.status(status).json({ error: message })
    }
});

//Request user data
app.post('/api/userdata/get', async (req, res) => {
    const {jwt } = req.body;

    try {
        const response = await userDataInstance.getUserData(jwt);

        return res.status(200).json(response);
    } catch (error: any) {
        logger.error('Error user data get:', error.message);

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Error user data get'

        return res.status(status).json({ error: message })
    }
});

//Save user data
app.post('/api/userdata/save', async (req, res) => {
    const {wishlist, avatarName, avatarContent, avatarType, jwt} = req.body;

    try {
        const response = await userDataInstance.saveUserData({wishlist, avatarName, avatarContent, avatarType}, jwt);

        return res.status(200).json(response);
    } catch (error: any) {
        logger.error('Error user data save:', error.message);

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Error user data save'

        return res.status(status).json({ error: message })
    }
});


app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});

