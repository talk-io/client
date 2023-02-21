<template>
  <div
    v-if="guild"
    class="grid grid-cols-[18rem_1fr_18rem] grid-rows-guild-ui w-full h-full overflow-hidden"
  >
    <GuildSettings :name="guild.name" class="h-12 w-full py-3 px-3 drop-shadow-lg" />
    <ChannelSettings
      v-if="currentChannel"
      :channel="currentChannel"
      class="w-full col-span-2 px-3 h-12 py-2.5 drop-shadow-lg z-20"
    />
    <Channels class="pt-4" />
    <Chat v-if="currentChannel" :channel="currentChannel" />
    <Members :guild="guild" class="pt-4 px-3 z-20" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Channels from "./modules/channels/index.vue";
import Chat from "./modules/chat/index.vue";
import Members from "./modules/members/index.vue";
import GuildSettings from "./modules/navigation/guild.vue";
import ChannelSettings from "./modules/navigation/channel.vue";
import { useGuildStore } from "@/stores/guilds";
import { computed } from "vue";

const route = useRoute();

const guildStore = useGuildStore();

const guild = computed(() =>
  guildStore.getGuild(route.params.guildID as string),
);
const currentChannel = computed(() =>
  guildStore.getCurrentChannel(route.params.guildID as string),
);
</script>
