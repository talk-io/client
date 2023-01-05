import { defineStore } from "pinia";
import type { Channel, Message } from "@/types/component";
import { ref } from "vue";

export const useChannelsStore = defineStore("channels", () => {
  const channels = ref<Map<string, Array<Channel>>>(fakeChannels);

  const getChannels = (guildID: string) => channels.value.get(guildID);
  const getMessages = (guildID: string, channelID: string) => {
    const guildChannels = channels.value.get(guildID);
    if (!guildChannels) return;

    const channel = guildChannels.find((c) => c.id === channelID);
    if (!channel) return;

    return channel.messages;
  };

  return {
    getChannels,
    getMessages,

    channels,
  };
});

const fakeMessages = (guildID: string, channelID: string): Array<Message> =>
  [...Array(5)].map((_, idx) => ({
    id: idx + 1 + "",
    authorID: "1",
    content: `Message #${idx + 1}`,
    channelID: channelID,
    guildID: guildID,
    author: {
      id: "1",
      name: "weee",
    },
  }));

const fakeChannels = new Map(
  [...Array(10)].map((_, idx) => {
    const id: string = idx + 1 + "";
    return [
      id,
      [
        {
          id: "1",
          name: "general",
          guildID: id,
          messages: fakeMessages(id, "1"),
        },
        {
          id: "2",
          name: "random",
          guildID: id,
          messages: fakeMessages(id, "2"),
        },
      ],
    ];
  }),
);
