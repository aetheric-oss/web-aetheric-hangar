import ApiFactory from "../";
import type { IGetForIdRequest, IAdvancedSearchFilter } from "../types";
import type { IAddressesModule, IAddress, IAddressCreate } from "../types/addresses";

class AddressesModule extends ApiFactory<IAddress> implements IAddressesModule {
  resource = "/addresses";

  // ----------------------- get address data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IAddress | undefined, boolean]> => {
    return await this.get(request);
  };

  // ----------------------- create new address --------------------- //
  async create(request: IAddressCreate): Promise<string | undefined> {
    return await super.create(request);
  }

  // -------------------- get addresses for filter ------------------ //
  async filter(
    this: AddressesModule,
    request: IAdvancedSearchFilter
  ): Promise<[IAddress[], boolean]> {
    return await super.filter(request);
  }
}

export default AddressesModule;
