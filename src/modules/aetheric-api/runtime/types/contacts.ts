import { type EnumContact } from "./enums";
import type {
  IGetForIdRequest,
  IAdvancedSearchFilter,
  IApiFactory,
} from "../types";

export interface IContactsModule extends IApiFactory<IContact> {
  get: (request: IGetForIdRequest) => Promise<[IContact | undefined, boolean]>;

  create(request: IContactCreate): Promise<string | undefined>;
  update(request: IContact): Promise<boolean>;

  filter(request: IAdvancedSearchFilter): Promise<[IContact[], boolean]>;
}

export interface IContactUpdateRequest {
  uuid: string;
  data: IContact;
}
export interface IContact extends IContactCreate {
  uuid: string;
  type: EnumContact;
}
export interface IContactCreate {
  type?: EnumContact;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
}
