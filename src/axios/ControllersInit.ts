import AuthController from "@/axios/controllers/AuthController.ts";
import UserDataController from "@/axios/controllers/UserDataController.ts";
import GamesController from "@/axios/controllers/GamesController.ts";
import SteamController from "@/axios/controllers/SteamController.ts";

export const authInstance = new AuthController({
    baseURL: import.meta.env.VITE_AUTH_SERVER_URL as string,
    contentType: 'application/json',
});

export const userDataInstance = new UserDataController({
    baseURL: import.meta.env.VITE_BACK_SERVER_URL as string,
    contentType: 'application/json',
})

export const gamesController = new GamesController({
    baseURL: import.meta.env.VITE_BACK_SERVER_URL as string,
    contentType: 'application/json',
})

export const steamController = new SteamController({
    baseURL: import.meta.env.VITE_BACK_SERVER_URL as string,
    contentType: 'application/json',
})