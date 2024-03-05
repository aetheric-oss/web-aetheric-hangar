import { defineStore } from "pinia";
import { useLocalStorage, type RemovableRef } from "@vueuse/core";

export type authState = {
  _isLoggedIn: RemovableRef<boolean>;
  _username: RemovableRef<string>;
};

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      _isLoggedIn: useLocalStorage("aetheric/auth/logged_in", false),
      _username: useLocalStorage("aetheric/auth/username", ""),
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
