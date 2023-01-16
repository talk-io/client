import { defineStore } from "pinia";
import { ref } from "vue";
import type { Channel, Message } from "@/types/auth";
import { ChannelType } from "@/types/auth";

export const useChannelsStore = defineStore("channels", () => {
  const channels = ref<Map<string, Array<Channel>>>(new Map());

  const getCategories = (guildID: string) => {
    const guildChannels = channels.value.get(guildID);
    if (!guildChannels) return [];

    return guildChannels
      .filter((channel) => channel.type === ChannelType.GUILD_CATEGORY)
      .sort((a, b) => a.position - b.position);
  };
  const getChannelsInCategory = (guildID: string, categoryID: string) => {
    const guildChannels = channels.value.get(guildID);
    if (!guildChannels) return [];

    return guildChannels
      .filter((channel) => channel.parentID === categoryID)
      .sort((a, b) => a.position - b.position);
  };
  const getCategoriesAndChannels = (guildID: string) => {
    const categories = getCategories(guildID);
    return categories.map((category) => ({
      ...category,
      channels: getChannelsInCategory(guildID, category._id),
    }));
  };
  const getChannels = (guildID: string) =>
    channels.value
      .get(guildID)
      ?.filter((channel) => channel.type !== ChannelType.GUILD_CATEGORY);

  const setChannels = (guildID: string, fetchedChannels: Array<Channel>) => {
    channels.value.set(
      guildID,
      fetchedChannels.map((channel) => ({
        ...channel,
        messages: [],
      })),
    );
  };

  return {
    getChannels,
    getCategories,
    getChannelsInCategory,
    getCategoriesAndChannels,

    setChannels,
  };
});

// const fakeMessages = (guildID: string, channelID: string): Array<Message> =>
//   [...Array(5)].map((_, idx) => ({
//     id: idx + 1 + "",
//     authorID: "1",
//     content: `Message #${idx + 1}`,
//     channelID: channelID,
//     guildID: guildID,
//     author: {
//       id: "1",
//       name: "weee",
//     },
//   }));

// const fakeChannels = new Map(
//   [...Array(10)].map((_, idx) => {
//     const id: string = idx + 1 + "";
//     return [
//       id,
//       [
//         {
//           id: "1",
//           name: "general",
//           guildID: id,
//           messages: fakeMessages(id, "1"),
//         },
//         {
//           id: "2",
//           name: "random",
//           guildID: id,
//           messages: fakeMessages(id, "2"),
//         },
//       ],
//     ];
//   }),
// );
