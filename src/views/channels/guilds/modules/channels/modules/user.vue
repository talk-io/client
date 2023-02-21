<template>
  <div
    class="flex items-center gap-1 h-full w-full px-2 py-1 justify-between bg-tooltip"
  >
    <div
      class="grid grid-cols-[2.5rem_1fr] items-center gap-x-1 w-7/12 rounded-md h-full cursor-pointer grid-rows-2 hover:bg-message-create-back"
    >
      <Iconify
        class="text-4.5xl row-span-2 text-header-secondary row-span-2"
        icon="mdi:face-man-profile"
      />
      <span class="font-semibold h-5 -mb-0.5 text-ellipsis overflow-hidden whitespace-nowrap select-none">
        {{ user.username }}
      </span>
      <span
        class="text-sm text-header-secondary -mt-2 text-ellipsis overflow-hidden whitespace-nowrap select-none"
      >
        together with muffiny muffins
      </span>
    </div>
    <div class="flex justify-around items-center h-4/6 w-5/12">
      <Tooltip class="w-full px-0.5" content="Mute" placement="top">
        <VoiceIcons icon="material-symbols:mic-rounded" />
      </Tooltip>
      <Tooltip class="w-full px-0.5" content="Defean" placement="top">
      <VoiceIcons icon="ic:round-headphones" />
      </Tooltip>
      <Tooltip class="w-full px-0.5" content="Settings" placement="top">
        <VoiceIcons icon="mdi:gear" />
      </Tooltip>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Icon as Iconify } from "@iconify/vue";
import VoiceIcons from "@/components/ui/VoiceIcons.vue";
import { useAuthStore } from "@/stores/auth";
import Tooltip from "@/components/ui/Tooltip.vue";

const authStore = useAuthStore();

const user = authStore.getState.user;
</script>
