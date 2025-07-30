import AxiosController, {AxiosControllerOptions} from "@/axios/AxiosController.ts";
import ResponseError from "@/axios/ResponseError.ts";

export default class SteamController extends AxiosController {

    constructor(config: AxiosControllerOptions) {
        super(config);
    }

    public async updateSteamJson(): Promise<void | ResponseError> {
        try {
            const response = await this.post(import.meta.env.VITE_BACK_SERVER_STEAM_JSON_UPDATE);
        } catch (error: any) {
            return new ResponseError(500, error.stack);
        }
    }

    public async getSteamJsonMetadata(): Promise<{lastMod: Date, contentCount: number} | ResponseError>{
        try {
            const response = await this.get(import.meta.env.VITE_BACK_SERVER_STEAM_JSON_METADATA);

            return {lastMod: new Date(response.data.lastMod), contentCount: response.data.contentCount};
        } catch (error: any) {
            return new ResponseError(500, error.stack);
        }
    }

    public async crawlSteam(gamesIds: number[], forceUpdate: boolean): Promise<string> {
        try {
            const response = await this.post(import.meta.env.VITE_BACK_SERVER_STEAM_CRAWLER, {gamesIds, forceUpdate});

            return response.data as string;
        } catch (error: any) {
            return "ERROR OCCURED!"
        }
    }
}