import {Express} from "express";
import logger from "../logger.js";
import {userAuthInstance, userDataInstance} from "../ControllersInit.js";
import util from "util";
import * as process from "node:process";
import ResponseError from "../Helpers/ResponseError";

export default function RegisterUserApi(app: Express) {

    //Update tokens
    app.post(process.env.VITE_NODE_SERVER_UPDATE_TOKENS!, async (req, res) => {
        const {jwt, rt} = req.body;

        const response = await userAuthInstance.updateTokens(jwt, rt);

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);

    })

    //Request login
    app.post(process.env.VITE_NODE_SERVER_LOGIN_PATH!, async (req, res) => {
        const { username, firstName, lastName, email, password, jwt, rt } = req.body;
        logger.warn(`Logging with ${username} ${firstName} ${lastName} ${email} ${password} ${jwt} ${rt}`);
        const response = await userAuthInstance.login({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            jwt: jwt,
            refreshToken: rt,
        });

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);

    });

    //Request register
    app.post(process.env.VITE_NODE_SERVER_REGISTER_PATH!, async (req, res) => {
        const { username, firstName, lastName, email, password, jwt, rt } = req.body

        const response = await userAuthInstance.register({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response)
    });

    //Request user data
    app.post(process.env.VITE_MODE_SERVER_USERDATA_GET!, async (req, res) => {
        const {jwt } = req.body;

        const response = await userDataInstance.getUserData(jwt);

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    });

    //Save user data
    app.post(process.env.VITE_MODE_SERVER_USERDATA_SAVE!, async (req, res) => {
        const {wishlist, avatarName, avatarContent, avatarType, jwt} = req.body;

        const response = await userDataInstance.saveUserData({wishlist, avatarName, avatarContent, avatarType}, jwt);

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    });
}