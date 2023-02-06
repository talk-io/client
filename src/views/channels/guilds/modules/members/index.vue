<template>
  <div class="bg-secondary">
    <Member v-for="member in members" :key="member._id" :user="member" />
  </div>
</template>

<script lang="ts" setup>
import type { Guild } from "@/types/auth";
import { computed } from "vue";
import { useMembersStore } from "@/stores/members";
import Member from "@/components/ui/guild/member.vue";

const props = defineProps<{
  guild: Guild;
}>();

const membersStore = useMembersStore()

const members = computed(() => membersStore.getMembers(props.guild._id))
console.log({weee: members.value});
</script>