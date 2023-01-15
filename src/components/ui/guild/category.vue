<template>
  <div class="flex flex-col gap-1">
    <span class="text-header-secondary font-medium text-lg">{{ category.name }}</span>
    <div class="flex flex-col gap-1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>

import type { Channel } from "@/types/auth";

defineProps<{
  category: Channel;
}>();
</script>
