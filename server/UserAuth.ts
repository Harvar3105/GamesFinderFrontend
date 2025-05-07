import {AxiosController, AxiosControllerOptions} from "./AxiosController";
import {IUserPayload, User} from "../shared/entities/User";

export default class UserAuth extends AxiosController{

    constructor(config?: AxiosControllerOptions) {
        super(config);
    }

    public async register(user: IUserPayload): Promise<IUserPayload> {
        try {
            const response = await this.post<IUserPayload>('api/Auth/register', user);
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return response.data as User;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async login(userdata: IUserPayload): Promise<IUserPayload> {
        if (userdata.password === undefined && userdata.jwt === undefined) {
            return null;
        }
        try {
            const response = await this.post<IUserPayload>('api/Auth/login', userdata);
            if (response.status !== 200){
                throw new Error(`Not succeeded, ${response.data}`);
            }

            return response.data as User;
        } catch (e){
            console.error(e);
            return null;
        }
    }
}