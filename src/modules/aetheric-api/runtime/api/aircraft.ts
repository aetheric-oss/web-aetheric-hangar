import ApiFactory from "../";
import type { Ref } from "vue";
import type { IGetForIdRequest, IAdvancedSearchFilter } from "../types";
import type {
  IAircraftModule,
  IAircraftCreate,
  IAircraft,
} from "../types/aircraft";

class AircraftModule extends ApiFactory<IAircraft> implements IAircraftModule {
  resource: string;

  constructor(fetchOptions: any, currentCompany: string) {
    super(fetchOptions);
    this.resource = `/assets/supplier/${currentCompany}/aircraft`;
  }

  // ----------------------- get company data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IAircraft | undefined, boolean]> => {
    return await this.get(request);
  };

  // ----------------------- create new company --------------------- //
  async create(
    this: AircraftModule,
    request: IAircraftCreate
  ): Promise<string | undefined> {
    return await super.create(request);
  }

  // -------------------- get vehicles for filter ------------------ //
  async filter(
    this: AircraftModule,
    request: IAdvancedSearchFilter
  ): Promise<[IAircraft[], boolean]> {
    return await super.filter(request);
  }
}

export default AircraftModule;
