import AxiosController, { AxiosControllerOptions } from "../AxiosController.ts";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import ResponseError from "@/axios/ResponseError.ts";
import {IUserDataPayload, UserData} from "@/domain/entities";

export default class UserDataController extends AxiosController {

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getUserData(config?: AxiosRequestConfig): Promise<UserData | ResponseError> {
        try {
            const response = await this.get<IUserDataPayload>(
                import.meta.env.BACK_SERVER_USER_DATA_URL as string, config);


            return response.data as unknown as UserData;
        } catch (e: any){
            return new ResponseError(e.status, e.stack);
        }
    }

    public async saveUserData(data: UserData, config?: AxiosRequestConfig): Promise<AxiosResponse | ResponseError> {
        try {
            const response = await this.post(
                import.meta.env.BACK_SERVER_USER_DATA_URL as string, data, config);
            return response.data;
        } catch (e: any){
            return new ResponseError(e.status, e.stack);
        }
    }

}