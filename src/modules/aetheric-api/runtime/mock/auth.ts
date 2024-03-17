import type { IAuthModule } from "../types/auth";
import ApiFactory from "../";

import type { ILoginRequest, ILoginResponse } from "../types/auth";
import { useCredentials } from "../composables/useMock";

class AuthModule extends ApiFactory<ILoginRequest> implements IAuthModule {
  resource = "/auth";

  private credentials = useCredentials();

  login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    // clear this.error before we do anything
    this.error = undefined;

    // default assume false login success as a safety guard
    let data: ILoginResponse = { success: false };

    if (credentials.login_type === "local") {
      const user = this.credentials.value.find(
        (el) =>
          el.username === credentials.username &&
          el.password === credentials.password
      );
      if (!user) {
        this.error =
          "The password and/or username is wrong. <br>We can't log you into the platform.";
      } else {
        data = { success: true, uuid: user.uuid };
      }
    }

    return data;
  };
}

export default AuthModule;
