<template>
  <div class="flex flex-col">
    <span class="text-tertiary text-lg font-semibold">{{ category.name }}</span>
    <div class="flex flex-col gap-1">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Category } from "@/types/component";

defineProps<{
  category: Category;
}>();
</script>
