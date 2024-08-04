import { defineStore } from "pinia";

const useSession = defineStore({
  id: "session",
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
  },
  actions: {
    setUser(user: any) {
      this.user = user;
    },
    logout() {
      this.user = null;
    },
  },
});

export default useSession;
