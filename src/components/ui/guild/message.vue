<template>
  <div
    :class="{
      'opacity-50': !message._id,
    }"
    class="flex w-full items-center py-1 transition-colors hover:bg-secondary-light px-chat gap-2"
  >
    <Icon class="text-5xl text-header-secondary" icon="mdi:face-man-profile" />
    <div class="flex flex-col">
      <span class="font-semibold text-lg -mt-1 -mb-0.5">{{
          message.author.username
        }}</span>
      <span>{{ message.content }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "@/types/auth";
import { Icon } from "@iconify/vue";

defineProps<{
  message: Message;
}>();
</script>
