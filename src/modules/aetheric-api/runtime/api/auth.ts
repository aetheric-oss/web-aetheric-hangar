import ApiFactory from "../";
import type { IAuthModule, ILoginRequest, ILoginResponse } from "../types/auth";

class AuthModule extends ApiFactory<ILoginRequest> implements IAuthModule {
  resource = "/auth";

  login = async (credentials: ILoginRequest): Promise<ILoginResponse> => {
    const result = await this.call<ILoginResponse>(
      "POST",
      `${this.resource}/login`,
      credentials
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return { success: false };
    }

    return result.data.value;
  };
}

export default AuthModule;
