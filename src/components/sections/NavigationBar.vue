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
      @contextmenu.prevent="onRightClick"
    />
  </div>

  <ContextMenu
    v-if="showContextMenu"
    v-slot="{ handleEnter }"
    :event="eventHolder"
  >
    <ContextMenuItem :handleEnter="handleEnter" class="cursor-not-allowed">
      <span class="opacity-40">Mark as Read</span>
    </ContextMenuItem>
    <Rule />
    <ContextMenuItem :handleEnter="handleEnter">
      <span class="text-primary">Invite People</span>
    </ContextMenuItem>
    <Rule />
    <ContextMenuItem :handleEnter="handleEnter">
      <span>Create Channel</span>
    </ContextMenuItem>
    <ContextMenuItem :handleEnter="handleEnter">
      <span>Create Category</span>
    </ContextMenuItem>
    <Rule />
    <ContextMenuItem :handleEnter="handleEnter">
      <span class="text-logo-text">Leave Server</span>
    </ContextMenuItem>
    <Rule />
    <ContextMenuItem :handleEnter="handleEnter">
      <span>Copy ID</span>
    </ContextMenuItem>
  </ContextMenu>
</template>
<script lang="ts" setup>
import NavbarItem from "@/components/ui/NavbarItem.vue";
import talkioLogoTransparent from "@/assets/images/logo.svg";
import talkioLogo from "@/assets/images/logo.png";
import { useGuildStore } from "@/stores/guilds";
import ContextMenu from "@/components/ui/contextMenu/ContextMenu.vue";
import ContextMenuItem from "@/components/ui/contextMenu/ContextMenuItem.vue";
import Rule from "@/components/ui/contextMenu/Rule.vue";
import { ref } from "vue";

const guildStore = useGuildStore();
const showContextMenu = ref(false);
const eventHolder = ref();

const onRightClick = (event: MouseEvent) => {
  eventHolder.value = event;
  showContextMenu.value = true;
};
</script>
