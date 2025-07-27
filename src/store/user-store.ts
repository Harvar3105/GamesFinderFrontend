import { defineStore } from 'pinia'
import {controller} from "../axios/BackendController.ts";
import {IUser, User, UserData} from "@/domain/entities";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null,
    }),

    actions: {
        async init(): Promise<void>  {
            console.info("Trying to auth on init...");
            const jwt = localStorage.getItem('jwt');
            const rt = localStorage.getItem('rt');
            if ((jwt || rt) && await this.tryInitialLogin({ jwt: jwt, rt: rt})) return;

            console.warn('No valid token found');
        },

        async tryInitialLogin (data: any) {
            try {
                const result = await controller.doLoginInitial(data.jwt, data.rt);
                if (result) {
                    result.refreshToken = data.rt;
                    this.setUser(result);

                    return true;
                }
            } catch (error) {
                console.error("Could not init user login");
                return false;
            }
        },

        async saveUserData (): Promise<void>  {
            if (!this.user?.data) return;

            try {
                await controller.saveUserData(this.user.data as UserData);
            } catch (error) {
                console.error("Could not save user data");
                return;
            }
        },

        async setUserWithDataSave(userData: User) {
            this.setUser(userData);
            if (userData.data){
                this.user!.data = userData.data;
            }
            await this.saveUserData();
        },

        updateUserData (data: UserData, force: boolean = false) {
            if (!this.user) return;

            if (force || !this.user.data) {
                this.user.data = data;
                return;
            }

            this.user.data.id = data.id;
            this.user.data.updatedAt = data.updatedAt;
            this.user.data.createdAt = data.createdAt;
            this.user.data.avatarContent = data.avatarContent;
            this.user.data.avatarType = data.avatarType;
            this.user.data.avatarName = data.avatarName;
            this.user.data.wishlist = data.wishlist;
            return;
        },

        isAuthenticated(): boolean {
            return !!this.user;
        },

        setUser(userData: IUser | User) {
            if (this.user){
                // this.user.updatedAt = new Date(); //TODO: DateTime from .net to js date and vise versa
                this.user.username = userData.username ?? this.user.username;
                this.user.firstName = userData.firstName ?? this.user.firstName;
                this.user.lastName = userData.lastName ?? this.user.lastName;
                this.user.email = userData.email ?? this.user.email;
                this.user.password = userData.password ?? this.user.password;
                this.user.jwt = userData.jwt ?? this.user.jwt;
                this.user.refreshToken = userData.refreshToken ?? this.user.refreshToken;
                if (userData.data) this.user.data = userData.data;
            } else {
                this.user = new User(userData);
            }

            this.saveUserTokens();
        },

        setUserTokens(jwt: string, rt: string): void {
            if (!this.user) return;
            this.user.jwt = jwt;
            this.user.refreshToken = rt;
            this.saveUserTokens();
        },

        saveUserTokens(){
            if (this.user) {
                if (this.user.jwt) localStorage.setItem('jwt', this.user.jwt);
                if (this.user.refreshToken) localStorage.setItem('rt', this.user.refreshToken);
            }
        },

        dropPassword() {
            this.user?.dropPassword();
        },

        logout() {
            this.user = null
        }
    },
})
