<template>
  <div class="bg-secondary">
    <div class="flex flex-col gap-2 relative">
      <VerticalTransition
        v-slot="{
          handleEnter,
          handleLeave,

          HighlightedDiv,
        }"
        :additionalSpace="16 * 4"
      >
        <span
          ref="members_title"
          class="text-header-secondary font-medium text-base px-3"
        >
          MEMBERS &dash; {{ members.length }}
        </span>
        <ul class="flex flex-col" @mouseleave="handleLeave">
          <component :is="HighlightedDiv" class="!bg-card" />
          <Member
            v-for="member in members"
            :id="member._id"
            :key="member._id"
            :user="member"
            class="z-20"
            @mouseenter="handleEnter(member._id)"
          />
        </ul>
      </VerticalTransition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Guild } from "@/types/auth";
import { computed, ref } from "vue";
import { useMembersStore } from "@/stores/members";
import Member from "@/components/ui/guild/member.vue";
import VerticalTransition from "@/components/animations/VerticalTransition.vue";

const props = defineProps<{
  guild: Guild;
}>();

const membersStore = useMembersStore();
const members_title = ref<HTMLSpanElement>();

const members = computed(() => membersStore.getMembers(props.guild._id));
</script>
