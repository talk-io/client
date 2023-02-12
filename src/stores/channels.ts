import { defineStore } from "pinia";
import { ref } from "vue";
import type { BasicUser, Channel } from "@/types/auth";
import { ChannelType } from "@/types/auth";
import { useGatewayStore } from "@/stores/gateway";
import { Events } from "@/types/events";

const { USER_TYPING_START, USER_TYPING_END } = Events.ChannelEvents;

export const useChannelsStore = defineStore("channels", () => {
  const channels = ref<Map<string, Array<Channel>>>(new Map());
  const usersTyping = ref<Map<string, Array<BasicUser>>>(new Map());
  const gatewayStore = useGatewayStore();

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
    console.log({ categories });
    return categories.map((category) => ({
      ...category,
      channels: getChannelsInCategory(guildID, category._id),
    }));
  };
  const getChannels = (guildID: string) =>
    channels.value
      .get(guildID)
      ?.filter((channel) => channel.type !== ChannelType.GUILD_CATEGORY);
  // const getChannel = (guildID: string, channelID: string) => {
  //   const guildChannels = channels.value.get(guildID);
  //   if (!guildChannels) return;
  //
  //   const channelIndex = guildChannels.findIndex(
  //     (channel) => channel._id === channelID,
  //   );
  //
  //   return guildChannels[channelIndex];
  // };

  const getUsersTyping = (channelID: string) => {
    const users = usersTyping.value.get(channelID);
    if (users) return users;
    usersTyping.value.set(channelID, []);
    return <Array<BasicUser>>usersTyping.value.get(channelID);
  };

  const setChannels = (guildID: string, fetchedChannels: Array<Channel>) => {
    channels.value.set(
      guildID,
      fetchedChannels.map((channel) => ({
        ...channel,
        messages: [],
      })),
    );
  };
  const setUserTyping = ({
    channelID,
    user,
  }: {
    channelID: string;
    user: BasicUser;
  }) => {
    const usersTypingInChannel = getUsersTyping(channelID);
    const userIDs = usersTypingInChannel.map((usr) => usr._id);

    const hasUser = userIDs.includes(user._id);
    if (hasUser) return false;

    usersTypingInChannel.push(user);
  };
  const removeUserTyping = ({
    channelID,
    userID,
  }: {
    channelID: string;
    userID: string;
  }) => {
    const usersTypingInChannel = getUsersTyping(channelID);
    if (!usersTypingInChannel) return;

    const userIndex = usersTypingInChannel.findIndex(
      (user) => user._id === userID,
    );
    if (userIndex === -1) return;
    usersTypingInChannel.splice(userIndex, 1);
  };

  const emitUserTyping = (channelID: string) => {
    const socket = gatewayStore.getSocket;
    if (!socket) return;

    socket.emit(USER_TYPING_START, channelID);
  };

  const emitUserStopTyping = (channelID: string) => {
    const socket = gatewayStore.getSocket;
    if (!socket) return;

    socket.emit(USER_TYPING_END, channelID);
  };

  return {
    getChannels,
    getCategories,
    getChannelsInCategory,
    getCategoriesAndChannels,
    getUsersTyping,

    setChannels,
    setUserTyping,
    removeUserTyping,

    emitUserTyping,
    emitUserStopTyping,
  };
});
