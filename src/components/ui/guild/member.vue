<template>
  <li class="flex items-center gap-2.5 hover:brightness-110 px-2 py-1 rounded-md cursor-pointer transition-all">
    <Icon class="text-4.5xl text-header-secondary" icon="mdi:face-man-profile" />
    <span class="font-medium text-lg">
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
