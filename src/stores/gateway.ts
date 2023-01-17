import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { Socket } from "socket.io-client";
import { Events } from "@/types/events";
import type { Message, User } from "@/types/auth";
import { useGuildStore } from "@/stores/guilds";
import { useAuthStore } from "@/stores/auth";
import { io } from "socket.io-client";
import { useMessagesStore } from "@/stores/messages";

const {
  GuildUserEvents,
  GuildEvents,
  ChannelEvents,
  MessageEvents,
  UserEvents,
} = Events;

export const useGatewayStore = defineStore("gatewayStore", () => {
  const guildsStore = useGuildStore();
  const authStore = useAuthStore();
  const messagesStore = useMessagesStore();

  const state = reactive<{
    socket: Socket;
    userSockets: Record<string, string>;
  }>({
    socket: io(import.meta.env.VITE_GATEWAY_HOST, {
      extraHeaders: { authorization: `Bearer ${authStore.getToken}` },
    }),
    userSockets: {},
  });

  const getSocket = computed(() => state.socket);
  const getUserSockets = computed(() => state.userSockets);

  const setSocket = (socket: Socket) => (state.socket = socket);
  const addUserSocket = (userID: string, clientID: string) =>
    (state.userSockets[userID] = clientID);
  const removeUserSocket = (userID: string) => delete state.userSockets[userID];
  const getUserSocket = (userID: string) => state.userSockets[userID];

  state.socket.once("init", (data: User) => {
    const { guilds } = data;
    guildsStore.setGuilds(guilds);
    authStore.setUser(data);
  });

  const { MESSAGE_CREATED, MESSAGE_UPDATED, MESSAGE_DELETED, GET_MESSAGES } =
    MessageEvents;
  state.socket.on(MESSAGE_CREATED, messagesStore.addEmittedMessage);

  return {
    getSocket,
    getUserSockets,
    setSocket,
    addUserSocket,
    removeUserSocket,
    getUserSocket,
  };
});
