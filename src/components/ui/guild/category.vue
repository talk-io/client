<template>
  <div class="flex flex-col gap-1">
    <span class="text-header-secondary hover:text-white transition-colors font-medium text-lg select-none">{{ category.name }}</span>
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
