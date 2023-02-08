<template>
  <div v-auto-animate class="h-7">
    <span v-if="currentlyTyping.length" class="px-1">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "@/types/auth";
import { useChannelsStore } from "@/stores/channels";
import { computed } from "vue";

const props = defineProps<{
  channel: Channel;
}>();

const channelsStore = useChannelsStore();

const currentlyTyping = computed(() => channelsStore.getUsersTyping(props.channel._id))
const text = computed(() => {
  return currentlyTyping.value.length === 1
    ? `${currentlyTyping.value[0].username} is typing...`
    : `${currentlyTyping.value[0].username} and ${
        currentlyTyping.value.length - 1
      } others are typing...`;
});
</script>
