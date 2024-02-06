import { defineStore } from "pinia";

export type authState = {
  _isLoggedIn: boolean;
  _username: string;
};

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      _isLoggedIn: false,
      _username: "",
    } as authState;
  },
  actions: {
    login(username: string) {
      this._isLoggedIn = true;
      this._username = username;
    },
    logout() {
      this._isLoggedIn = false;
      this._username = "";
    },
  },
  getters: {
    isLoggedIn: (state) => state._isLoggedIn,
    username: (state) => state._username,
  },
});
