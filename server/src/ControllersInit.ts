import UserAuth from './Controllers/UserAuthController.js';

const userAuthInstance = new UserAuth({
    //@ts-ignore
    baseURL: process.env.VITE_NODE_SERVER_URL,
    contentType: 'application/json',
});

export default userAuthInstance;
