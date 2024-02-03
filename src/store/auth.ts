import { defineStore } from "pinia";

export type authState = {
  isLoggedIn: boolean;
  email: string;
};

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      isLoggedIn: false,
      email: "",
    } as authState;
  },
  getters: {
    userAuth: (state) => state.isLoggedIn,
    userEmail: (state) => state.email,
  },
  actions: {
    login() {
      this.isLoggedIn = true;
    },
    logout() {
      this.isLoggedIn = false;
    },
    setEmail(email: string) {
      this.email = email;
    },
    clearEmail() {
      this.email = "";
    },
  },
});
