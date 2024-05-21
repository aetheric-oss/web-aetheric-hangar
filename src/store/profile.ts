import { defineStore } from "pinia";
import type { IUser } from "~/modules/aetheric-api";
import { useLocalStorage } from "@vueuse/core";
import { flushAethericApi } from "~/modules/aetheric-api/runtime/composables/useAethericApi";

interface IProfileState {
  _user: IUser | undefined;
}

export const useProfileStore = defineStore({
  id: "profile-store",
  state: (): IProfileState => {
    return {
      _user: undefined,
    };
  },

  actions: {
    setTheme(theme: string) {
      const curTheme = useCurrentTheme();
      if (theme === "auto") {
        theme = usePreferredTheme();
      }
      curTheme.value = theme;
    },
    switchAccount(uuid: string) {
      const currentCompany = useCurrentCompany();
      currentCompany.value = uuid;
      flushAethericApi();
    },
    async getUser(): Promise<IUser> {
      const username = useCurrentUsername();
      if (this._user === undefined && username.value !== "") {
        const $api = useAethericApi(useCurrentCompany().value);
        const [user, success] = await $api.users.getByUsername({
          username: username.value,
        });
        if (user) {
          this._user = user;

          const currentCompany = useCurrentCompany();
          if (currentCompany.value === "") {
            let [result, success] = await $api.users.getCompanies({
              uuid: user.uuid,
            });
            if (success && result) {
              if (result.length > 0) {
                currentCompany.value = result[0].uuid;
                flushAethericApi();
              }
            }
          }
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
