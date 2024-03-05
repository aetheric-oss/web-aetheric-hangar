/// <reference types='gsi' />

import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import type { IGoogleJwtResponse, IUser } from "~/modules/aetheric-api";

const handleGoogleLogin = async (response: CredentialResponse) => {
  const $api = useAethericApi();
  const { $decodeJwt } = useNuxtApp();
  const decoded = $decodeJwt(response.credential);

  console.log("User:", decoded);
  if (decoded && decoded.sub) {
    let success = false;
    let user;
    let user_id = decoded.sub;

    [user, success] = await $api.users.getByUsername({ username: user_id });
    if (!success) {
      // TODO: Should we blindly create a new user if we don't know the user yet like we do now?
      let uuid = await $api.users.create({
        username: user_id,
        name: decoded["name"] as string,
        publicName: decoded["name"] as string,
        arrowBalance: "0",
        profilePicture: decoded["picture"] as string,
      });
      if (uuid && decoded["email_verified"]) {
        success = await $api.users.addContact({
          uuid: uuid,
          contact: {
            type: EnumContact.EMAIL,
            value: decoded["email"] as string,
            isPrimary: true,
            isVerified: true,
          },
        });
        if (!success) {
          return false;
        }

        [user, success] = await $api.users.get({ uuid });
        if (!success || !user) {
          return false;
        }
      }
    }
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    authStore.login(decoded.sub as string);
    profileStore.$reset();
    return true;
  }
  return false;
};

export default handleGoogleLogin;
