<template>
  <div class="bg-card flex gap-2 px-6 items-center">
    <Icon class="text-lg" icon="octicon:hash-16" />
    <span>general</span>
  </div>
</template>

<script lang="ts" setup>
import type { Guild } from "@/types/component";
import { Icon } from "@iconify/vue";

defineProps<{
  guild: Guild;
}>();
</script>