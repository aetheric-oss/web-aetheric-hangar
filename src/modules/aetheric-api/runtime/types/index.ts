import type { IAuthModule } from "./auth";
import type { ICompaniesModule } from "./companies";
import type { IContactsModule } from "./contacts";
import type { IUsersModule } from "./users";
import type { IAddressesModule } from "./addresses";
import type { IAircraftModule } from "./aircraft";

export interface IApiFactory<T> {
  get error(): string | undefined;
  set error(error: string | undefined);

  get(request: IGetForIdRequest): Promise<[T | undefined, boolean]>;
  create(request: object): Promise<string | undefined>;
  filter(request: IAdvancedSearchFilter): Promise<[T[] | undefined, boolean]>;
}

export interface Modules {
  auth: IAuthModule;
  users: IUsersModule;
  companies: ICompaniesModule;
  contacts: IContactsModule;
  addresses: IAddressesModule;
  aircraft: IAircraftModule;
}

export interface Backends {
  cargo: string;
  assets: string;
  address: string;
  contact: string;
  auth: string;
  companies: string;
  users: string;
  aircraft: string;
}

export interface FetchOptions {
  baseURL: string;
}

export interface IGetForIdRequest {
  uuid: string;
}
export interface IFilterRequest {}
export interface ICreatedResponse {
  uuid: string;
}

/* ADVANCED FILTER TYPES */

// Predicate operators which can be used for the `FilterOption`
export enum PredicateOperator {
  EQUALS = "EQUALS",
  NOT_EQUALS = "NOT_EQUALS",
  IN = "IN",
  NOT_IN = "NOT_IN",
  BETWEEN = "BETWEEN",
  IS_NULL = "IS_NULL",
  IS_NOT_NULL = "IS_NOT_NULL",
  ILIKE = "ILIKE",
  LIKE = "LIKE",
  GREATER = "GREATER",
  GREATER_OR_EQUAL = "GREATER_OR_EQUAL",
  LESS = "LESS",
  LESS_OR_EQUAL = "LESS_OR_EQUAL",
  GEO_INTERSECT = "GEO_INTERSECT",
  GEO_WITHIN = "GEO_WITHIN",
  GEO_DISJOINT = "GEO_DISJOINT",
}

// Comparison operators which can be used for the `FilterOption`
export enum ComparisonOperator {
  AND = "AND",
  OR = "OR",
}
// Sort order which can be used for `SortOption`
export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}
// Filter option which can be used for the `AdvancedSearchFilter`
export interface IFilterOption {
  // search_field
  search_field: string;
  // search_value, can be multiple for BETWEEN searches
  search_value: string[];
  // the predicate to be used
  predicate_operator: PredicateOperator;
  // optional operator used to compare next FilterOption with
  comparison_operator?: ComparisonOperator;
}

// Sort option which can be used for `AdvancedSearchFilter`
export interface ISortOption {
  // column name used to sort on
  sort_field: string;
  // sort operation
  sort_order: SortOrder;
}

// Advanced search filter object providing options for multiple search columns, sorted output, and paged results
export interface IAdvancedSearchFilter {
  // one or more filters to be used for search select
  filters: IFilterOption[];
  // page_number
  page_number: number;
  // number of results to return per page.
  results_per_page: number;
  // list of column / operator pairs to be used for sorting
  order_by: ISortOption[];
}
