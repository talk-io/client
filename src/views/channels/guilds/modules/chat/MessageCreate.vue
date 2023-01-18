<template>
  <div
    class="flex h-14 items-center bg-message-create-back rounded-lg gap-3 px-5"
  >
    <Icon icon="ep:circle-plus-filled" />
    <input
      v-model="message"
      :placeholder="`Message #${channel.name}`"
      class="border-0 rounded-md p-2 bg-transparent disabled:opacity-50 w-full focus:outline-none"
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
import { nanoid } from "nanoid";

const props = defineProps<{
  channel: Channel;
}>();

const message = ref<string>("");
const emits = defineEmits(["onMessageCreate"]);
const messagesStore = useMessagesStore();

const submit = async () => {
  const msg = message.value?.trim();
  if (!msg.length) return;
  message.value = "";
  await messagesStore.createMessage({
    _id: nanoid(),
    content: msg,
    channelID: props.channel._id
  });
  emits("onMessageCreate");
};
</script>
