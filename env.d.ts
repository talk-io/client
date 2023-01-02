/// <reference types="vite/client" />
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            VITE_BACKEND_HOST: string;
        }
    }
}