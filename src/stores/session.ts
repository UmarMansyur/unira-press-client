import { defineStore } from "pinia";

export const useSession = defineStore({
  id: "session",
  state: () => <any>({
    user: null,
  }),
  getters: {
    getUser: (state) => state.user,
  },
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    setRole(role: string) {
      this.user.role = role;
    },
    logout() {
      this.user = null;
    },
  },
});
