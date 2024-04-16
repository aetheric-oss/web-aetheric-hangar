import type { IContactCreate, IContact } from "./contacts";
import type { ICompanyCreate, ICompany } from "./companies";
import type { IAddressCreate, IAddress } from "./addresses";
import type {
  IAdvancedSearchFilter,
  IApiFactory,
  IGetForIdRequest,
} from "../types";

export interface IUsersModule extends IApiFactory<IUser> {
  get: (request: IGetForIdRequest) => Promise<[IUser | undefined, boolean]>;

  getByUsername: (
    request: IUserGetByUsername
  ) => Promise<[IUser | undefined, boolean]>;

  create: (request: IUserCreate) => Promise<string | undefined>;
  addCompany: (request: IUserCompany) => Promise<boolean>;
  updateCompany: (request: IUserCompany) => Promise<boolean>;
  addContact: (request: IUserContact) => Promise<boolean>;
  updateContact: (request: IUserContact) => Promise<boolean>;
  addAddress: (request: IUserAddress) => Promise<boolean>;
  updateAddress: (request: IUserAddress) => Promise<boolean>;
  addPaymentMethod: (request: IUserPaymentMethod) => Promise<boolean>;
  updatePaymentMethod: (request: IUserPaymentMethod) => Promise<boolean>;

  updatePrivacySettings: (request: IUserPrivacySettings) => Promise<boolean>;

  getCompanies: (request: IGetForIdRequest) => Promise<[ICompany[], boolean]>;
  getContacts: (request: IGetForIdRequest) => Promise<[IContact[], boolean]>;
  getAddresses: (request: IGetForIdRequest) => Promise<[IAddress[], boolean]>;
  getPaymentMethods: (
    request: IGetForIdRequest
  ) => Promise<[IPaymentMethod[], boolean]>;
  getPrivacySettings: (
    request: IGetForIdRequest
  ) => Promise<[IPrivacySettings, boolean]>;

  filter: (request: IAdvancedSearchFilter) => Promise<[IUser[], boolean]>;
}

export interface IUserGetByUsername {
  username: string;
}
export interface IUserUpdateRequest {
  uuid: string;
  data: IUser;
}
export interface IUser extends IUserCreate {
  uuid: string;
}
export interface IUserCreate {
  uuid?: string;
  username: string;
  name: string;
  publicName: string;
  arrowBalance: string;
  profilePicture: string;
}
export interface IUserContact {
  uuid: string;
  contact: IContactCreate | IContact;
}
export interface IUserCompany {
  uuid: string;
  company: ICompanyCreate | ICompany;
}
export interface IUserAddress {
  uuid: string;
  address: IAddressCreate | IAddress;
}
export interface IUserPaymentMethod {
  uuid: string;
  method: IPaymentMethod | IPaymentMethodCreate;
}
export interface IUserPrivacySettings {
  uuid: string;
  privacySettings: IPrivacySettings;
}
export interface IPrivacySetting {
  name: string;
  checked: boolean;
}
export interface IPrivacySettings {
  [key: string]: IPrivacySetting[];
}
export interface IPaymentMethod extends IPaymentMethodCreate {
  uuid: string;
}
export interface IPaymentMethodCreate {
  type: string;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
}
