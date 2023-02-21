<template>
  <li
    class="flex items-center gap-2.5 relative hover:brightness-110 px-2 py-1 rounded-md cursor-pointer transition-all"
  >
    <Icon
      class="text-4.5xl text-header-secondary"
      icon="mdi:face-man-profile"
    />
      <div
        class=" flex absolute bottom-0 left-1.5 items-center justify-center h-5 w-5 bg-secondary rounded-full"
      >
        <Tooltip :content="status[user.status]" placement="top">
        <div
          :class="{
          'bg-online': user.status === 'online',
          'bg-offline': user.status === 'offline',
          'bg-idle': user.status === 'idle',
          'bg-dnd': user.status === 'dnd',
        }"
          class="h-2.5 w-2.5 rounded-full"
        />
        </Tooltip>
      </div>
    <span class="font-medium text-lg select-none">
      {{ user.username }}
    </span>
  </li>
</template>

<script lang="ts" setup>
import type { BasicUser } from "@/types/auth";
import { Icon } from "@iconify/vue";
import Tooltip from "@/components/ui/Tooltip.vue";

defineProps<{
  user: BasicUser;
}>();

const status = {
  online: "Online",
  offline: "Offline",
  idle: "Idle",
  dnd: "Do Not Disturb",
};
</script>
