import ApiFactory from "../";

import type {
  IAddress,
  IAddressesModule,
  IAddressCreate,
} from "../types/addresses";
import type {
  IAdvancedSearchFilter,
  IFilterOption,
  IGetForIdRequest,
} from "../types";
import { ComparisonOperator, PredicateOperator } from "../types";
import { useAddresses } from "../composables/useMock";

class AddressesModule
  extends ApiFactory<IAddress>
  implements IAddressesModule
{
  resource = "/addresses";

  private addresses: Ref<{ [key: string]: IAddress }>;
  constructor(fetchOptions: any) {
    super(fetchOptions);
    this.addresses = useState<{ [key: string]: IAddress }>(
      "addresses",
      () =>
        computed(() => {
          const addresses: { [key: string]: IAddress } = {};
          for (const [id, address] of Object.entries(useAddresses().value)) {
            addresses[id] = reactive(address);
          }
          return addresses;
        })
    );
  }

  // ------------------------ get address data ---------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IAddress | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (request.uuid) {
      const address: IAddress = this.addresses.value[request.uuid];
      if (!address) {
        this.error = "No address found for given id.";
        return [undefined, false];
      } else {
        return [address, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- create new address --------------------- //
  async create(
    this: AddressesModule,
    request: IAddressCreate
  ): Promise<string> {
    // clear this.error before we do anything
    this.error = undefined;

    const uuid: string = crypto.randomUUID();
    const address = request as IAddress;
    address.uuid = uuid;
    useAddresses().value[uuid] = reactive(address);
    return uuid;
  }

  // ----------------------- update existing address --------------------- //
  async update(this: AddressesModule, request: IAddress): Promise<boolean> {
    // clear this.error before we do anything
    this.error = undefined;
    useAddresses().value[request.uuid] = reactive(request);
    return true;
  }

  // -------------------- get addresses for filter ------------------ //
  // TODO: This doesn't filter properly yet, never goes back to the "filter_later" part
  async filter(
    this: AddressesModule,
    request: IAdvancedSearchFilter
  ): Promise<[IAddress[] | undefined, boolean]> {
    // clear this.error before we do anything
    this.error = undefined;

    const data: IAddress[] = [];
    const filter_later: IFilterOption[] = [];

    for (const [addressId, address] of Object.entries<IAddress>(
      useState<{ [key: string]: IAddress }>("addresses").value
    )) {
      for (const filter of request.filters) {
        if (
          filter.comparison_operator &&
          filter.comparison_operator === ComparisonOperator.AND
        ) {
          filter_later.push(filter);
          break;
        }

        if (filter.predicate_operator === PredicateOperator.EQUALS) {
          const compare_str = filter.search_value[0];
          if (filter.search_field === "uuid" && address.uuid === compare_str) {
            data.push(address);
          }
          if (filter.search_field === "name" && address.name === compare_str) {
            data.push(address);
          }
        }
        if (
          filter.predicate_operator === PredicateOperator.ILIKE ||
          filter.predicate_operator === PredicateOperator.LIKE
        ) {
          let find_str: string = filter.search_value[0];
          let compare_str: string = "";
          if (filter.search_field === "uuid") {
            compare_str = address.uuid;
          }
          if (filter.search_field === "name" && address.name) {
            compare_str = address.name;
          }
          if (PredicateOperator.ILIKE) {
            find_str = find_str.toLowerCase();
            compare_str = compare_str.toLowerCase();
          }
          if (compare_str.includes(find_str)) {
            data.push(address);
          }
        }
      }
    }
    return [data, true];
  }
}

export default AddressesModule;
