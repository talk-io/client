<template>
  <div
    class="flex flex-col items-center gap-3 p-3 w-20 h-screen overflow-y-scroll no-scrollbar"
  >
    <NavbarItem :to="{ name: 'me' }">
      <img
        :src="talkioLogoTransparent"
        alt="talkio logo"
        class="select-none aspect-square"
      />
    </NavbarItem>

    <hr class="border-[1px] border-hr w-4/6" />

    <NavbarItem
      v-for="guild in guildStore.getGuilds"
      :key="guild._id"
      :backgroundImage="talkioLogo"
      :to="{
        name: 'guild-channel',
        params: {
          guildID: guild._id,
          channelID: guildStore.getLastVisitedChannel(guild._id),
        },
      }"
    />
  </div>
</template>
<script lang="ts" setup>
import NavbarItem from "@/components/ui/NavbarItem.vue";
import talkioLogoTransparent from "@/assets/images/logo.svg";
import talkioLogo from "@/assets/images/logo.png";
import { useGuildStore } from "@/stores/guilds";

const guildStore = useGuildStore();
</script>
