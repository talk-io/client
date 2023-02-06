<template>
  <div class="bg-secondary">
    <div
      class="flex flex-col gap-3 h-screen overflow-y-auto relative"
      @mouseleave="handleLeave"
    >
      <div
        v-if="isVisible"
        :style="highlightedStyles"
        aria-hidden="true"
        class="bg-card brightness-110 w-full rounded-md transition-all absolute top-0 select-none z-10"
      />
      <template
        v-for="category in channelsStore.getCategoriesAndChannels(guild._id)"
        :key="category._id"
      >
        <Category :category="category" class="z-20">
          <Channel
            v-for="channel in category.channels"
            :id="channel._id"
            :key="channel._id"
            :channel="channel"
            class="z-20"
            @mouseenter="handleEnter(channel._id)"
          />
        </Category>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Channel from "@/components/ui/guild/channel.vue";
import type { Guild } from "@/types/auth";
import { useChannelsStore } from "@/stores/channels";
import Category from "@/components/ui/guild/category.vue";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useVerticalTransitionAnimation } from "@/composables/useVerticalTransitionAnimation";

const route = useRoute();
const router = useRouter();

const props = defineProps<{
  guild: Guild;
}>();
const channelsStore = useChannelsStore();
const channels = computed(() => channelsStore.getChannels(props.guild._id));
if (
  channels.value?.findIndex(
    (channel) => channel._id === route.params.channelID,
  ) === -1
) {
  router.push({
    name: "guild-channel",
    params: {
      guildID: route.params.guildID,
      channelID: channelsStore.getChannels(props.guild._id)?.[0]._id || "1",
    },
  });
}

const {
  highlightedStyles,
  isVisible,

  handleEnter,
  handleLeave,
} = useVerticalTransitionAnimation({
  additionalSpace: 16*4,
});
</script>
