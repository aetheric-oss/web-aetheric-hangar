/// <reference types='gsi' />

import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";

const handleGoogleLogin = async (response: CredentialResponse) => {
  const { $decodeJwt } = useNuxtApp();
  const decoded = $decodeJwt(response.credential) as IGoogleJwtResponse;

  console.log("User:", decoded);
  if (decoded && decoded.sub) {
    let success = false;
    let user_id = decoded.sub;
    const uuid: string = crypto.randomUUID();
    const user: IUser = {
      uuid: uuid,
      username: user_id,
      name: decoded.name,
      publicName: decoded.name,
      arrowBalance: "0",
      profilePicture: decoded.picture,
    };
    const authStore = useAuthStore();
    const profileStore = useProfileStore();

    authStore.login(decoded.sub as string);
    profileStore.switchUser(user);

    return true;
  }
  return false;
};

export default handleGoogleLogin;
