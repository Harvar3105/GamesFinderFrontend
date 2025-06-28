import {AxiosController, AxiosControllerOptions} from "./AxiosController.js";
import logger from '../logger.js';
import * as process from "node:process";
import {IUserDataPayload, UserData} from "@shared/entities";
import ResponseError from "../Helpers/ResponseError";
import {AxiosRequestConfig, AxiosResponse} from "axios";

export default class UserDataController extends AxiosController {

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getUserData(config?: AxiosRequestConfig): Promise<UserData | ResponseError> {
        try {
            const response = await this.get<IUserDataPayload>(
                process.env.BACK_SERVER_USER_DATA_URL as string, config);


            return {
                id: response.data.id,
                userId: response.data.userId,
                createdAt: response.data.createdAt,
                updatedAt: response.data.updatedAt,
                avatarName: response.data.avatarName,
                avatarContent: response.data.avatarContent,
                avatarType: response.data.avatarType,
                wishlist: response.data.usersWishlist
            } as UserData;
        } catch (e: any){
            logger.error(`User data get request: ${e.status}\n${e.message}\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async saveUserData(data: any, config?: AxiosRequestConfig): Promise<AxiosResponse | ResponseError> {
        try {
            logger.info(`Sending user data ${data.userId}\n${data.usersWishlist}\n${data.avatarFileName}\n${data.avatarContent}\n${data.avatarFileType}\n\tconfig: ${JSON.stringify(config)}`);

            logger.info(`Outgoing request body: ${JSON.stringify(data, null, 2)}`);
            logger.info(`Outgoing request headers: ${JSON.stringify(config?.headers ?? {}, null, 2)}`);

            const response = await this.post(
                process.env.BACK_SERVER_USER_DATA_URL as string, data, config);
            return response.data;
        } catch (e: any){
            logger.error(`User data save request: ${e.status}\n${e.message}\n`);
            return new ResponseError(e.status, e.stack);
        }
    }
}