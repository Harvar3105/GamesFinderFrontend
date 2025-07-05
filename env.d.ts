interface ImportMetaEnv {
    readonly VITE_PORT: string;
    readonly SERVER_PORT: string;

    readonly AUTH_SERVER_URL: string;
    readonly AUTH_SERVER_LOGIN_URL: string;
    readonly AUTH_SERVER_REGISTER_URL: string;
    readonly AUTH_SERVER_UPDATE_TOKENS: string;
    readonly AUTH_SERVER_VALIDATE_TOKENS: string;

    readonly VITE_NODE_SERVER_URL: string;
    readonly VITE_NODE_SERVER_REGISTER_PATH: string;
    readonly VITE_NODE_SERVER_LOGIN_PATH: string;
    readonly VITE_NODE_SERVER_UPDATE_TOKENS: string;
    readonly VITE_NODE_SERVER_VALIDATE_TOKENS: string;

    readonly VITE_NODE_SERVER_USERDATA_GET: string;
    readonly VITE_NODE_SERVER_USERDATA_SAVE: string;

    readonly VITE_NODE_SERVER_GAMES_GET_ALL: string;
    readonly VITE_NODE_SERVER_GAMES_GET_PAGED: string;
    readonly VITE_NODE_SERVER_GAMES_CHECK_BY_STEAM_IDS: string;

    readonly VITE_NODE_SERVER_CRAWL_STEAM: string;

    readonly BACK_SERVER_URL: string;
    readonly BACK_SERVER_USER_DATA_URL: string;
    readonly BACK_SERVER_STEAM_CRAWLER: string;

    readonly BACK_SERVER_GET_ALL_GAMES: string;
    readonly BACK_SERVER_GET_PAGED_GAMES: string;
    readonly BACK_SERVER_CHECK_EXISTS_MANY_BY_STEAM_IDS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
    interface ProcessEnv extends Partial<Record<keyof ImportMetaEnv, string>> {}
}