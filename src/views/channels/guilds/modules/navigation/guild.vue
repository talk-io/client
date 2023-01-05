<template>
  <div class="bg-secondary flex items-center justify-between">
    <span class="font-bold">{{ guild.name }}</span>
    <Icon class="text-2xl" icon="material-symbols:keyboard-arrow-down-rounded" />
  </div>
</template>

<script lang="ts" setup>
import type { Guild } from "@/types/component";
import { Icon } from "@iconify/vue";

defineProps<{
  guild: Guild;
}>();
</script>