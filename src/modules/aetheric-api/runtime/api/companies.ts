import ApiFactory from "../";
import type { IGetForIdRequest, IAdvancedSearchFilter } from "../types";
import type {
  ICompaniesModule,
  ICompanyCreate,
  ICompany,
} from "../types/companies";

class CompaniesModule extends ApiFactory<ICompany> implements ICompaniesModule {
  resource = "/companies";

  // ----------------------- get company data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[ICompany | undefined, boolean]> => {
    return await this.get(request);
  };

  // ----------------------- create new company --------------------- //
  async create(request: ICompanyCreate): Promise<string | undefined> {
    return await super.create(request);
  }

  // -------------------- get companies for filter ------------------ //
  async filter(
    this: CompaniesModule,
    request: IAdvancedSearchFilter
  ): Promise<[ICompany[] | undefined, boolean]> {
    return await super.filter(request);
  }
}

export default CompaniesModule;
