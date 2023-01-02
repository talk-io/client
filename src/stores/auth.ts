import {defineStore} from "pinia";
import {computed, reactive, ref} from "vue";
import type {User} from "@/types/auth";
import {service} from "@/utils/service";
import {Auth} from "@/constants/apiRoutes";
import {useRouter} from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
    const state = reactive<{
        user: Partial<User>,
        token: string | null,
        isLoggedIn: boolean | null,
    }>({
        user: {},
        token: null,
        isLoggedIn: null,
    });

    const loading = ref(false);

    const getToken = computed(() => state.token);
    const getState = computed(() => state);

    const setUser = (user: Partial<User>) => state.user = user;
    const setToken = (token: string) => {
        state.token = token;
        localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
    };

    const resetState = () => {
        state.user = {};
        state.token = null;
        state.isLoggedIn = null;
        localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    }

    const init = async () => {
        const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
        if (token) {
            state.token = token;
            state.isLoggedIn = true;
        }
        state.user = await service.get<never, User>(Auth.me);
    }

    return {
        getToken,
        getState,

        init,
        setUser,
        setToken,
        resetState,
    }
})