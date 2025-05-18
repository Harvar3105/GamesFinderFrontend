import {readFileAsBase64} from "../helpers/ReadFileAsBase64";

export interface IUser {
    id: string;
    username: string,
    firstName: string,
    lastName: string,
    roles: string[],
    password?: string | null,
    email?: string | null,
    jwt?: string | null,
    refreshToken?: string | null,
}

export interface IUserData {
    id: string
    wishlist: string[]
    avatarName?: string | null
    avatarContent?: string | null
    avatarType?: string | null
}

export interface IUserPayload extends Partial<Omit<IUser, 'data'>> {}
export interface IUserDataPayload extends Partial<IUserData> {}

export class User implements IUser{
    public id: string;
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
        this.id = data.id;
        this.username = data.username;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.roles = data.roles;
        this.password = data.password;
        this.email = data.email;
        this.jwt = data.jwt;
        this.refreshToken = data.refreshToken;
    }

    public dropPassword(): void {
        this.password = undefined;
    }
}

export class UserData implements IUserData{
    public id: string;
    public wishlist: string[];
    public avatarName?: string | null
    public avatarContent?: string | null
    public avatarType?: string | null

    constructor(data: IUserData) {
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
