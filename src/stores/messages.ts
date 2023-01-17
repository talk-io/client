import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Message } from "@/types/auth";
import { Message as MessageService } from "@/constants/apiRoutes";
import { useChannelsStore } from "@/stores/channels";

export const useMessagesStore = defineStore("messagesStore", () => {
  const messages = ref<Map<string, Array<Message>>>(new Map());
  const channelsStore = useChannelsStore();

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

    channelMessages.unshift(payload);
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
  };
});
