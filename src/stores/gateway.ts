import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
} from "@/types/events";
import { Events } from "@/types/events";
import { useMessagesStore } from "@/stores/messages";
import { useAuthStore } from "@/stores/auth";
import { useChannelsStore } from "@/stores/channels";
import { useMembersStore } from "@/stores/members";
import { useUsersStore } from "@/stores/users";

const {
  GuildUserEvents,
  GuildEvents,
  ChannelEvents,
  MessageEvents,
  UserEvents,
} = Events;

export const useGatewayStore = defineStore("gatewayStore", () => {
  const messagesStore = useMessagesStore();
  const channelsStore = useChannelsStore();
  const authStore = useAuthStore();
  const usersStore = useUsersStore();

  const state = reactive<{
    socket: Socket<ServerToClientEvents, ClientToServerEvents> | null;
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
      authStore.setConnectionError(true);
    });

    state.socket.on("connect", () => {
      authStore.setLoading(false);
      authStore.setConnectionError(false);
    });

    const { MESSAGE_CREATED, MESSAGE_UPDATED, MESSAGE_DELETED } = MessageEvents;
    state.socket.on(MESSAGE_CREATED, messagesStore.addEmittedMessage);

    const { USER_TYPING_START, USER_TYPING_END } = ChannelEvents;
    state.socket.on(USER_TYPING_START, channelsStore.setUserTyping);
    state.socket.on(USER_TYPING_END, channelsStore.removeUserTyping);

    const { UPDATE_STATUS } = UserEvents;
    state.socket.on(UPDATE_STATUS, usersStore.setUserStatus);
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
