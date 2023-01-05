<template>
  <div class="flex flex-col px-12 py-1 transition-colors hover:bg-secondary-light">
    <span class="font-semibold text-lg -mt-1">{{ message.author.name }}</span>
    <span>{{ message.content }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from "@/types/component";

defineProps<{
  message: Message;
}>();
</script>
