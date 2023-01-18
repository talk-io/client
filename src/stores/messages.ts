import { defineStore } from "pinia";
import { ref } from "vue";
import type { Message } from "@/types/auth";
import { Message as MessageService } from "@/constants/apiRoutes";
import { useAuthStore } from "@/stores/auth";
import { service } from "@/utils/service";

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref<Map<string, Array<Message>>>(new Map());
  const authStore = useAuthStore();

  const _fetchMessages = async (channelID: string) => {
    const fetchedMessages = await MessageService.GET(channelID);
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

    const userID = authStore.getState.user?._id;
    if (userID === payload.authorID) return;
    channelMessages.push(payload);
  };

  const createMessage = async (payload: {
    _id: string;
    content: string;
    channelID: string;
  }) => {
    const channelMessages = messages.value.get(payload.channelID);
    if (!channelMessages) return;

    const user = authStore.getState.user;

    const loadingMsg = { content: payload.content, author: user };
    channelMessages.push(<Message>loadingMsg);

    try {
      const message = await service.post<never, Message>(
        MessageService.SEND(payload.channelID),
        payload,
      );
      const idx = channelMessages.findIndex((msg) => msg._id === payload._id);
      channelMessages.splice(idx, 1, message);
    } catch (error) {
      console.log(error);
    }
  };

  // const getMessages = async (channelID: string): Promise<Array<Message>> => {
  //   const messagesInChannel = messages.value.get(channelID);
  //   if (!messagesInChannel) {
  //     await _fetchMessages(channelID);
  //   }
  //   return messagesInChannel || [];
  // };

  return {
    getMessages,

    addEmittedMessage,
    createMessage,
  };
});
