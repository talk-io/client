<template>
  <div class="flex flex-col-reverse gap-1 py-5 overflow-y-auto h-screen">
    <Message v-for="message in messages" :key="message.id" :message="message" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Message from "@/components/ui/guild/message.vue";
import { useMessagesStore } from "@/stores/messages";
import { onMounted, ref, watch } from "vue";

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

// const messages = await computed(() => messagesStore.getMessages(route.params.channelID as string));
// console.log(messages.value);
// const channelStore = useChannelsStore();
// const messages = computed(() =>
//   channelStore.getMessages(
//     route.params.guildID as string,
//     route.params.channelID as string
//   )
// );
</script>
