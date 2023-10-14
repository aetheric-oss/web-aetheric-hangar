import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false,
    email: "",
  }),
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
    setEmail(email) {
      this.email = email;
    },
    clearEmail() {
      this.email = "";
    },
  },
});
