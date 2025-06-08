import {Entity, IEntity} from "./Entity";
import {GameOffer} from "./GameOffer";
import {EVendor} from "../enums";

export interface IGame extends IEntity {
    name: string;
    simplifiedName: string;
    steamUrl: string;
    GameIds: GameId[];
    description: string;
    headerImage: string;
    offers: GameOffer[];
}

export class Game extends Entity implements IGame {
    public GameIds: GameId[];
    public description: string;
    public headerImage: string;
    public name: string;
    public offers: GameOffer[];
    public simplifiedName: string;
    public steamUrl: string;

    constructor(data: IGame) {
        super(data);
        this.name = data.name;
        this.simplifiedName = data.simplifiedName;
        this.steamUrl = data.steamUrl;
        this.description = data.description;
        this.headerImage = data.headerImage;
        this.GameIds = data.GameIds;
        this.offers = data.offers;
    }
}

export class GameId {
    public id: string;
    public vendor: EVendor;

    constructor(id: string, vendor: EVendor) {
        this.id = id;
        this.vendor = vendor;
    }
}