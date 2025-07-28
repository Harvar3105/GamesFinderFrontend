import ResponseError from "@/axios/ResponseError.ts";
import {IUser, IUserPayload, User} from "@/domain/entities";
import AxiosController, {AxiosControllerOptions} from "@/axios/AxiosController.ts";

export default class AuthController extends AxiosController{

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async doLogin(userdata: IUserPayload): Promise<IUser | ResponseError> {
        if (userdata.password === undefined && (userdata.jwt === undefined && userdata.refreshToken === undefined)) {
            return new ResponseError(500, `Missing user data!`);
        }

        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_AUTH_SERVER_LOGIN_URL, {
                password: userdata.password,
                email: userdata.email,
            })

            return response.data as User;
        } catch (error: any) {
            return new ResponseError(500, error.stack);
        }
    }

    public async doRegister(user: IUserPayload): Promise<IUser | ResponseError> {
        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_AUTH_SERVER_REGISTER_URL, {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password
            })

            return response.data as User;
        } catch (error: any) {
            return new ResponseError(500, error.stack);
        }
    }

    public async doLoginInitial(jwt: string, rt: string): Promise<IUser | ResponseError> {
        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_AUTH_SERVER_LOGIN_URL, {
                jwt, rt
            })
            return response.data as User;
        } catch (error: any) {
            return new ResponseError(500, error.stack);
        }
    }
}