import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {IUser, IUserDataPayload, IUserPayload, User, UserData} from "@shared/entities/User.ts";
import {Game, IGame} from "@shared/entities";
import {useUserStore} from "@/store/user-store.ts";
import GamesFilters from "@shared/params/gamesFilters.ts";

class BackendController {
    private readonly instance: AxiosInstance;
    private userStore: ReturnType<typeof useUserStore> | null = null;

    constructor() {
        const url = import.meta.env.VITE_NODE_SERVER_URL;
        this.instance = axios.create({
            baseURL: url,
            timeout: 0,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    private getUserStore() {
        if (!this.userStore) {
            this.userStore = useUserStore();
        }
        return this.userStore;
    }

    private addHeaders(config?: AxiosRequestConfig){
        if (!this.userStore?.user){
            this.getUserStore();
        }

        if (!config){
            config = {}
        }

        if (config.headers) {
            config.headers["Authorization"] = `Bearer ${this.userStore!.user?.jwt}`;
        } else {
            config = {headers: {
                    'Authorization': `Bearer ${this.userStore!.user?.jwt}`
                }};
        }
        return config;
    }

    private async prepareRetry(){
        if (!this.userStore?.user){
            this.getUserStore();
        }

        const jwt = this.userStore!.user?.jwt;
        const rt = this.userStore!.user?.refreshToken;
        if (!jwt || !rt) return;
        await this.updateTokens(jwt, rt);
    }

    private async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            config = this.addHeaders(config);
            return await this.instance.get<T>(url, config);
        } catch (e: any){
            if (e.response?.status === 401){
                await this.prepareRetry();
                config = this.addHeaders(config);
                return await this.instance.get<T>(url, config);
            }
            throw e;
        }
    }

    private async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            config = this.addHeaders(config);
            return await this.instance.post<T>(url, data, config);
        } catch (e: any){
            if (e.response?.status === 401){
                await this.prepareRetry();
                config = this.addHeaders(config);
                return await this.instance.post<T>(url, data, config);
            }
            throw e;
        }
    }

    private async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            config = this.addHeaders(config);
            return await this.instance.put<T>(url, data, config);
        } catch (e: any){
            if (e.response?.status === 401){
                await this.prepareRetry();
                config = this.addHeaders(config);
                return await this.instance.put<T>(url, data, config);
            }
            throw e;
        }
    }

    private async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            config = this.addHeaders(config);
            return await this.instance.delete<T>(url, config);
        } catch (e: any){
            if (e.response?.status === 401){
                await this.prepareRetry();
                config = this.addHeaders(config);
                return await this.instance.delete<T>(url, config);
            }
            throw e;
        }
    }

    public async updateTokens(jwt: string, rt: string): Promise<boolean> {
        try {
            const response = await this.post<{jwt: string, rt: string}>(import.meta.env.VITE_NODE_SERVER_UPDATE_TOKENS, {jwt, rt});
            if (response.status !== 200) return false;
            this.userStore!.setUserTokens(response.data.jwt, response.data.rt)

            return true;
        } catch (error) {
            return false;
        }
    }

    public async doLoginInitial(jwt: string, rt: string): Promise<IUser | null> {
        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_NODE_SERVER_LOGIN_PATH, {
                jwt, rt
            })
            return response.data as User;
        } catch (error) {
            return null;
        }
    }

    public async getUserData(): Promise<UserData | null>{
        try {
            const response = await this.get<UserData>(import.meta.env.VITE_NODE_SERVER_USERDATA_GET);

            return response.data as UserData;
        } catch (e) {
            return null;
        }
    }

    public async saveUserData (data: UserData): Promise<boolean> {
        try {
            const response = await this.post(import.meta.env.VITE_NODE_SERVER_USERDATA_SAVE, data);

            if (response.status !== 200) return false;

            return true;
        } catch (error) {
            return false;
        }
    }

    public async doLogin(email: string, password: string): Promise<IUser | null> {
        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_NODE_SERVER_LOGIN_PATH, {
                password: password,
                email: email,
            })

            return response.data as User;
        } catch (error) {
            return null;
        }
    }

    public async doRegister(username: string, email: string, firstName: string, lastName: string, password: string): Promise<IUser | null> {
        try {
            const response = await this.post<IUserPayload>(import.meta.env.VITE_NODE_SERVER_REGISTER_PATH, {
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password
            })

            return response.data as User;
        } catch (error) {
            return null;
        }
    }

    public async getAllGamesWithOffers(): Promise<IGame[] | null> {
        try {
            const response = await this.get<IGame[]>(import.meta.env.VITE_NODE_SERVER_GAMES_GET_ALL);

            return response.data as Game[];
        } catch (error) {
            return null;
        }
    }

    public async getGamesWithOffersPaged(page: number, pageSize: number, filters?: GamesFilters): Promise<GamesPagedResult | null> {
        try {
            const response = await this.post<GamesPagedResult>
            (import.meta.env.VITE_NODE_SERVER_GAMES_GET_PAGED, {page: page, pageSize: pageSize, filters: filters});

            return response.data as GamesPagedResult;
        } catch (error) {
            return null;
        }
    }

    public async crawlSteam(gamesIds: number[], forceUpdate: boolean): Promise<string> {
        try {
            const response = await this.post(import.meta.env.VITE_NODE_SERVER_CRAWL_STEAM, {gamesIds, forceUpdate});

            return response.data as string;
        } catch (error) {
            return "ERROR OCCURED!"
        }
    }
}

export interface GamesPagedResult{
    items: IGame[];
    count: number;
    totalCount: number;
    page: number;
    pageSize: number;
}

export const controller = new BackendController();