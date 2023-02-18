<template>
  <div
    class="grid grid-cols-[3rem_1fr_3rem] h-12 place-items-center bg-message-create-back rounded-lg drop-shadow-2xl"
  >
    <Icon class="!text-2xl" icon="ep:circle-plus-filled" />
    <div class="flex w-full">
      <input
        v-model="message"
        :placeholder="`Message #${channel.name}`"
        class="border-0 rounded-md py-2 bg-transparent disabled:opacity-50 w-full focus:outline-none break-normal whitespace-pre break-words"
        @keydown="emitTyping"
        @keydown.enter.prevent="submit"
      />
      <div class="flex gap-3 mr-3">
        <Icon icon="fluent:gif-16-filled" />
        <Icon icon="mdi:emoji-robot-excited" />
      </div>
    </div>
    <div class="border-l-2 border-solid border-hr w-full grid place-items-center">
      <Icon
        :class="{
        'text-logo-text': canSendMessage,
      }"
        :disabled="!canSendMessage" class="!text-2xl" icon="fluent:send-28-filled" @click.prevent="submit" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Channel as ChannelType } from "@/types/auth";
import Icon from "@/components/ui/Icon.vue";
import { computed, ref } from "vue";
import { useMessagesStore } from "@/stores/messages";
import { useChannelsStore } from "@/stores/channels";

const props = defineProps<{
  channel: ChannelType;
}>();

const messagesStore = useMessagesStore();
const channelsStore = useChannelsStore();

const message = ref<string>("");
const emits = defineEmits(["onMessageCreate"]);

const canSendMessage = computed(() => {
  const msg = message.value?.trim();
  return msg.length > 0;
});

const submit = async () => {
  const msg = message.value?.trim();
  if (!msg.length) return;
  message.value = "";
  await messagesStore.createMessage({
    content: msg,
    channelID: props.channel._id
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
