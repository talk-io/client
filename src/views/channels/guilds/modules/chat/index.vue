<template>
  <div class="flex flex-col w-full h-screen">
    <!--    <vue-skeleton-loader-->
    <!--      v-if="messagesFetching"-->
    <!--      :height="200"-->
    <!--      :width="200"-->
    <!--      animation="fade"-->
    <!--      type="circle"-->
    <!--    />-->
    <div v-if="messagesFetching" class="w-10 h-10 bg-red-500" />
    <div
      v-else
      ref="messagesList"
      class="flex flex-col gap-3 overflow-y-auto flex-nowrap h-full py-8"
    >
      <Message
        v-for="(message, idx) in messages"
        :key="message._id"
        :class="{ 'mt-auto': !idx }"
        :message="message"
      />
    </div>
    <div class="flex flex-col h-24 mx-chat">
      <MessageCreate
        :channel="channel"
        class="w-full"
        @onMessageCreate="scrollToEnd"
      />
      <span class="pb-0.5 px-1">muffins is typing...</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import Message from "@/components/ui/guild/message.vue";
import type { Message as MessageType } from "@/types/auth";
import MessageCreate from "./MessageCreate.vue";
import { useMessagesStore } from "@/stores/messages";
import { nextTick, onMounted, ref, watch } from "vue";
import type { Channel } from "@/types/auth";

const messagesList = ref<HTMLElement>();

defineProps<{
  channel: Channel;
}>();

const route = useRoute();

const messagesStore = useMessagesStore();
let messages = ref<Array<MessageType>>();

const messagesFetching = ref(false);

const fetchMessages = async () => {
  messagesFetching.value = true;
  try {
    messages.value = await messagesStore.getMessages(
      route.params.channelID as string
    );
  } catch (e) {
    console.log(e);
  } finally {
    messagesFetching.value = false;
  }
};

const scrollToEnd = () => {
  nextTick(() => {
    if (!messagesList.value) return;
    messagesList.value.scrollTop = messagesList.value.scrollHeight;
  });
};

onMounted(fetchMessages);

watch(() => route.params.channelID, fetchMessages);
watch(() => messages.value?.length, scrollToEnd);
</script>
