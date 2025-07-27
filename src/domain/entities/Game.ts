import {Entity, IEntity} from "./Entity.ts";
import {GameOffer} from "./GameOffer.ts";
import {EType, EVendor} from "../enums";

export interface IGame extends IEntity {
    name: string;
    simplifiedName: string;
    steamUrl?: string;
    GameIds: GameId[];
    inPackages: number[];
    type: EType;
    description?: string;
    headerImage?: string;
    offers: GameOffer[];
}

export class Game extends Entity implements IGame {
    public GameIds: GameId[];
    public inPackages: number[];
    public type: EType;
    public description?: string;
    public headerImage?: string;
    public name: string;
    public offers: GameOffer[];
    public simplifiedName: string;
    public steamUrl?: string;

    constructor(data: IGame) {
        super(data);
        this.name = data.name;
        this.simplifiedName = data.simplifiedName;
        this.steamUrl = data.steamUrl;
        this.description = data.description;
        this.headerImage = data.headerImage;
        this.GameIds = data.GameIds;
        this.inPackages = data.inPackages;
        this.type = data.type;
        this.offers = data.offers;
    }
}

export class GameId {
    public id: string;
    public vendor: EVendor;
    public realId: string;

    constructor(id: string, vendor: EVendor, realId: string) {
        this.id = id;
        this.vendor = vendor;
        this.realId = realId;
    }
}