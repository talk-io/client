<template>
  <div class="h-7 w-full">
    <Transition name="main">
      <div v-if="currentlyTyping.length" class="flex items-center w-full h-full">
        <Icon class="text-lg -mb-0.5 text-header-secondary" icon="eos-icons:typing" />
        <span class="px-1">{{ text }}</span>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "@/types/auth";
import { useChannelsStore } from "@/stores/channels";
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  channel: Channel;
}>();

const channelsStore = useChannelsStore();

const currentlyTyping = computed(() =>
  channelsStore.getUsersTyping(props.channel._id),
);

const lf = new Intl.ListFormat("en");

const text = computed(() => {
  const names = lf.format(currentlyTyping.value.map((user) => user.username));
  const isManyTyping = currentlyTyping.value.length > 1;
  return `${names} ${isManyTyping ? "are" : "is"} typing...`;
});
</script>
