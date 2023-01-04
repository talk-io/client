import axios from "axios";
import {useAuthStore} from "@/stores/auth";
import router from "@/router";

export const service = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_HOST,
})

service.interceptors.request.use(
    (config) => {
        const authStore = useAuthStore();

        config.headers = {
            Authorization: `Bearer ${authStore.getToken}`,
            Accept: "application/json",
        };

        return config;
    }, (error) => {
        console.log({error});
    }
)

service.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {

        console.log({error: error.response.data});

        if (error.response.status === 401) {
            const authStore = useAuthStore();
            authStore.resetState();
            return router.push({name: "login"});
        }

        if (error.code === "ERR_BAD_RESPONSE")
            return Promise.reject({message: "Internal Server Error. Please try again later."});
        if (error.code === "ERR_NETWORK")
            return Promise.reject({message: "Connections to the server failed. Check your network connection or try again later."});
        return Promise.reject(error.response?.data);
    }
)