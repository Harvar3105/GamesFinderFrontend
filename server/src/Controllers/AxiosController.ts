import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios'

export interface AxiosControllerOptions {
    baseURL: string
    timeout?: number
    contentType?: string
    headers?: Record<string, string>
}

export class AxiosController {
    protected readonly baseURL: string
    protected readonly instance: AxiosInstance

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

    protected async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.get<T>(url, config)
    }

    protected async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.post<T>(url, data, config)
    }

    protected async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.put<T>(url, data, config)
    }

    protected async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        return this.instance.delete<T>(url, config)
    }
}
