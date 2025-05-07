import { defineStore } from 'pinia'
import {IUser, IUserPayload, User} from '../../shared/entities/User'

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null as User | null
    }),

    actions: {
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
        },

        dropPassword() {
            this.user?.dropPassword();
        },

        logout() {
            this.user = null
        }
    },
})
