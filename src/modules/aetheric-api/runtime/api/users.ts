import ApiFactory from "../";
import type {
  IUsersModule,
  IUserGetByUsername,
  IUserCreate,
  IUserContact,
  IUserPaymentMethod,
  IUserPrivacySettings,
  IPaymentMethod,
  IPaymentMethodCreate,
  IPrivacySettings,
  IUserAddress,
  IUserCompany,
  IUser,
} from "../types/users";
import type { ICompany } from "../types/companies";
import type { IContact, IContactCreate } from "../types/contacts";
import type { IAddress, IAddressCreate } from "../types/addresses";
import type { IAdvancedSearchFilter, IGetForIdRequest } from "../types";

class UsersModule extends ApiFactory<IUser> implements IUsersModule {
  resource = "/users";

  // ----------------------- get user data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IUser | undefined, boolean]> => {
    return await this.get(request);
  };

  // ----------------------- get user data for given username --------------------- //
  async getByUsername(
    this: UsersModule,
    request: IUserGetByUsername
  ): Promise<[IUser | undefined, boolean]> {
    const result = await this.call<IUser>(
      "POST",
      `${this.resource}/get`,
      request
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [undefined, false];
    }

    return [result.data.value, true];
  }

  // ----------------------- create new user --------------------- //
  async create(request: IUserCreate): Promise<string | undefined> {
    return await super.create(request);
  }

  // ----------------------- add new company for user --------------------- //
  async addCompany(this: UsersModule, request: IUserCompany): Promise<boolean> {
    const result = await super.call<ICompany>(
      "PUT",
      `${this.resource}/companies/${request.uuid}`,
      request.company
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- update company for user --------------------- //
  async updateCompany(
    this: UsersModule,
    request: IUserCompany
  ): Promise<boolean> {
    const result = await super.call<ICompany>(
      "PATCH",
      `${this.resource}/companies/${request.uuid}`,
      request.company
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- get companies for user --------------------- //
  async getCompanies(
    this: UsersModule,
    request: IGetForIdRequest
  ): Promise<[ICompany[], boolean]> {
    const result = await super.call<ICompany[]>(
      "GET",
      `${this.resource}/companies/${request.uuid}`
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [[], false];
    }

    return [result.data.value, true];
  }

  // ----------------------- add new contact info for user --------------------- //
  async addContact(this: UsersModule, request: IUserContact): Promise<boolean> {
    const result = await super.call<IContactCreate>(
      "PUT",
      `${this.resource}/contacts/${request.uuid}`,
      request.contact
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  async updateContact(
    this: UsersModule,
    request: IUserContact
  ): Promise<boolean> {
    const result = await super.call<IContactCreate>(
      "PATCH",
      `${this.resource}/contacts/${request.uuid}`,
      request.contact
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- get contacts for user --------------------- //
  async getContacts(
    this: UsersModule,
    request: IGetForIdRequest
  ): Promise<[IContact[], boolean]> {
    const result = await super.call<IContact[]>(
      "GET",
      `${this.resource}/contacts/${request.uuid}`
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [[], false];
    }

    return [result.data.value, true];
  }

  // ----------------------- add new address info for user --------------------- //
  async addAddress(this: UsersModule, request: IUserAddress): Promise<boolean> {
    const result = await super.call<IAddressCreate>(
      "PUT",
      `${this.resource}/addresses/${request.uuid}`,
      request.address
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  async updateAddress(
    this: UsersModule,
    request: IUserAddress
  ): Promise<boolean> {
    const result = await super.call<IAddressCreate>(
      "PATCH",
      `${this.resource}/addresses/${request.uuid}`,
      request.address
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- get addresses for user --------------------- //
  async getAddresses(
    this: UsersModule,
    request: IGetForIdRequest
  ): Promise<[IAddress[], boolean]> {
    const result = await super.call<IAddress[]>(
      "GET",
      `${this.resource}/addresses/${request.uuid}`
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [[], false];
    }

    return [result.data.value, true];
  }

  // ----------------------- add new payment method for user --------------------- //
  async addPaymentMethod(
    this: UsersModule,
    request: IUserPaymentMethod
  ): Promise<boolean> {
    const result = await super.call<IPaymentMethodCreate>(
      "PUT",
      `${this.resource}/payment/${request.uuid}`,
      request.method
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  async updatePaymentMethod(
    this: UsersModule,
    request: IUserPaymentMethod
  ): Promise<boolean> {
    const result = await super.call<IPaymentMethodCreate>(
      "PATCH",
      `${this.resource}/payment/${request.uuid}`,
      request.method
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- get payment methods for user --------------------- //
  async getPaymentMethods(
    this: UsersModule,
    request: IGetForIdRequest
  ): Promise<[IPaymentMethod[], boolean]> {
    const result = await super.call<IPaymentMethod[]>(
      "GET",
      `${this.resource}/payment/${request.uuid}`
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [[], false];
    }

    return [result.data.value, true];
  }

  // ----------------------- update user's privacy settings --------------------- //
  async updatePrivacySettings(
    this: UsersModule,
    request: IUserPrivacySettings
  ): Promise<boolean> {
    const result = await super.call<IUserPrivacySettings>(
      "POST",
      `${this.resource}/privacy/${request.uuid}`,
      request.privacySettings
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return false;
    }

    return true;
  }
  // ----------------------- get privacy settings for user --------------------- //
  async getPrivacySettings(
    this: UsersModule,
    request: IGetForIdRequest
  ): Promise<[IPrivacySettings, boolean]> {
    const result = await super.call<IPrivacySettings>(
      "GET",
      `${this.resource}/privacy/${request.uuid}`
    );

    if (result.status.value === "error") {
      this.error = result.error.value?.message;
      return [{}, false];
    }

    return [result.data.value, true];
  }

  // -------------------- get users for filter ------------------ //
  async filter(
    this: UsersModule,
    request: IAdvancedSearchFilter
  ): Promise<[IUser[], boolean]> {
    return await super.filter(request);
  }
}

export default UsersModule;
