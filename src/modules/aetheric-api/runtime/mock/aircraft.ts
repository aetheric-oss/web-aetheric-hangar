import ApiFactory from "../";

import type {
  IAircraftModule,
  IAircraft,
  IAircraftCreate,
} from "../types/aircraft";
import type {
  IAdvancedSearchFilter,
  IFilterOption,
  IGetForIdRequest,
} from "../types";
import { ComparisonOperator, PredicateOperator } from "../types";
import { useAircraft, useCompanyProfiles } from "../composables/useMock";
import { useLocalStorage } from "@vueuse/core";

class AircraftModule extends ApiFactory<IAircraft> implements IAircraftModule {
  resource: string;

  constructor(fetchOptions: any, currentCompany: Ref<string>) {
    super(fetchOptions);

    this.resource = currentCompany.value;

    // load state
    useState<{ [key: string]: IAircraft }>("aircraft", () =>
      computed(() => {
        const aircraftArr: { [key: string]: IAircraft } = {};
        for (const [id, aircraft] of Object.entries(useAircraft().value)) {
          aircraftArr[id] = reactive(aircraft);
        }
        return aircraftArr;
      })
    );
  }

  // ------------------------ get aircraft data ---------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IAircraft | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (request.uuid) {
      const aircraft = useState<{ [key: string]: IAircraft }>("aircraft").value[
        request.uuid
      ];
      if (!aircraft) {
        this.error = "No aircraft found for given id.";
        return [undefined, false];
      } else {
        return [aircraft, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- create new aircraft --------------------- //
  async create(
    this: AircraftModule,
    request: IAircraftCreate
  ): Promise<string> {
    // clear this.error before we do anything
    this.error = undefined;

    const uuid: string = crypto.randomUUID();
    const aircraft = request as IAircraft;
    aircraft.uuid = uuid;
    useAircraft().value[uuid] = reactive(aircraft);
    return uuid;
  }

  // --------------------- update existing aircraft ------------------ //
  async update(this: AircraftModule, request: IAircraft): Promise<boolean> {
    // clear this.error before we do anything
    this.error = undefined;
    useAircraft().value[request.uuid] = reactive(request);
    return true;
  }

  // -------------------- get aircraft for filter ------------------ //
  // TODO: This doesn't filter properly yet, never goes back to the "filter_later" part
  async filter(
    this: AircraftModule,
    request: IAdvancedSearchFilter
  ): Promise<[IAircraft[], boolean]> {
    // clear this.error before we do anything
    this.error = undefined;

    const data: IAircraft[] = [];
    const filter_later: IFilterOption[] = [];

    // get aircraft ids for current company
    const aircraftIds: string[] =
      useCompanyProfiles().value[this.resource].aircraft;

    for (const [aircraftId, aircraft] of Object.entries<IAircraft>(
      useState<{ [key: string]: IAircraft }>("aircraft").value
    )) {
      if (aircraftIds.find((id) => id == aircraftId)) {
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
            if (
              filter.search_field === "uuid" &&
              aircraft.uuid === compare_str
            ) {
              data.push(aircraft);
            }
            if (
              filter.search_field === "name" &&
              aircraft.name === compare_str
            ) {
              data.push(aircraft);
            }
            if (
              filter.search_field === "owner" &&
              aircraft.owner === compare_str
            ) {
              data.push(aircraft);
            }
          }
          if (
            filter.predicate_operator === PredicateOperator.ILIKE ||
            filter.predicate_operator === PredicateOperator.LIKE
          ) {
            let find_str: string = filter.search_value[0];
            let compare_str: string = "";
            if (filter.search_field === "uuid") {
              compare_str = aircraft.uuid;
            }
            if (filter.search_field === "name") {
              compare_str = aircraft.name;
            }
            if (filter.search_field === "owner") {
              compare_str = aircraft.owner;
            }
            if (PredicateOperator.ILIKE) {
              find_str = find_str.toLowerCase();
              compare_str = compare_str.toLowerCase();
            }
            if (compare_str.includes(find_str)) {
              data.push(aircraft);
            }
          }
        }
      }
    }
    return [data as IAircraft[], true];
  }
}

export default AircraftModule;
