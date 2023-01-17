<template>
  <div class="flex flex-col h-screen pb-2">
    <div class="flex flex-col-reverse gap-3 overflow-y-auto h-full pt-12 pb-6">
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
    <MessageCreate :channel="channel" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Message from "@/components/ui/guild/message.vue";
import MessageCreate from "./MessageCreate.vue";
import { useMessagesStore } from "@/stores/messages";
import { onMounted, ref, watch } from "vue";
import type { Channel } from "@/types/auth";

defineProps<{
  channel: Channel
}>();

const route = useRoute();

const messagesStore = useMessagesStore();
let messages = ref();

onMounted(async () => {
  messages.value = await messagesStore.getMessages(
    route.params.channelID as string
  );
});

watch(
  () => route.params.channelID,
  async (cur) => {
    messages.value = await messagesStore.getMessages(cur as string);
  }
);
</script>
