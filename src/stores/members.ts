import { defineStore } from "pinia";
import { ref } from "vue";
import type { BasicUser } from "@/types/auth";

export const useMembersStore = defineStore("members", () => {
  const state = ref<Map<string, Map<string, BasicUser>>>(new Map());

  const getMembers = (guildID: string): Array<BasicUser> => [
    ...(state.value.get(guildID)?.values() || []),
  ];
  const getMember = (guildID: string, memberID: string) =>
    state.value.get(guildID)?.get(memberID);

  const setMembers = (guildID: string, members: Array<BasicUser>) => {
    const memberMap = new Map(members.map((member) => [member._id, member]));
    state.value.set(guildID, memberMap);
  };

  return {
    getMembers,
    getMember,
    setMembers,
  };
});
