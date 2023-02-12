<template>
  <div class="bg-secondary flex items-center justify-between">
    <span class="font-bold select-none">{{ name }}</span>
    <Icon class="text-2xl" icon="material-symbols:keyboard-arrow-down-rounded" />
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";

defineProps<{
  name: string;
}>();
</script>