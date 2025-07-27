import {Entity, IEntity} from "./Entity.ts";
import {ECurrency, EVendor} from "../enums";

export interface IGameOffer extends IEntity {
    gameId: string;
    vendor: EVendor;
    vendorsUrl: string;
    available: boolean;
    prices: Map<ECurrency, PriceRange>;
}

export class GameOffer extends Entity implements IGameOffer {
    public available: boolean;
    public gameId: string;
    public prices: Map<ECurrency, PriceRange>;
    public vendor: EVendor;
    public vendorsUrl: string;

    constructor(data: IGameOffer) {
        super(data);
        this.available = false;
        this.gameId = data.gameId;
        this.prices = data.prices ?? new Map<ECurrency, PriceRange>();
        this.vendor = data.vendor;
        this.vendorsUrl = data.vendorsUrl;
    }
}

export class PriceRange {
    public initial?: number;
    public current?: number;

    constructor(initial?: number, current?: number) {
        this.initial = initial;
        this.current = current;
    }
}