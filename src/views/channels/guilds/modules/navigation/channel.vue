<template>
  <div class="bg-card flex gap-2 px-6 items-center">
    <Icon class="text-lg" icon="octicon:hash-16" />
    <span class="text-lg font-medium select-none">{{ channel.name }}</span>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Channel as ChannelType } from "@/types/auth";

defineProps<{
  channel: ChannelType;
}>();
</script>
