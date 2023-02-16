<template>
  <div
    class="flex h-14 items-center bg-message-create-back rounded-lg drop-shadow-2xl gap-3 px-5"
  >
    <Icon icon="ep:circle-plus-filled" />
    <input
      v-model="message"
      :placeholder="`Message #${channel.name}`"
      class="border-0 rounded-md p-2 bg-transparent disabled:opacity-50 w-full focus:outline-none"
      @keydown="emitTyping"
      @keydown.enter.prevent="submit"
    />
    <div class="flex gap-3">
      <Icon icon="fluent:gif-16-filled" />
      <Icon icon="mdi:emoji-robot-excited" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Channel } from "@/types/auth";
import Icon from "@/components/ui/Icon.vue";
import { ref } from "vue";
import { useMessagesStore } from "@/stores/messages";
import { useChannelsStore } from "@/stores/channels";

const props = defineProps<{
  channel: Channel;
}>();

const messagesStore = useMessagesStore();
const channelsStore = useChannelsStore();

const message = ref<string>("");
const emits = defineEmits(["onMessageCreate"]);

const submit = async () => {
  const msg = message.value?.trim();
  if (!msg.length) return;
  message.value = "";
  await messagesStore.createMessage({
    content: msg,
    channelID: props.channel._id,
  });
  emits("onMessageCreate");
  channelsStore.emitUserStopTyping(props.channel._id);
};

const timeout = ref<number | null>(null);
const emitTyping = () => {
  if (timeout.value) clearTimeout(timeout.value);
  channelsStore.emitUserTyping(props.channel._id);

  timeout.value = setTimeout(() => {
    channelsStore.emitUserStopTyping(props.channel._id);
  }, 3000);
};
</script>
