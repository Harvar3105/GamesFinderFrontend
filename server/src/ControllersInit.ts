import UserAuth from './Controllers/UserAuthController.js';

const userAuthInstance = new UserAuth({
    //@ts-ignore
    baseURL: process.env.AUTH_SERVER_URL,
    contentType: 'application/json',
});

export default userAuthInstance;
