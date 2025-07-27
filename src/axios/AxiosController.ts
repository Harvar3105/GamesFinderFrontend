import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults} from 'axios'
import {useUserStore} from "@/store/user-store.ts";

export interface AxiosControllerOptions {
    baseURL: string
    timeout?: number
    contentType?: string
    headers?: Record<string, string>
}

export default class AxiosController {
    protected readonly baseURL: string
    protected readonly instance: AxiosInstance
    private userStore: ReturnType<typeof useUserStore> | null = null;

    constructor({
                    baseURL,
                    timeout = 0,
                    contentType = 'application/json',
                    headers = {}
                }: AxiosControllerOptions) {
        this.instance = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': contentType,
                ...headers
            }
        });
        this.baseURL = baseURL;
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

    public async updateTokens(jwt: string, rt: string): Promise<boolean> {
        try {
            const response = await this.post<{jwt: string, rt: string}>(import.meta.env.AUTH_SERVER_UPDATE_TOKENS, {jwt, rt});
            if (response.status !== 200) return false;
            this.userStore!.setUserTokens(response.data.jwt, response.data.rt)

            return true;
        } catch (error: any) {
            return false;
        }
    }

    protected async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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

    protected async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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

    protected async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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

    protected async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
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
}