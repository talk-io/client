import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { service } from "@/utils/service";
import { Auth } from "@/constants/apiRoutes";
import type { BasicUser, LoginResponse, User } from "@/types/auth";
import { io, Socket } from "socket.io-client";
import { useGatewayStore } from "@/stores/gateway";
import { useGuildStore } from "@/stores/guilds";
import { useUsersStore } from "@/stores/users";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/events";
import { Events } from "@/types/events";
import { useMembersStore } from "@/stores/members";

const { UserEvents } = Events;

export const useAuthStore = defineStore("authStore", () => {
  const guildsStore = useGuildStore();
  const usersStore = useUsersStore();
  const membersStore = useMembersStore();

  const state = reactive<{
    user: Partial<BasicUser>;
    token: string | null;
    isLoggedIn: boolean | null;
    loading: boolean;
    connectionError: boolean;
  }>({
    user: {},
    token: localStorage.getItem(import.meta.env.VITE_TOKEN_KEY) || null,
    isLoggedIn: null,
    loading: true,
    connectionError: false,
  });

  const getToken = computed(() => state.token);
  const getState = computed(() => state);
  const getIsLoggedIn = computed(() => state.isLoggedIn);
  const getLoading = computed(() => state.loading);
  const getConnectionError = computed(() => state.connectionError);

  const setUser = (user: Partial<User>) => (state.user = user);
  const setConnectionError = (connectionError: boolean) => {
    state.connectionError = connectionError;
  };
  const setToken = (token: string) => {
    state.token = token;
    localStorage.setItem(import.meta.env.VITE_TOKEN_KEY, token);
  };
  const setIsLoggedIn = (isLoggedIn: boolean) =>
    (state.isLoggedIn = isLoggedIn);
  const setLoading = (loading: boolean) => (state.loading = loading);

  const resetState = (): false => {
    state.user = {};
    state.token = null;
    state.isLoggedIn = null;
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEY);
    setLoading(false);
    return false;
  };
  const init = async (newToken?: string): Promise<boolean> => {
    setLoading(true);
    try {
      const token = newToken || getToken.value;
      if (!token) return resetState();

      const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
        import.meta.env.VITE_GATEWAY_HOST,
        {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
          secure: true,
        },
      );

      socket.io.on("close", async (reason) => {
        if (reason !== "forced close") return;
        resetState();
        setLoading(false);
        return true;
      });

      await new Promise((res) =>
        socket.once(
          UserEvents.INIT,
          ({ user: data, users, guildsWithMembers }) => {
            const { guilds } = data;
            usersStore.setUsers(users);
            guildsStore.setGuilds(guilds);
            membersStore.setMembers(guildsWithMembers);

            setUser(data);
            setToken(token);
            setIsLoggedIn(true);
            res(false);
          },
        ),
      );

      const gatewayStore = useGatewayStore();
      gatewayStore.setSocket(socket);
      gatewayStore.addListeners();

      return false;
    } catch (e) {
      console.log(e);
      resetState();
    }
    return false;
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
    getConnectionError,

    init,
    login,
    setUser,
    setToken,
    resetState,
    setLoading,
    setIsLoggedIn,
    setConnectionError,
  };
});
