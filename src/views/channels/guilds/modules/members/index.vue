<template>
  <div class="bg-secondary">
    <VerticalTransition
      v-slot="{
        handleEnter,
        handleLeave,

        HighlightedDiv,
      }"
      :additionalSpace="16 * 4"
    >
      <div class="overflow-y-auto h-full">
        <div class="flex flex-col gap-3 relative" @mouseleave="handleLeave">
          <component
            :is="HighlightedDiv"
            v-if="HighlightedDiv"
            class="!bg-card"
          />
          <template v-for="stat in members" :key="stat.title">
            <MemberGroup
              v-if="stat.members.length"
              :count="stat.members.length"
              :title="stat.title"
            >
              <Member
                v-for="member in stat.members"
                :key="member._id"
                :user="member"
                @mouseenter="handleEnter"
              />
            </MemberGroup>
          </template>
        </div>
      </div>
    </VerticalTransition>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useMembersStore } from "@/stores/members";
import Member from "@/components/ui/guild/member.vue";
import VerticalTransition from "@/components/animations/VerticalTransition.vue";
import { PresenceStatus } from "@/types/enums";
import MemberGroup from "@/components/ui/guild/MemberGroup.vue";
import { useRoute } from "vue-router";

const route = useRoute()
const membersStore = useMembersStore();

const members = computed(() => {
  const membrs = membersStore.getMembers(route.params.guildID as string);

  const online = membrs.filter((m) => m.status === PresenceStatus.Online);
  const offline = membrs.filter(
    (m) =>
      m.status === PresenceStatus.Offline ||
      m.status === PresenceStatus.Invisible,
  );

  return [
    {
      title: "ONLINE",
      members: online,
    },
    {
      title: "OFFLINE",
      members: offline,
    },
  ];
});
</script>
