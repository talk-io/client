<template>
  <div class="px-chat w-full group">
    <div v-if="showOnlyMessage" class="flex items-center gap-2 w-full py-0.5">
      <span
        class="text-header-secondary w-14 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >{{ date.format(MESSAGE) }}</span
      >
      <p>{{ message.content }}</p>
    </div>
    <div
      v-else
      :class="{
        'opacity-50': !message._id,
      }"
      class="flex w-full items-center py-0.5 gap-2"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <Icon
        class="text-5xl w-14 text-header-secondary"
        icon="mdi:face-man-profile"
      />
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <h3
            class="font-semibold text-lg -mt-1 -mb-0.5 hover:underline cursor-pointer"
          >
            {{ message.author.username }}
            <!--            <span class="text-header-description text-sm"-->
            <!--              >#{{ message.author.discriminator }}</span-->
            <!--            >-->
          </h3>
          <span class="text-header-description text-sm">{{
            formattedDate
          }}</span>
        </div>
        <p>
          {{ message.content }}
        </p>
      </div>
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
