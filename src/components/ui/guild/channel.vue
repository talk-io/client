<template>
  <RouterLink
    v-slot="{ isExactActive }"
    :to="{
      name: 'guild-channel',
      params: { guildID: route.params.guildID, channelID: channel._id },
    }"
  >
    <div
      :class="{
        'bg-card': isExactActive,
        'brightness-125': isExactActive,
      }"
      class="flex transition-colors items-center duration-75 select-none cursor-pointer gap-2 hover:brightness-110 px-3 py-1.5 rounded-md"
    >
      <Icon :icon="icon" class="text-tertiary text-lg" />
      <span
        :class="{
          '!text-label': isExactActive,
        }"
        class="text-header-secondary text-lg font-normal -mt-1"
      >
        {{ channel.name }}
      </span>
    </div>
  </RouterLink>
</template>

<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

import type { Channel } from "@/types/auth";
import { ChannelType } from "@/types/auth";
import { computed } from "vue";

const route = useRoute();

const props = defineProps<{
  channel: Channel;
}>();

const icon = computed(() => {
  console.log({wee: props.channel.type});
  if (props.channel.type === ChannelType.GUILD_VOICE)
    return "wpf:speaker";
  return "octicon:hash-16";
});
</script>
