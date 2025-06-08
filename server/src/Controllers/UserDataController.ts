import {AxiosController, AxiosControllerOptions} from "./AxiosController.js";
import logger from '../logger.js';
import * as process from "node:process";
import {IUserDataPayload, UserData} from "@shared/entities/User.js";
import ResponseError from "../Helpers/ResponseError";

export default class UserDataController extends AxiosController {

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getUserData(jwt: string): Promise<UserData | ResponseError> {
        try {
            const response = await this.get<IUserDataPayload>(
                process.env.BACK_SERVER_USER_DATA_URL as string,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );

            return response.data as UserData;
        } catch (e: any){
            logger.error(`User data get request: ${e.status}\n${e.stack}\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async saveUserData(data: IUserDataPayload, jwt: string): Promise<void | ResponseError> {
        try {
            const response = await this.post(
                process.env.BACK_SERVER_USER_DATA_URL as string,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );

        } catch (e: any){
            logger.error(`User data save request: ${e.status}\n${e.stack}\n`);
            return new ResponseError(e.status, e.stack);
        }
    }
}