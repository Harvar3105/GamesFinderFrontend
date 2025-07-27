import { Game, IGame } from "@/domain/entities";
import GamesFilters from "@/domain/params/gamesFilters.ts";
import AxiosController, {AxiosControllerOptions} from "@/axios/AxiosController.ts";

export default class BackendController extends AxiosController{

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async getAllGamesWithOffers(): Promise<IGame[] | null> {
        try {
            const response = await this.get<IGame[]>(import.meta.env.BACK_SERVER_GET_ALL_GAMES);

            return response.data as Game[];
        } catch (error) {
            return null;
        }
    }

    public async getGamesWithOffersPaged(page: number, pageSize: number, filters?: GamesFilters): Promise<GamesPagedResult | null> {
        try {
            const response = await this.post<GamesPagedResult>
            (import.meta.env.BACK_SERVER_GET_PAGED_GAMES, {page: page, pageSize: pageSize, filters: filters});

            return response.data as GamesPagedResult;
        } catch (error) {
            return null;
        }
    }

    public async crawlSteam(gamesIds: number[], forceUpdate: boolean): Promise<string> {
        try {
            const response = await this.post(import.meta.env.BACK_SERVER_STEAM_CRAWLER, {gamesIds, forceUpdate});

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