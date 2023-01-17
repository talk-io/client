<template>
  <div class="flex mx-chat mb-4 h-16 items-center bg-message-create-back rounded-lg gap-3 px-5">
    <Icon
      icon="ep:circle-plus-filled"
    />
    <input
      :placeholder="`Message #${channel.name}`"
      class="border-0 rounded-md p-2 bg-transparent disabled:opacity-50 w-full focus:outline-none"
    />
    <div class="flex gap-3">
      <Icon
        icon="fluent:gif-16-filled"
      />
      <Icon
        icon="mdi:emoji-robot-excited"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "@/types/auth";
import Icon from "@/components/ui/Icon.vue";

defineProps<{
  channel: Channel
}>();
</script>
