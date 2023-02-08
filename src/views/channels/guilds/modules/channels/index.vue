<template>
  <div class="bg-secondary">
    <VerticalTransition
      v-slot="{
        handleEnter,
        handleLeave,

        HighlightedDiv,
      }"
      :additionalSpace="16 * 4"
    >
      <div
        class="flex flex-col gap-3 h-screen overflow-y-auto relative"
        @mouseleave="handleLeave"
      >
        <component :is="HighlightedDiv" class="!bg-card" />
        <template
          v-for="category in channelsStore.getCategoriesAndChannels(guild._id)"
          :key="category._id"
        >
          <Category :category="category">
            <Channel
              v-for="channel in category.channels"
              :id="channel._id"
              :key="channel._id"
              :channel="channel"
              @mouseenter="handleEnter(channel._id)"
            />
          </Category>
        </template>
      </div>
    </VerticalTransition>
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
import VerticalTransition from "@/components/animations/VerticalTransition.vue";

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
</script>
