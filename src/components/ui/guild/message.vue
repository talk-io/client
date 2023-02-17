<template>
  <div class="px-chat w-full group">
    <div
      v-if="showOnlyMessage"
      class="grid grid-cols-[3.5rem_1fr] gap-x-1 items-center w-full py-0.5"
    >
      <span
        class="text-header-secondary w-14 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {{ date.format(MESSAGE) }}
      </span>
      <p>{{ message.content }}</p>
    </div>
    <div
      v-else
      :class="{
        'opacity-50': !message._id,
      }"
      class="grid grid-rows-[1.5rem_1fr] gap-x-1 grid-cols-chat w-full py-0.5"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon
        class="text-5xl row-span-2 text-header-secondary"
        icon="mdi:face-man-profile"
      />
      <div class="flex items-center gap-2">
        <h3
          class="font-semibold text-lg -mt-1 -mb-0.5 hover:underline cursor-pointer"
        >
          {{ message.author.username }}
        </h3>
        <span class="text-header-description text-sm">{{ formattedDate }}</span>
      </div>
      <p class="whitespace-pre-wrap row-start-2 col-start-2 break-words break-all">
        {{ message.content }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message as MessageType } from "@/types/auth";
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import dayjs from "dayjs";
import { Formats } from "@/constants/dates";

const { MESSAGE } = Formats;
const props = defineProps<{
  message: MessageType;
  showOnlyMessage?: boolean;
}>();

const date = dayjs(props.message.createdAt);

const formattedDate = computed(() => {
  const isToday = date.isSame(dayjs(), "day");
  const isYesterday =
    !isToday && date.isSame(dayjs().subtract(1, "day"), "day");

  if (isToday) return date.format(`[Today at] ${MESSAGE}`);
  else if (isYesterday) return date.format(`[Yesterday at] ${MESSAGE}`);
  return date.format(MESSAGE);
});

const isHovered = ref(false);
</script>
