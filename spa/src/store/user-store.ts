import { defineStore } from 'pinia'
import {IUser, IUserPayload, User} from "@shared/entities/User.ts";
import axios from "axios";
import {controller} from "@/axios/BackendController.ts";

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

        isAuthenticated(): boolean {
            return !!this.user;
        },

        setUser(userData: IUserPayload) {
            if (this.user){
                this.user.username = userData.username ?? this.user.username;
                this.user.firstName = userData.firstName ?? this.user.firstName;
                this.user.lastName = userData.lastName ?? this.user.lastName;
                this.user.email = userData.email ?? this.user.email;
                this.user.password = userData.password ?? this.user.password;
                this.user.jwt = userData.jwt ?? this.user.jwt;
                this.user.refreshToken = userData.refreshToken ?? this.user.refreshToken;
            } else {
                this.user = new User(userData as IUser);
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
