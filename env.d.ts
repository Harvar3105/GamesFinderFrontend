interface ImportMetaEnv {
    readonly VITE_PORT: string;

    readonly VITE_AUTH_SERVER_URL: string;
    readonly VITE_AUTH_SERVER_LOGIN_URL: string;
    readonly VITE_AUTH_SERVER_REGISTER_URL: string;
    readonly VITE_AUTH_SERVER_UPDATE_TOKENS: string;
    readonly VITE_AUTH_SERVER_VALIDATE_TOKENS: string;

    readonly VITE_BACK_SERVER_URL: string;
    readonly VITE_BACK_SERVER_USER_DATA_URL: string;
    readonly VITE_BACK_SERVER_STEAM_CRAWLER: string;

    readonly VITE_BACK_SERVER_GET_ALL_GAMES: string;
    readonly VITE_BACK_SERVER_GET_PAGED_GAMES: string;
    readonly VITE_BACK_SERVER_GAT_PAGED_WITH_FILTERS: string;
    readonly VITE_BACK_SERVER_CHECK_EXISTS_MANY_BY_STEAM_IDS: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
    interface ProcessEnv extends Partial<Record<keyof ImportMetaEnv, string>> {}
}