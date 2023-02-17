import { defineStore } from "pinia";
import { ref } from "vue";
import type { BasicUser } from "@/types/auth";
import type { PresenceStatus } from "@/types/enums";

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
    const index = members.findIndex((m) => m._id === member._id);
    if (index !== -1) return;
    members.push(member);
  };
  const setMembers = (guildID: string, members: Array<BasicUser>) => {
    state.value.set(guildID, members);
  };

  return {
    getMembers,
    getMember,

    setMembers,
    setMember,
  };
});
