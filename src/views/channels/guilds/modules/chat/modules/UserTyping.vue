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

const currentlyTyping = computed(() =>
  channelsStore.getUsersTyping(props.channel._id),
);

const lf = new Intl.ListFormat('en');

const text = computed(() => {
  const names = lf.format(currentlyTyping.value.map((user) => user.username));
  const isManyTyping = currentlyTyping.value.length > 1;
  return `${names} ${isManyTyping ? 'are' : 'is'} typing...`;
});
</script>
