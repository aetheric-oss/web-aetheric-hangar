import { useAuthStore } from "@/store/auth";
import { useProfileStore } from "@/store/profile";
import crypto from "crypto";

const handleDemoLogin = async (name: string, email: string) => {
  const $api = useAethericApi(useCurrentCompany());
  const runtimeConfig = useRuntimeConfig();

  let success = false;
  let user;
  [user, success] = await $api.users.getByUsername({ username: email });
  if (!success) {
    // Actually insert our user to the database, so we have a valid UUID
    const { data: user_id, status } = await useFetch<string>(
      "/contact/signup",
      {
        method: "POST",
        body: {
          email: email,
          display_name: name,
        },
        baseURL: runtimeConfig.public.api.backends.contact,
      }
    );

    if (user_id.value) {
      //let hash = crypto.createHash('md5').update(email.trim().toLowerCase).digest('hex');
      let uuid = await $api.users.create({
        uuid: user_id.value,
        username: email,
        name: name,
        publicName: name,
        arrowBalance: "0",
        profilePicture: "", //"https://www.gravatar.com/avatar/"+hash+".jpg",
      });
      if (uuid) {
        success = await $api.users.addContact({
          uuid,
          contact: {
            type: EnumContact.EMAIL,
            value: email,
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
    } else {
      return false;
    }
  }
  const authStore = useAuthStore();
  const profileStore = useProfileStore();

  authStore.login(email);
  profileStore.$reset();
  return true;
};

export default handleDemoLogin;
