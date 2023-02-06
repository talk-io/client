import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useChannelsStore } from "@/stores/channels";
import type { Guild } from "@/types/auth";
import { useRoute } from "vue-router";
import { useMembersStore } from "@/stores/members";

export const useGuildStore = defineStore("guilds", () => {
  const state = ref<Map<string, Guild>>(new Map());

  const channelsStore = useChannelsStore();
  const membersStore = useMembersStore();

  const getGuilds = computed(() => Array.from(state.value.values() || []));
  const getGuild = (guildID: string) => state.value.get(guildID);
  const getLastVisitedChannel = (guildID: string) => {
    const guildChannels = channelsStore.getChannels(guildID);
    const firstChannel = guildChannels?.[0];

    const lastVisitedChannel = getGuild(guildID)?.lastVisitedChannel;
    return lastVisitedChannel || firstChannel?._id;
  };

  const getCurrentChannel = (guildID: string) => {
    const guild = state.value.get(guildID);
    if (!guild) return;

    const route = useRoute();

    return channelsStore
      .getChannels(guildID)
      ?.find(
        (channel) =>
          channel._id === (guild.lastVisitedChannel || route.params.channelID),
      );
  };

  const setGuilds = (guilds: Array<Guild>) => {
    const guildMap = guilds.map((guild) => {
      channelsStore.setChannels(guild._id, guild.channels);
      membersStore.setMembers(guild._id, guild.members);

      // const newGuild = reactive({
      //   ...guild,
      //   channels: channelsStore.getChannels(guild._id),
      // });
      const newGuild = reactive(guild);

      return [guild._id, newGuild];
    });
    // @ts-ignore
    state.value = new Map(guildMap);
  };

  const setLastVisitedChannel = (guildID: string, channelID: string) => {
    const guild = state.value.get(guildID);
    if (!guild) return;
    guild.lastVisitedChannel = channelID;
  };

  return {
    getGuilds,
    getGuild,
    getLastVisitedChannel,
    getCurrentChannel,

    setLastVisitedChannel,
    setGuilds,
  };
});
