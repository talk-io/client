import { defineStore } from "pinia";
import { ref } from "vue";
import type { Message } from "@/types/auth";
import { Message as MessageService } from "@/constants/apiRoutes";
import { useAuthStore } from "@/stores/auth";
import { service } from "@/utils/service";
import { nanoid } from "nanoid";
import { useGatewayStore } from "@/stores/gateway";
import { Events } from "@/types/events";
import dayjs from "dayjs";

const { MESSAGE_CREATED } = Events.MessageEvents;

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref<Map<string, Array<Message>>>(new Map());
  const authStore = useAuthStore();
  const gatewayStore = useGatewayStore();

  const _fetchMessages = async (channelID: string) => {
    const fetchedMessages = await MessageService.GET(channelID);
    // const modifiedMessages = _combineMessages(fetchedMessages);
    messages.value.set(channelID, fetchedMessages);
  };

  const getMessages = async (channelID: string) => {
    if (
      !messages.value.has(channelID) ||
      messages.value.get(channelID)?.length === 0
    )
      await _fetchMessages(channelID);

    return messages.value.get(channelID) || [];
  };

  const addEmittedMessage = (payload: Message) => {
    const channelMessages = messages.value.get(payload.channelID);
    if (!channelMessages) return;

    channelMessages.unshift(payload);
  };

  const createMessage = async (payload: {
    content: string;
    channelID: string;
  }) => {
    const channelMessages = messages.value.get(payload.channelID);
    if (!channelMessages) return;

    const user = authStore.getState.user;

    const loadingMsg = {
      _id: nanoid(),
      content: payload.content,
      author: user,
      createdAt: dayjs().toISOString(),
    };

    channelMessages.unshift(<Message>loadingMsg);

    try {
      const message = await service.post<never, Message>(
        MessageService.SEND(payload.channelID),
        payload,
      );

      emitMessage(message);

      const idx = channelMessages.findIndex(
        (msg) => msg._id === loadingMsg._id,
      );
      channelMessages.splice(idx, 1, message);
    } catch (error) {
      console.log(error);
    }
  };

  const emitMessage = (payload: Message) =>
    gatewayStore.getSocket?.emit(MESSAGE_CREATED, payload);

  return {
    getMessages,

    createMessage,

    addEmittedMessage,
    emitMessage,
  };
});
