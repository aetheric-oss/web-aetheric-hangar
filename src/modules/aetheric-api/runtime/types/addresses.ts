import { type EnumAddress } from "./enums";
import type {
  IGetForIdRequest,
  IAdvancedSearchFilter,
  IApiFactory,
} from "../types";

export interface IAddressesModule extends IApiFactory<IAddress> {
  get: (request: IGetForIdRequest) => Promise<[IAddress | undefined, boolean]>;

  create(request: IAddressCreate): Promise<string | undefined>;
  update(request: IAddress): Promise<boolean>;

  filter(request: IAdvancedSearchFilter): Promise<[IAddress[], boolean]>;
}
export interface IAddressUpdateRequest {
  uuid: string;
  data: IAddress;
}
export interface IAddress extends IAddressCreate {
  uuid: string;
  type: EnumAddress;
}
export interface IAddressCreate {
  type?: EnumAddress;
  name?: string;
  city: string;
  street: string;
  street_number: string;
  postalCode: string;
  country_code: string;
  state?: string;
}
