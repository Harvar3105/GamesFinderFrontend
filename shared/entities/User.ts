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

export interface IUserPayload extends Partial<IUser> {}

export class User {
    public id: string;
    public username: string;
    public firstName: string;
    public lastName: string;
    public roles: string[];
    public password?: string | null;
    public email?: string | null;
    public jwt?: string | null;
    public refreshToken?: string | null;

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

    public dropPassword() {
        this.password = undefined;
    }
}
