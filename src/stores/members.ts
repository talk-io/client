import { defineStore } from "pinia";
import { ref } from "vue";
import type { BasicUser } from "@/types/auth";

export const useMembersStore = defineStore("members", () => {
  const state = ref<Map<string, Array<BasicUser>>>(new Map());

  const getMembers = (guildID: string): Array<BasicUser> => {
    const members = state.value.get(guildID);
    if (!members) state.value.set(guildID, []);
    return state.value.get(guildID) || [];
  };
  const getMember = (guildID: string, memberID: string) => {
    return getMembers(guildID).find((member) => member._id === memberID);
  };

  const setMember = (guildID: string, member: BasicUser) => {
    const members = getMembers(guildID);
    members.push(member);
  };
  const setMembers = (guildWithMembers: Record<string, Array<BasicUser>>) => {
    Object.entries(guildWithMembers).forEach(([guildID, members]) => {
      state.value.set(guildID, members);
    });
  };

  return {
    getMembers,
    getMember,

    setMembers,
    setMember,
  };
});
