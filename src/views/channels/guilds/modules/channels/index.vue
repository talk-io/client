<template>
  <div class="bg-secondary flex flex-col justify-between">
    <template v-for="category in guild.categories" :key="category.id">
      <Category :category="category">
        <Channel v-for="channel in category.channels" :key="channel.id" :channel="channel" />
      </Category>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Guild } from "@/types/component";
import Category from "@/components/ui/guild/category.vue";
import Channel from "@/components/ui/guild/channel.vue";

defineProps<{
  guild: Guild;
}>();
</script>