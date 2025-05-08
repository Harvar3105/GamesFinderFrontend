import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import userAuthInstance from "./src/ControllersInit.ts";

const __moduleName = fileURLToPath(new URL(import.meta.url));
const __dirName = dirname(__moduleName);
const authUrl = process.env.AUTH_SERVER_URL;


const app = express();
const port = process.env.SERVER_PORT || 8080;
app.use(cors());
app.use(bodyParser.json())
app.use(express.static(join(__dirName, 'dist')));

// Get Vue SPA
app.get('/', (req, res) => {
    res.sendFile(join(__dirName, 'dist', 'index.html'));
});

// Request login
app.post('/api/login', async (req, res) => {
    const { username, firstName, lastName, email, password, jwt, rt } = req.body

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

        return res.status(200).json(response);
    } catch (error) {
        console.error('Error auth:', error.message)

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Login error'

        return res.status(status).json({ error: message })
    }
})

// Request register
app.post('/api/login', async (req, res) => {
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
    } catch (error) {
        console.error('Error auth:', error.message)

        const status = error.response?.status || 500
        const message = error.response?.data?.error || 'Register error'

        return res.status(status).json({ error: message })
    }
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

