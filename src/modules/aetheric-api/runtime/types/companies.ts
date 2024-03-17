import type {
  IGetForIdRequest,
  IAdvancedSearchFilter,
  IApiFactory,
} from "../types";

export interface ICompaniesModule extends IApiFactory<ICompany> {
  get: (
    request: IGetForIdRequest
  ) => Promise<[ICompany | undefined, boolean]>;

  create(request: ICompanyCreate): Promise<string | undefined>;
  update(request: ICompany): Promise<boolean>;

  filter(
    request: IAdvancedSearchFilter
  ): Promise<[ICompany[] | undefined, boolean]>;
}

export interface ICompanyUpdateRequest {
  uuid: string;
  data: ICompany;
}
export interface ICompany extends ICompanyCreate {
  uuid: string;
}
export interface ICompanyCreate {
  name: string;
  imgSrc: string;
}
