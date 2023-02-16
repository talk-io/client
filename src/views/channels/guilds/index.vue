<template>
  <div
    v-if="guild"
    class="grid grid-cols-[16rem_1fr_16rem] grid-rows-[3rem_100%] w-full h-screen overflow-y-hidden"
  >
    <GuildSettings
      :name="guild.name"
      class="w-full py-3 px-3 drop-shadow-lg z-20"
    />
    <ChannelSettings
      v-if="currentChannel"
      :channel="currentChannel"
      class="w-full col-span-2 px-3 py-2.5 drop-shadow-lg z-20"
    />
    <Channels class="pt-4 px-3" />
    <Chat v-if="currentChannel" :channel="currentChannel" />
    <Members :guild="guild" class="pt-4 px-2 z-20" />
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
