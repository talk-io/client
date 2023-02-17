<template>
  <li
    class="flex items-center gap-2.5 relative hover:brightness-110 px-2 py-1 rounded-md cursor-pointer transition-all"
  >
    <Icon
      class="text-4.5xl text-header-secondary"
      icon="mdi:face-man-profile"
    />
    <div
      class="absolute flex items-center justify-center h-5 w-5 bg-secondary bottom-0 left-1.5 rounded-full"
    >
      <div
        :class="{
          'bg-online': user.status === 'online',
          'bg-offline': user.status === 'offline',
          'bg-idle': user.status === 'idle',
          'bg-dnd': user.status === 'dnd',
        }"
        class="h-3 w-3 rounded-full"
      />
    </div>
    <span class="font-medium text-lg select-none">
      {{ user.username }}
    </span>
  </li>
</template>

<script lang="ts" setup>
import type { BasicUser } from "@/types/auth";
import { Icon } from "@iconify/vue";

defineProps<{
  user: BasicUser;
}>();
</script>
