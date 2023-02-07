import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { service } from "@/utils/service";
import { Auth } from "@/constants/apiRoutes";
import type { BasicUser, LoginResponse, User } from "@/types/auth";
import { io } from "socket.io-client";
import { useGatewayStore } from "@/stores/gateway";
import { useGuildStore } from "@/stores/guilds";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("authStore", () => {
  const guildsStore = useGuildStore();
  const router = useRouter();

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
    setLoading(false);
    return false;
  };
  const init = async (newToken?: string) => {
    setLoading(true);
    try {
      const token = newToken || getToken.value;
      if (!token) return resetState();

      const socket = io(import.meta.env.VITE_GATEWAY_HOST, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // socket.io.on("close", (wee) => {
      //   console.log({wee});
      //   // resetState();
      //   // router.push({ name: "login" });
      //   // setLoading(false);
      // });

      socket.on("connect_error", async (err) => {
        if (err.message === "Unauthorized") {
          resetState();
          await router.push({ name: "login" });
          setLoading(false);
        }
      });

      socket.once("init", (data: User) => {
        const { guilds } = data;
        guildsStore.setGuilds(guilds);

        setToken(token);
        setUser(data);
        setIsLoggedIn(true);
        setLoading(false);
        socket.removeListener("connect_error");
      });

      const gatewayStore = useGatewayStore();
      gatewayStore.setSocket(socket);
      gatewayStore.addListeners();

      // state.user = await service.get<never, User>(Auth.me);
    } catch (e) {
      console.log(e);
      resetState();
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
