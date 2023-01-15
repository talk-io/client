<template>
  <div class="bg-secondary flex flex-col gap-3">
    <template v-for="category in channelsStore.getCategoriesAndChannels(guild._id)" :key="category._id">
      <Category :category="category">
        <Channel
          v-for="channel in category.channels"
          :key="channel._id"
          :channel="channel"
        />
      </Category>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Channel from "@/components/ui/guild/channel.vue";
import type { Guild } from "@/types/auth";
import { useChannelsStore } from "@/stores/channels";
import Category from "@/components/ui/guild/category.vue";

const props = defineProps<{
  guild: Guild;
}>();

const channelsStore = useChannelsStore();
</script>
