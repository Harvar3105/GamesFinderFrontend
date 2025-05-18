import {AxiosController, AxiosControllerOptions} from "./AxiosController.js";
import {IUserPayload, User} from "@shared/entities/User.js";
import logger from '../logger.js';
import * as process from "node:process";

export default class UserAuthController extends AxiosController{

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async register(user: IUserPayload): Promise<User | null> {
        try {
            const response = await this.post<IUserPayload>(process.env.AUTH_SERVER_REGISTER_URL as string, user);
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return response.data as User;
        } catch (e) {
            logger.error(e);
            return null;
        }
    }

    public async login(userdata: IUserPayload): Promise<User | null> {
        if (userdata.password === undefined && (userdata.jwt === undefined && userdata.refreshToken === undefined)) {
            return null;
        }
        try {
            const response = await this.post<IUserPayload>(process.env.AUTH_SERVER_LOGIN_URL as string, userdata);
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return response.data as User;
        } catch (e){
            logger.error(e);
            return null;
        }
    }
}