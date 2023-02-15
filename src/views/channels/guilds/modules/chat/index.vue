<template>
  <div class="flex flex-col w-full h-screen">
    <VerticalTransition
      v-slot="{
        handleEnter,
        handleLeave,

        HighlightedDiv,
      }"
    >
      <div v-if="messagesFetching" class="w-10 h-10 bg-red-500" />
      <div
        v-else
        ref="messagesList"
        class="flex flex-col-reverse overflow-y-auto h-full py-6"
        @mouseleave="handleLeave"
      >
        <component :is="HighlightedDiv" v-if="HighlightedDiv" />
        <template v-for="(message, idx) in messages" :key="message._id || idx">
          <Message
            :lastAuthor="messages[idx + 1]?.author._id || null"
            :message="message"
            class="z-0"
            @mouseenter="handleEnter"
          />
          <div
            v-if="messages[idx + 1]?.author._id !== message.author._id"
            class="my-1"
          />
        </template>
      </div>
    </VerticalTransition>
    <div class="flex flex-col h-24 mx-chat">
      <MessageCreate
        :channel="channel"
        class="w-full"
        @onMessageCreate="scrollToEnd"
      />
      <UserTyping :channel="channel" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import type { Message as MessageType } from "@/types/auth";
import { useMessagesStore } from "@/stores/messages";
import { nextTick, onMounted, ref, watch } from "vue";
import type { Channel } from "@/types/auth";
import Message from "@/components/ui/guild/message.vue";
import MessageCreate from "./modules/MessageCreate.vue";
import UserTyping from "./modules/UserTyping.vue";
import VerticalTransition from "@/components/animations/VerticalTransition.vue";

const messagesList = ref<HTMLDivElement>();

defineProps<{
  channel: Channel;
}>();

const route = useRoute();

const messagesStore = useMessagesStore();
const messages = ref<Array<MessageType>>();

const messagesFetching = ref(false);

const fetchMessages = async () => {
  messagesFetching.value = true;
  try {
    messages.value = await messagesStore.getMessages(
      route.params.channelID as string,
    );
    console.log({ wee: messages.value });
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
