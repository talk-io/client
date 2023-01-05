<template>
  <div class="flex flex-col-reverse gap-1 py-5">
    <Message v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script lang="ts" setup>
import { useChannelsStore } from "@/stores/channels";
import { useRoute } from "vue-router";
import { computed } from "vue";
import Message from "@/components/ui/guild/message.vue";

const route = useRoute();

const channelStore = useChannelsStore();
const messages = computed(() =>
  channelStore.getMessages(
    route.params.guildID as string,
    route.params.channelID as string
  )
);
</script>
