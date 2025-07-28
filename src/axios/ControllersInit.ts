import AuthController from "@/axios/controllers/AuthController.ts";
import UserDataController from "@/axios/controllers/UserDataController.ts";
import BackendController from "@/axios/controllers/BackendController.ts";

export const authInstance = new AuthController({
    baseURL: import.meta.env.VITE_AUTH_SERVER_URL as string,
    contentType: 'application/json',
});

export const userDataInstance = new UserDataController({
    baseURL: import.meta.env.VITE_BACK_SERVER_URL as string,
    contentType: 'application/json',
})

export const backendInstance = new BackendController({
    baseURL: import.meta.env.VITE_BACK_SERVER_URL as string,
    contentType: 'application/json',
})