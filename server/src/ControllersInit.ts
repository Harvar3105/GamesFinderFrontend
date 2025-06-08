import UserAuth from './Controllers/UserAuthController.js';
import UserData from './Controllers/UserDataController.js';
import * as process from "node:process";
import GamesController from "./Controllers/GamesController.js";

export const userAuthInstance = new UserAuth({
    baseURL: process.env.AUTH_SERVER_URL as string,
    contentType: 'application/json',
});

export const userDataInstance = new UserData({
    baseURL: process.env.BACK_SERVER_URL as string,
    contentType: 'application/json',
})

export const gamesInstance = new GamesController({
    baseURL: process.env.BACK_SERVER_URL as string,
    contentType: 'application/json',
})
