import {AxiosController, AxiosControllerOptions} from "./AxiosController";
import logger from '../logger.js';
import * as process from "node:process";
import {IUserDataPayload, UserData} from "@shared/entities/User.js";

export default class UserDataController extends AxiosController {

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getUserData(jwt: string): Promise<UserData | null> {
        try {
            const response = await this.get<IUserDataPayload>(
                process.env.BACK_SERVER_USER_DATA_URL as string,
                {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                }
            );
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return response.data as UserData;
        } catch (error){
            logger.error(error);
            return null;
        }
    }

    public async saveUserData(data: IUserDataPayload, jwt: string): Promise<boolean | null> {
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
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return true;
        } catch (error){
            logger.error(error);
            return null;
        }
    }
}