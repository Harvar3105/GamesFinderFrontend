import {AxiosController, AxiosControllerOptions} from "./AxiosController.js";
import logger from '../logger.js';
import {Game} from "@shared/entities";
import * as process from "node:process";
import {AxiosRequestConfig} from "axios";
import ResponseError from "../Helpers/ResponseError";
import GamesFilters from "@shared/params/gamesFilters";

export default class GamesController extends AxiosController{
    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getAllGames(config?: AxiosRequestConfig): Promise<Game[] | ResponseError> {
        try {
            const response = await this.get<Game[]>(process.env.BACK_SERVER_GET_ALL_GAMES as string, config);

            return response.data as Game[];
        } catch (e: any){
            logger.error(`Get all games request: ${e.status}\n${e.message}\n\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async getGamesPaged(data: {page: number, pageSize: number}, config?: AxiosRequestConfig): Promise<Game[] | ResponseError> {
        try {
            const response = await this.get<Game[]>((process.env.BACK_SERVER_GET_PAGED_GAMES as string) + `?page=${data.page}&pageSize=${data.pageSize}`, config);

            return response.data as Game[];
        } catch (e: any){
            logger.error(`Get games paged: ${e.status}\n${e.message}\n\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async getGamesPagedWithFilters(data: {page: number, pageSize: number, filters: GamesFilters}, config?: AxiosRequestConfig): Promise<Game[] | ResponseError> {
        try {
            const response = await this.post<Game[]>(process.env.BACK_SERVER_GAT_PAGED_WITH_FILTERS as string, data, config);

            return response.data as Game[];
        } catch (e: any){
            logger.error(`Get games paged with filters: ${e.status}\n${e.message}\n\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async crawlSteam(data: {gamesIds: number[], forceUpdate: boolean}, config?: AxiosRequestConfig): Promise<string | ResponseError> {
        try {
            const response = await this.post<string>(process.env.BACK_SERVER_STEAM_CRAWLER as string, data, config);

            return response.data as string;
        } catch (e: any){
            logger.error(`Post games crawl steam: ${e.status}\n${e.message}\n\n`);
            return new ResponseError(e.status, e.stack);
        }
    }

    public async checkExistManyBySteamIds(data: string[], config?: AxiosRequestConfig): Promise<string[] | ResponseError> {
        try {
            const response = await this.post<string[]>(process.env.BACK_SERVER_CHECK_EXISTS_MANY_BY_STEAM_IDS as string, data, config);

            return response.data as string[];
        } catch (e: any){
            logger.error(`Post games exists many by steam ids: ${e.status}\n${e.message}\n\n`);
            return new ResponseError(e.status, e.stack);
        }
    }
}