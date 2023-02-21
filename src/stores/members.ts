import { defineStore } from "pinia";
import { ref } from "vue";
import type { BasicUser } from "@/types/auth";
import { useUsersStore } from "@/stores/users";

export const useMembersStore = defineStore("members", () => {
  const state = ref<Map<string, Array<BasicUser>>>(new Map());
  const usersStore = useUsersStore();

  const getMembers = (guildID: string): Array<BasicUser> => {
    return state.value.get(guildID) as Array<BasicUser>;
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
      const computedMembers = members.map((member) =>
        usersStore.getUser(member._id),
      );
      state.value.set(guildID, computedMembers);
    });
  };

  return {
    getMembers,
    getMember,

    setMembers,
    setMember,
  };
});
