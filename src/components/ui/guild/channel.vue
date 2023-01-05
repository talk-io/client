<template>
  <RouterLink
    v-slot="{ isExactActive }"
    :to="{
      name: 'guild-channel',
      params: { guildID: route.params.guildID, channelID: channel.id },
    }"
  >
    <div
      :class="{
        'bg-card': isExactActive,
        'brightness-125': isExactActive,
      }"
      class="flex transition-colors items-center duration-75 select-none cursor-pointer gap-2 hover:brightness-110 hover:bg-card px-3 py-1.5 rounded-md"
    >
      <Icon class="text-tertiary text-lg" icon="octicon:hash-16" />
      <span
        :class="{
          '!text-label': isExactActive,
        }"
        class="text-tertiary text-lg font-normal -mt-1"
      >
        {{ channel.name }}
      </span>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import type { Channel } from "@/types/component";
import { useRoute } from "vue-router";

const route = useRoute();

defineProps<{
  channel: Channel;
}>();
</script>
