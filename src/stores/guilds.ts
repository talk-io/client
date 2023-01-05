import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Guild } from "@/types/component";
import { useChannelsStore } from "@/stores/channels";

export const useGuildStore = defineStore("guilds", () => {
  const channelsStore = useChannelsStore();

  const state = ref<Map<string, Guild>>(fakeGuilds(channelsStore));

  const getGuilds = computed(() => Array.from(state.value.values()));
  const getGuild = (guildID: string) => state.value.get(guildID);
  const getLastVisitedChannel = (guildID: string) =>
    state.value.get(guildID)?.lastVisitedChannel || 1 + ""; // TODO: get last visited channel

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
