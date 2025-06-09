import {Entity, IEntity} from "./Entity";
import {ECurrency} from "../enums";

export interface IUnprocessedGame extends IEntity{
    vendorsName: string;
    steamName: string;
    steamId: number;
    vendorsUrl?: string;
    vendorsId?: string;
    currency?: ECurrency;
    price?: number;
}

export class UnprocessedGame extends Entity implements IUnprocessedGame {
    public vendorsName: string;
    public vendorsUrl?: string;
    public vendorsId?: string;
    public currency?: ECurrency;
    public price?: number;
    public steamName: string;
    public steamId: number;

    constructor(data: IUnprocessedGame) {
        super(data);
        this.vendorsName = data.vendorsName;
        this.vendorsUrl = data.vendorsUrl;
        this.vendorsId = data.vendorsId;
        this.currency = data.currency;
        this.price = data.price;
        this.steamName = data.steamName;
        this.steamId = data.steamId;
    }
}