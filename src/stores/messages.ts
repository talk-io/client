import { defineStore } from "pinia";
import { ref } from "vue";
import type { AuthorWithMessages, Message } from "@/types/auth";
import { Message as MessageService } from "@/constants/apiRoutes";
import { useAuthStore } from "@/stores/auth";
import { service } from "@/utils/service";
import { nanoid } from "nanoid";

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref<Map<string, Array<Message>>>(new Map());
  const authStore = useAuthStore();

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

    console.log({ payload });

    const userID = authStore.getState.user?._id;
    if (userID === payload.authorID) return;
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
    };

    // addMessage(<Message>loadingMsg.value);
    channelMessages.unshift(<Message>loadingMsg);

    try {
      const message = await service.post<never, Message>(
        MessageService.SEND(payload.channelID),
        payload,
      );

      const idx = channelMessages.findIndex(
        (msg) => msg._id === loadingMsg._id,
      );
      channelMessages.splice(idx, 1, message);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getMessages,

    addEmittedMessage,
    createMessage,
  };
});
