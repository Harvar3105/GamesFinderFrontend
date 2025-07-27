import {readFileAsBase64} from "../helpers";
import {Entity, IEntity} from "./Entity.ts";

export interface IUser extends IEntity {
    username: string,
    firstName: string,
    lastName: string,
    roles: string[],
    password?: string | null,
    email?: string | null,
    jwt?: string | null,
    refreshToken?: string | null,
    data?: IUserData | null,
}

export interface IUserData extends IEntity{
    id: string | null
    userId: string
    wishlist: number[]
    avatarName?: string | null
    avatarContent?: string | null
    avatarType?: string | null
}

export interface IUserPayload extends Partial<Omit<IUser, 'data'>> {}
export interface IUserDataPayload extends Partial<Omit<IUserData, 'wishlist'>> {
    usersWishlist: number[] | null;
}

export class User extends Entity implements IUser{
    public username: string;
    public firstName: string;
    public lastName: string;
    public roles: string[];
    public password?: string | null;
    public email?: string | null;
    public jwt?: string | null;
    public refreshToken?: string | null;
    public data?: IUserData | null;

    constructor(data: IUser) {
        super(data);
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.updatedAt = data.updatedAt;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.roles = data.roles;
        this.password = data.password;
        this.email = data.email;
        this.jwt = data.jwt;
        this.refreshToken = data.refreshToken;
        this.data = data.data;
    }

    public dropPassword(): void {
        this.password = undefined;
    }
}

export class UserData extends Entity implements IUserData{
    public userId: string;
    public wishlist: number[];
    public avatarName?: string | null
    public avatarContent?: string | null
    public avatarType?: string | null

    constructor(data: IUserData) {
        super(data);
        this.userId = data.userId;
        this.id = data.id;
        this.wishlist = data.wishlist;
        this.avatarName = data.avatarName;
        this.avatarContent = data.avatarContent;
        this.avatarType = data.avatarType;
    }

    public async trySetFile(file: File): Promise<boolean> {
        try {
            const [fileName, fileType] = file.name.split('.');
            const content = await readFileAsBase64(file);

            this.avatarName = fileName;
            this.avatarContent = content;
            this.avatarType = fileType;
            return true;
        } catch (error) {
            return false;
        }
    }
}
