<template>
  <div class="flex flex-col items-center gap-3 p-3 w-20 h-screen overflow-y-scroll no-scrollbar">
    <NavbarItem
      :to="{name: 'me'}"
    >
      <img :src="talkioLogoTransparent" alt="talkio logo" class="aspect-square" />
    </NavbarItem>

    <hr class="border-[1px] border-hr w-4/6" />

    <NavbarItem
      v-for="(_, idx) in Array(5)"
      :key="idx"
      :backgroundImage="talkioLogo"
      :to="{name: 'guild-channel', params: {guildID: idx+1, channelID: idx+1}}"
    >
    </NavbarItem>

  </div>
</template>
<script lang="ts" setup>
import NavbarItem from "@/components/ui/NavbarItem.vue";
import talkioLogoTransparent from "@/assets/images/logo.svg";
import talkioLogo from "@/assets/images/logo.png";

// const servers = [
//   {
//     image: talkioLogo,
//     name: "Talkio",
//   }
// ]
</script>