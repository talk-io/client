<template>
  <div v-if="guild" class="grid grid-cols-[240px_1fr] h-full overflow-y-hidden">
    <div class="grid relative">
      <GuildSettings :guild="guild" class="w-full px-3 h-12 drop-shadow-lg absolute" />
      <Channels :guild="guild" class="pt-16 px-3" />
    </div>
    <div class="grid grid-cols-[1fr_240px] relative">
      <ChannelSettings v-if="currentChannel" :channel="currentChannel"
                       class="w-full px-3 h-12 drop-shadow-lg absolute" />
      <Chat v-if="currentChannel" :channel="currentChannel" class="pt-12" />
      <Members :guild="guild" class="pt-16 px-3" />
    </div>
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

const guild = computed(() => guildStore.getGuild(route.params.guildID as string));
const currentChannel = computed(() => guildStore.getCurrentChannel(route.params.guildID as string));
</script>
