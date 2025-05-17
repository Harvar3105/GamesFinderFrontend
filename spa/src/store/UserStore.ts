import { defineStore } from 'pinia'
import {IUser, IUserPayload, User} from "@shared/entities/User.ts";
import axios from "axios";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null
    }),

    actions: {
        async init(): Promise<void>  {
            const jwt = localStorage.getItem('jwt');
            if (jwt && await this.tryLogin({ jwt })) return;

            const rt = localStorage.getItem('rt');
            if (rt && await this.tryLogin({ rt })) return;

            console.warn('No valid token found');
        },

        async tryLogin (data: any) {
            try {
                const result = await axios.post(
                    import.meta.env.VITE_NODE_SERVER_URL + import.meta.env.VITE_NODE_SERVER_LOGIN_PATH,
                    data
                );
                this.setUser(result.data)
                return true;
            } catch (error) {
                return false;
            }
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
