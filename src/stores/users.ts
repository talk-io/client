import { defineStore } from "pinia";
import type { BasicUser } from "@/types/auth";
import { ref } from "vue";
import type { PresenceStatus } from "@/types/enums";

export const useUsersStore = defineStore("users", () => {
  const users = ref<Map<string, BasicUser>>(new Map());

  const getUser = (userID: string) => users.value.get(userID) as BasicUser;
  const setUser = (user: BasicUser) => {
    users.value.set(user._id, user);
  };
  const setUsers = (users: Array<BasicUser>) => {
    users.forEach((user) => setUser(user));
  };

  const setUserStatus = (userID: string, status: PresenceStatus) => {
    const member = getUser(userID);
    console.log({ status });
    if (!member) return;
    member.status = status;
  };

  return {
    getUser,

    setUser,
    setUsers,
    setUserStatus,
  };
});
