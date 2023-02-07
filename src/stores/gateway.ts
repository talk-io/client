import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { Socket } from "socket.io-client";
import { Events } from "@/types/events";
import { useMessagesStore } from "@/stores/messages";
import { useAuthStore } from "@/stores/auth";

const {
  GuildUserEvents,
  GuildEvents,
  ChannelEvents,
  MessageEvents,
  UserEvents,
} = Events;

export const useGatewayStore = defineStore("gatewayStore", () => {
  const messagesStore = useMessagesStore();
  const authStore = useAuthStore();

  const state = reactive<{
    socket: Socket | null;
    userSockets: Record<string, string>;
  }>({
    socket: null,
    userSockets: {},
  });

  const getSocket = computed(() => state.socket);
  const getUserSockets = computed(() => state.userSockets);

  const setSocket = (socket: Socket) => (state.socket = socket);
  const addUserSocket = (userID: string, clientID: string) =>
    (state.userSockets[userID] = clientID);
  const removeUserSocket = (userID: string) => delete state.userSockets[userID];
  const getUserSocket = (userID: string) => state.userSockets[userID];

  const addListeners = () => {
    if (!state.socket) return;

    state.socket.on("connect_error", () => {
      authStore.setLoading(true);
    });

    state.socket.on("connect", () => {
      authStore.setLoading(false);
    });

    const { MESSAGE_CREATED, MESSAGE_UPDATED, MESSAGE_DELETED, GET_MESSAGES } =
      MessageEvents;
    state.socket.on(MESSAGE_CREATED, messagesStore.addEmittedMessage);
  };

  return {
    getSocket,
    getUserSockets,

    setSocket,
    addUserSocket,
    removeUserSocket,
    getUserSocket,
    addListeners,
  };
});
