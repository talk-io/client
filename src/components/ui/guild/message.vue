<template>
  <div class="px-chat w-full">
    <div v-if="lastAuthor === message.author._id" class="flex items-center gap-2 w-full py-0.5">
      <span class="text-header-secondary w-12 text-sm opacity-0">1:12 AM</span>
      <span>{{ message.content }}</span>
    </div>
    <div
      v-else
      :class="{
      'opacity-50': !message._id,
    }"
      class="flex w-full items-center py-0.5 gap-2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon class="text-5xl text-header-secondary" icon="mdi:face-man-profile" />
      <div class="flex flex-col">
      <span class="font-semibold text-lg -mt-1 -mb-0.5">
        {{ message.author.username }}<span class="text-header-description">#{{ message.author.discriminator }}</span>
      </span>
        <span>{{ message.content }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message as MessageType } from "@/types/auth";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

defineProps<{
  message: MessageType;
  lastAuthor?: string;
}>();

const isHovered = ref(false);
</script>
