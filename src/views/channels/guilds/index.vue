<template>
  <div v-if="guild" class="flex w-full h-screen overflow-y-hidden">
    <div class="flex w-72 h-screen flex-col">
      <GuildSettings :name="guild.name" class="w-full py-3 px-3 drop-shadow-lg" />
      <Channels class="pt-4 px-3" />
    </div>
    <div class="flex flex-col w-full relative">
      <ChannelSettings
        v-if="currentChannel"
        :channel="currentChannel"
        class="w-full px-3 py-2.5 drop-shadow-lg absolute"
      />
      <div class="flex w-full">
        <KeepAlive>
          <Chat v-if="currentChannel" :channel="currentChannel" class="pt-12" />
        </KeepAlive>
        <Members :guild="guild" class="pt-16 px-2 w-72" />
      </div>
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

const guild = computed(() =>
  guildStore.getGuild(route.params.guildID as string),
);
const currentChannel = computed(() =>
  guildStore.getCurrentChannel(route.params.guildID as string),
);
</script>
