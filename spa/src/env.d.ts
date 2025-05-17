interface ImportMetaEnv {
    readonly VITE_PORT: string;
    readonly SERVER_PORT: string;

    readonly AUTH_SERVER_URL: string;
    readonly AUTH_SERVER_LOGIN_URL: string;
    readonly AUTH_SERVER_REGISTER_URL: string;
    readonly VITE_NODE_SERVER_URL: string;
    readonly VITE_NODE_SERVER_REGISTER_PATH: string;
    readonly VITE_NODE_SERVER_LOGIN_PATH: string;

}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}