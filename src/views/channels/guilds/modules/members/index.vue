<template>
  <div class="bg-secondary">
    <div class="flex flex-col gap-2 relative">
      <span
        ref="members_title"
        class="text-header-secondary font-medium text-base px-3"
      >
        MEMBERS &dash; {{ members.length }}
      </span>
      <div
        v-if="isVisible"
        :style="highlightedStyles"
        aria-hidden="true"
        class="bg-card brightness-110 w-full rounded-md transition-all absolute top-0 select-none"
      />
      <ul class="flex flex-col" @mouseleave="handleLeave">
        <Member
          v-for="member in members"
          :id="member._id"
          :key="member._id"
          :user="member"
          @mouseenter="handleEnter(member._id)"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Guild } from "@/types/auth";
  import { computed, ref } from "vue";
  import { useMembersStore } from "@/stores/members";
  import Member from "@/components/ui/guild/member.vue";
  import { useVerticalTransitionAnimation } from "@/composables/useVerticalTransitionAnimation";

  const props = defineProps<{
    guild: Guild;
  }>();

  const membersStore = useMembersStore();
  const members_title = ref<HTMLSpanElement>();

  const members = computed(() => membersStore.getMembers(props.guild._id));

  const {
    highlightedStyles,
    isVisible,

    handleEnter,
    handleLeave,
  } = useVerticalTransitionAnimation({
    additionalSpace: 16 * 4,
  });
</script>
