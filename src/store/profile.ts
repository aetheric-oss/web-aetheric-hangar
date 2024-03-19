import { defineStore } from "pinia";
import type {
  IUser,
} from "~/modules/aetheric-api";
import { useLocalStorage } from "@vueuse/core";

interface IProfileState {
  _user: IUser | undefined;
  _currentCompany: string;
}

export const useProfileStore = defineStore({
  id: "profile-store",
  state: () : IProfileState => {
    return {
      _user: undefined,
      _currentCompany: "0",
    }
  },

  actions: {
    switchAccount(uuid: string) {
      this._currentCompany = uuid;
    },
    async getUser(): Promise<IUser> {
      const username = useLocalStorage("aetheric/auth/username", "");
      if (this._user === undefined && username.value !== "") {
        const $api = useAethericApi(useCurrentCompany());
        const [user, success] = await $api.users.getByUsername({
          username: username.value,
        });
        if (user) {
          this._user = user;
        }
      }
      return this._user
        ? this._user
        : {
            uuid: "",
            name: "",
            username: "",
            publicName: "",
            arrowBalance: "",
            profilePicture: "",
          };
    },
  },
});
