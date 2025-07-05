import {Express} from "express";
import logger from "../logger.js";
import {gamesInstance, userAuthInstance, userDataInstance} from "../ControllersInit.js";
import * as process from "node:process";
import ResponseError from "../Helpers/ResponseError";
import GetHeaders from "../Helpers/GetHeaders";
import { UserData } from "@shared/entities";

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

        const userDataResponse = await userDataInstance.getUserData({headers: {'Authorization': `Bearer ${response.jwt ?? jwt}`}});
        logger.info(`User Data: ${JSON.stringify(userDataResponse)}`);
        if (userDataResponse instanceof ResponseError) {
            response.data = {userId: response.id!, wishlist: Array(), id: null, createdAt: new Date(), updatedAt: new Date()} as UserData;
        } else {
            response.data = userDataResponse;
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

        response.data = {userId: response.id!, wishlist: Array(), id: null, createdAt: new Date(), updatedAt: new Date()} as UserData;

        return res.status(200).json(response)
    });

    //Request user data
    app.get(process.env.VITE_NODE_SERVER_USERDATA_GET!, async (req, res) => {
        const response = await userDataInstance.getUserData(GetHeaders(req, res));

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        return res.status(200).json(response);
    });

    //Save user data
    app.post(process.env.VITE_NODE_SERVER_USERDATA_SAVE!, async (req, res) => {
        const {userId, wishlist, avatarName, avatarContent, avatarType} = req.body;

        const config = GetHeaders(req, res);

        const response = await userDataInstance.saveUserData(
            {
                userId: userId ?? null,
                usersWishlist: wishlist ?? null,
                avatarFileName: avatarName ?? null,
                avatarContent: avatarContent ?? null,
                avatarFileType: avatarType ?? null,
            },
            config);

        if (response instanceof ResponseError) {
            return res.status(response.status).json(response.error);
        }

        const checkWishlistResponse = await gamesInstance.checkExistManyBySteamIds(wishlist.map(String), config);

        if (checkWishlistResponse instanceof ResponseError || checkWishlistResponse.length === 0) {
            return res.status(200).json(response);
        }

        await gamesInstance.crawlSteam({gamesIds: checkWishlistResponse.map(Number).filter(n => !isNaN(n)), forceUpdate: true}, config )

        return res.status(200).json(response);
    });
}