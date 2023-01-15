import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import type { Socket } from "socket.io-client";

export const useGatewayStore = defineStore("gatewayStore", () => {
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

  const resetState = () => {
    state.socket = null;
    state.userSockets = {};
  };

  return {
    getSocket,
    getUserSockets,
    setSocket,
    addUserSocket,
    removeUserSocket,
    getUserSocket,
    resetState,
  };
});