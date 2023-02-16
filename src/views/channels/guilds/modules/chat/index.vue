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
          <template
            v-for="(space, idx_2) in [addSpace(idx, message)]"
            :key="idx_2"
          >
            <Message
              :message="message"
              :showOnlyMessage="!space"
              class="z-0"
              @mouseenter="handleEnter"
            />
            <div v-if="space" class="my-1" />
          </template>
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
import dayjs from "dayjs";

const messagesList = ref<HTMLDivElement>();

defineProps<{
  channel: Channel;
}>();

const route = useRoute();

const messagesStore = useMessagesStore();
const messages = ref<Array<MessageType>>();

const addSpace = (idx: number, currentMessage?: MessageType) => {
  if (!messages.value) return;
  const nextMessage = messages.value[idx + 1];
  if (!nextMessage || !currentMessage) return;

  const isSameAuthor = nextMessage?.author._id === currentMessage.author._id;
  const isSentAfter30Minutes = dayjs(nextMessage.createdAt).isBefore(
    dayjs(currentMessage.createdAt).subtract(30, "minutes"),
  );

  return !isSameAuthor || isSentAfter30Minutes;
};

const messagesFetching = ref(false);

const fetchMessages = async () => {
  messagesFetching.value = true;
  try {
    messages.value = await messagesStore.getMessages(
      route.params.channelID as string,
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
