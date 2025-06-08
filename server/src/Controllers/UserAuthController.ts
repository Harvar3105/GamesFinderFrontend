import {AxiosController, AxiosControllerOptions} from "./AxiosController.js";
import {IUserPayload, User} from "@shared/entities/User.js";
import logger from '../logger.js';
import * as process from "node:process";
import ResponseError from "../Helpers/ResponseError";

export default class UserAuthController extends AxiosController{

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async updateTokens(jwt: string, rt: string): Promise<{jwt: string, rt: string} | ResponseError> {
        try {
            const response = await this.post<{token: string, refreshToken: string}>(process.env.AUTH_SERVER_UPDATE_TOKENS as string, {jwt: jwt, refreshToken: rt});

            return {jwt: response.data.token, rt: response.data.refreshToken};
        } catch (e: any) {
            logger.error(`Tokens update request: ${e.status}\n${e.stack}\n`);
            return new ResponseError(e.status, e.data);
        }
    }

    public async register(user: IUserPayload): Promise<User | ResponseError> {
        try {
            const response = await this.post<IUserPayload>(process.env.AUTH_SERVER_REGISTER_URL as string, user);

            return response.data as User;
        } catch (e: any) {
            logger.error(`User register request: ${e.status}\n${e.stack}\n`);
            return new ResponseError(e.status, e.data);
        }
    }

    public async login(userdata: IUserPayload): Promise<User | ResponseError> {
        if (userdata.password === undefined && (userdata.jwt === undefined && userdata.refreshToken === undefined)) {
            logger.error(`User login request: Missing some data:\npassword:${userdata.password === undefined}\njwt:${userdata.jwt === undefined}\nrt:${userdata.jwt === undefined}`);
            return new ResponseError(500, `Missing user data!`);
        }

        try {
            const response = await this.post<IUserPayload>(process.env.AUTH_SERVER_LOGIN_URL as string, userdata);

            return response.data as User;
        } catch (e: any){
            logger.error(`User login request: ${e.status}\n${e.stack}\n`);
            return new ResponseError(e.status, e.data);
        }
    }
}