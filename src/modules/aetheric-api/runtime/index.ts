import { useFetch } from "nuxt/app";
import type { AsyncData } from "nuxt/app";
import type {
  IGetForIdRequest,
  ICreatedResponse,
  IAdvancedSearchFilter,
  IApiFactory,
} from "./types";

abstract class ApiFactory<T> implements IApiFactory<T> {
  abstract resource: string;

  private fetchOptions;
  private _error: string | undefined;

  constructor(fetchOptions: any) {
    this.fetchOptions = fetchOptions;
  }

  /**
   * method - GET, POST, PUT
   * URL
   **/
  async call<T>(
    method: any,
    url: string,
    data?: object,
    extras = {}
  ): Promise<AsyncData<T, Error | null>> {
    // reset error message
    this._error = undefined;

    const result: AsyncData<T, Error | null> = (await useFetch(url, {
      method: method,
      body: data,
      ...extras,
      ...this.fetchOptions,
    })) as AsyncData<T, Error | null>;

    return result;
  }

  /**
   * simple get request on resource based on uuid
   **/
  get = async (
    request: IGetForIdRequest
  ): Promise<[T | undefined, boolean]> => {
    const result = await this.call<T>(
      "GET",
      `${this.resource}/${request.uuid}`
    );

    if (result.status.value === "error") {
      this._error = result.error.value?.message;
      return [undefined, false];
    }

    return [result.data.value, true];
  };

  /**
   * simple create request on resource
   **/
  async create(request: object): Promise<string | undefined> {
    const result = await this.call<object>("POST", `${this.resource}`, request);

    if (result.status.value === "error") {
      this._error = result.error.value?.message;
      return undefined;
    }
    const data = result.data.value as ICreatedResponse;

    return data["uuid"];
  }

  /**
   * simple create request on resource
   **/
  async update(request: T): Promise<boolean> {
    const result = await this.call<T>("PATCH", `${this.resource}`, request as object);

    if (result.status.value === "error") {
      this._error = result.error.value?.message;
      return false;
    }
    return true;
  }

  /**
   * simple post request on resource based on provided filter object
   **/
  async filter(
    request: IAdvancedSearchFilter
  ): Promise<[T[] | undefined, boolean]> {
    const result = await this.call<T[]>("GET", `${this.resource}?filter=${JSON.stringify(request)}`);

    if (result.status.value === "error") {
      this._error = result.error.value?.message;
      return [undefined, false];
    }

    return [result.data.value, true];
  }

  get error(): string | undefined {
    return this._error;
  }
  set error(error: string | undefined) {
    this._error = error;
  }
}

export default ApiFactory;
