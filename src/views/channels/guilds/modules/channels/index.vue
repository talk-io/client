<template>
  <div class="flex flex-col justify-between bg-secondary">
    <VerticalTransition
      v-slot="{
        handleEnter,
        handleLeave,

        HighlightedDiv,
      }"
      :additionalSpace="16 * 4"
    >
      <div class="overflow-y-auto px-3">
        <div class="flex flex-col gap-3 relative" @mouseleave="handleLeave">
          <component
            :is="HighlightedDiv"
            v-if="HighlightedDiv"
            class="!bg-card"
          />
          <Category
            v-for="category in channelsWithCategories"
            :key="category._id"
            :name="category.name"
          >
            <Channel
              v-for="channel in category.channels"
              :key="channel._id"
              :channel="channel"
              class="z-10"
              @mouseenter="handleEnter"
            />
          </Category>
        </div>
      </div>
    </VerticalTransition>
    <div class="h-14">
      <User />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Channel from "@/components/ui/guild/channel.vue";
import { useChannelsStore } from "@/stores/channels";
import Category from "@/components/ui/guild/category.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
import VerticalTransition from "@/components/animations/VerticalTransition.vue";
import User from "@/views/channels/guilds/modules/channels/modules/user.vue";

const route = useRoute();
const channelsStore = useChannelsStore();
const channelsWithCategories = computed(() =>
  channelsStore.getCategoriesAndChannels(route.params.guildID as string),
);
// if (
//   channels.value?.findIndex(
//     (channel) => channel._id === route.params.channelID,
//   ) === -1
// ) {
//   router.push({
//     name: "guild-channel",
//     params: {
//       guildID: route.params.guildID,
//       channelID: channelsStore.getChannels(id.value)?.[0]._id || "1",
//     },
//   });
// }
</script>
