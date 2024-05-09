import type {
  IGetForIdRequest,
  IAdvancedSearchFilter,
  IApiFactory,
} from "../types";
import type { EnumVehicleState } from "./enums";

export interface IAircraftModule extends IApiFactory<IAircraft> {
  get: (
    this: IAircraftModule,
    request: IGetForIdRequest
  ) => Promise<[IAircraft | undefined, boolean]>;

  create(
    this: IAircraftModule,
    request: IAircraftCreate
  ): Promise<string | undefined>;
  update(this: IAircraftModule, request: IAircraft): Promise<boolean>;

  filter(
    this: IAircraftModule,
    request: IAdvancedSearchFilter
  ): Promise<[IAircraft[], boolean]>;
}

export interface IAircraftUpdateRequest {
  uuid: string;
  data: IAircraft;
}
export interface IAircraft extends IAircraftCreate {
  uuid: string;
}
export interface IAircraftCreate {
  name: string;
  imgSrc: string;
  status: EnumVehicleState;
  owner: string;
}
