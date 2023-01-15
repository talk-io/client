import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { useChannelsStore } from "@/stores/channels";
import type { Guild } from "@/types/auth";

export const useGuildStore = defineStore("guilds", () => {
  const channelsStore = useChannelsStore();

  const state = ref<Map<string, Guild>>(new Map());
  // fakeGuilds(channelsStore)

  const getGuilds = computed(() => Array.from(state.value.values() || []));
  const getGuild = (guildID: string) => state.value.get(guildID);
  const getLastVisitedChannel = (guildID: string) =>
    state.value.get(guildID)?.lastVisitedChannel || 1 + ""; // TODO: get last visited channel

  const setGuilds = (guilds: Array<Guild>) => {
    const guildsMap = guilds.map((guild) => {
      channelsStore.setChannels(guild._id, guild.channels);

      const newGuild = reactive({
        ...guild,
        channels: channelsStore.getChannels(guild._id),
      });

      return [guild._id, newGuild];
    });
    // @ts-ignore
    state.value = new Map(guildsMap);
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

    setLastVisitedChannel,
    setGuilds,
  };
});

const fakeGuilds = (channelsStore: any) =>
  new Map(
    [...Array(10)].map((_, idx) => {
      const id = idx + 1 + "";
      return [
        id,
        {
          id: id,
          name: `Guild #${id}`,
          categories: [
            {
              id: "1",
              name: "General",
              guildID: id,
              channels: channelsStore.getChannels(id) || [],
            },
          ],
        },
      ];
    }),
  );
