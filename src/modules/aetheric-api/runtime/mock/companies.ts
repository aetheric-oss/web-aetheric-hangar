import ApiFactory from "../";

import type {
  ICompaniesModule,
  ICompany,
  ICompanyCreate,
} from "../types/companies";
import type {
  IAdvancedSearchFilter,
  IFilterOption,
  IGetForIdRequest,
} from "../types";
import { ComparisonOperator, PredicateOperator } from "../types";
import { useCompanies } from "../composables/useMock";

class CompaniesModule extends ApiFactory<ICompany> implements ICompaniesModule {
  resource = "/companies";

  constructor(fetchOptions: any) {
    super(fetchOptions);

    // load state
    useState<{ [key: string]: ICompany }>("companies", () =>
      computed(() => {
        const companies: { [key: string]: ICompany } = {};
        for (const [id, company] of Object.entries(useCompanies().value)) {
          companies[id] = reactive(company);
        }
        return companies;
      })
    );
  }

  // ------------------------ get company data ---------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[ICompany | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (request.uuid) {
      const company = useState<{ [key: string]: ICompany }>("companies").value[
        request.uuid
      ];
      if (!company) {
        this.error = "No company found for given id.";
        return [undefined, false];
      } else {
        return [company, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- create new company --------------------- //
  async create(
    this: CompaniesModule,
    request: ICompanyCreate
  ): Promise<string> {
    // clear this.error before we do anything
    this.error = undefined;

    const uuid: string = crypto.randomUUID();
    const company = request as ICompany;
    company.uuid = uuid;
    useCompanies().value[uuid] = reactive(company);
    return uuid;
  }

  // --------------------- update existing company ------------------ //
  async update(this: CompaniesModule, request: ICompany): Promise<boolean> {
    // clear this.error before we do anything
    this.error = undefined;
    useCompanies().value[request.uuid] = reactive(request);
    return true;
  }

  // -------------------- get companies for filter ------------------ //
  // TODO: This doesn't filter properly yet, never goes back to the "filter_later" part
  async filter(
    this: CompaniesModule,
    request: IAdvancedSearchFilter
  ): Promise<[ICompany[] | undefined, boolean]> {
    // clear this.error before we do anything
    this.error = undefined;

    const data: ICompany[] = [];
    const filter_later: IFilterOption[] = [];

    for (const [companyId, company] of Object.entries<ICompany>(
      useState<{ [key: string]: ICompany }>("companies").value
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
          if (filter.search_field === "uuid" && company.uuid === compare_str) {
            data.push(company);
          }
          if (filter.search_field === "name" && company.name === compare_str) {
            data.push(company);
          }
        }
        if (
          filter.predicate_operator === PredicateOperator.ILIKE ||
          filter.predicate_operator === PredicateOperator.LIKE
        ) {
          let find_str: string = filter.search_value[0];
          let compare_str: string = "";
          if (filter.search_field === "uuid") {
            compare_str = company.uuid;
          }
          if (filter.search_field === "name") {
            compare_str = company.name;
          }
          if (PredicateOperator.ILIKE) {
            find_str = find_str.toLowerCase();
            compare_str = compare_str.toLowerCase();
          }
          if (compare_str.includes(find_str)) {
            data.push(company);
          }
        }
      }
    }
    return [data as ICompany[], true];
  }
}

export default CompaniesModule;
