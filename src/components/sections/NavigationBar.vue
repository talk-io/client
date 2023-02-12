<template>
  <div class="h-screen overflow-y-scroll no-scrollbar">
    <div
      class="flex flex-col relative items-center gap-3 top-0 left-0 p-3 w-20"
      @mouseleave="onLeave"
    >
      <!--  DMs  -->
      <RouterLink
        v-slot="{ isExactActive }"
        :to="{ name: 'me' }"
        class="w-full"
        @mouseenter="onHover('Direct Messages', $event)"
      >
        <NavbarItem :active="isExactActive">
          <img
            :src="talkioLogoTransparent"
            alt="talkio logo"
            class="select-none aspect-square"
          />
        </NavbarItem>
      </RouterLink>
      <!--  DMs END  -->
      <Rule />
      <!-- SERVERS -->
      <RouterLink
        v-for="guild in guildStore.getGuilds"
        :key="guild._id"
        v-slot="{ isExactActive }"
        :to="{
          name: 'guild-channel',
          params: {
            guildID: guild._id,
            channelID: guildStore.getLastVisitedChannel(guild._id),
          },
        }"
        class="w-full"
        @mouseenter="onHover(guild.name, $event)"
      >
        <NavbarItem
          :active="isExactActive"
          :backgroundImage="talkioLogo"
          @contextmenu.prevent="onRightClick"
        />
      </RouterLink>

      <!-- SERVERS END -->
      <Rule />
      <!-- DISCOVER -->
      <NavbarItem hide-pill @mouseenter="onHover('Add a Server', $event)">
        <Icon
          class="text-2xl select-none text-logo-text transition-colors group-hover:text-white"
          icon="ic:round-plus"
        />
      </NavbarItem>
      <!-- DISCOVER END -->
    </div>
  </div>

  <teleport to="#wrapper">
    <span
      v-if="isHovering"
      :style="tooltipStyle"
      class="absolute whitespace-nowrap w-fit origin-left font-medium transition-all z-50 bg-tooltip rounded-lg px-4 py-2 after:absolute after:top-1/2 after:-translate-y-1.5 after:-left-3 after:border-[6px] after:border-solid after:border-[transparent_#202225_transparent_transparent]"
    >
      {{ currentTooltip }}
    </span>
  </teleport>

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
import { Icon } from "@iconify/vue";

const guildStore = useGuildStore();
const showContextMenu = ref(false);
const eventHolder = ref();

const isHovering = ref(false);
const currentTooltip = ref("fdsfsdf");

const tooltipStyle = ref({
  top: "0px",
  left: "0px",
  transform: "translate(0px, 0)",
  scale: '0',
});

const onHover = (tooltip: string, event: MouseEvent) => {
  console.log({ event });
  const target = event.target as HTMLSpanElement;
  const rect = target.getBoundingClientRect();
  tooltipStyle.value = {
    top: `${rect.top + rect.height / 2 - 22}px`,
    left: `${rect.left + rect.width / 2 + 16 * 3}px`,
    transform: `translate(0px, ${rect.top})`,
    scale: '0',
  };
  currentTooltip.value = tooltip;
  isHovering.value = true;
  setTimeout(() => {
    tooltipStyle.value["scale"] = '1';
  }, 0);
};

const onLeave = () => {
  isHovering.value = false;
  currentTooltip.value = "";
};

const onRightClick = (event: MouseEvent) => {
  eventHolder.value = event;
  showContextMenu.value = true;
};
</script>
