import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { service } from "@/utils/service";
import { Auth } from "@/constants/apiRoutes";
import type { BasicUser, LoginResponse, User } from "@/types/auth";
import { io } from "socket.io-client";
import { useGatewayStore } from "@/stores/gateway";
import { useGuildStore } from "@/stores/guilds";
import { useChannelsStore } from "@/stores/channels";

export const useAuthStore = defineStore("authStore", () => {
  const state = reactive<{
    user: Partial<BasicUser>;
    token: string | null;
    isLoggedIn: boolean | null;
    loading: boolean;
  }>({
    user: {},
    token: localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || null,
    isLoggedIn: null,
    loading: true,
  });

  const getToken = computed(() => state.token);
  const getState = computed(() => state);
  const getIsLoggedIn = computed(() => state.isLoggedIn);
  const getLoading = computed(() => state.loading);

  const setUser = (user: Partial<User>) => (state.user = user);
  const setToken = (token: string) => {
    state.token = token;
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
  };
  const setIsLoggedIn = (isLoggedIn: boolean) =>
    (state.isLoggedIn = isLoggedIn);
  const setLoading = (loading: boolean) => (state.loading = loading);

  const resetState = () => {
    state.user = {};
    state.token = null;
    state.isLoggedIn = null;
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    return false;
  };
  const init = async (newToken?: string) => {
    setLoading(true);
    try {
      const token = newToken || getToken.value;
      if (!token) return resetState();

      setToken(token);
      setIsLoggedIn(true);

      const socket = io(import.meta.env.VITE_GATEWAY_HOST, {
        extraHeaders: { authorization: `Bearer ${token}` },
      });

      const gatewayStore = useGatewayStore();
      gatewayStore.setSocket(socket);

      socket.once("init", (data: User) => {
        const guildsStore = useGuildStore();

        const { guilds } = data;
        guildsStore.setGuilds(guilds);

        setUser(data);
      });

      // state.user = await service.get<never, User>(Auth.me);
    } catch (e) {
      console.log(e);
      resetState();
    } finally {
      setLoading(false);
    }
  };
  const login = async (email: string, password: string) => {
    try {
      const user = await service.post<never, LoginResponse>(Auth.login, {
        email,
        password,
      });
      setToken(user.token);
      setUser(user);
      setIsLoggedIn(true);
    } catch (e) {
      resetState();
      console.log(e);
    }
  };

  return {
    getToken,
    getState,
    getIsLoggedIn,
    getLoading,

    init,
    login,
    setUser,
    setToken,
    resetState,
    setLoading,
    setIsLoggedIn,
  };
});
