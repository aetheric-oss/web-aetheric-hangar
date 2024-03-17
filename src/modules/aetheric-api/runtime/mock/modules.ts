import AuthModule from "./auth";
import CompaniesModule from "./companies";
import ContactsModule from "./contacts";
import UsersModule from "./users";
import AddressesModule from "./addresses";
import type { FetchOptions, Modules } from "../types";

/** an object containing all repositories we need to expose */
const modules = (fetchOptions: FetchOptions): Modules => {
  return {
    auth: new AuthModule(fetchOptions),
    users: new UsersModule(fetchOptions),
    companies: new CompaniesModule(fetchOptions),
    contacts: new ContactsModule(fetchOptions),
    addresses: new AddressesModule(fetchOptions),
  };
};

export { modules };
