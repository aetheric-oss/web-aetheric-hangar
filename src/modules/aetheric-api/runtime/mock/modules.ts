import AuthModule from "./auth";
import CompaniesModule from "./companies";
import ContactsModule from "./contacts";
import UsersModule from "./users";
import AddressesModule from "./addresses";
import AircraftModule from "./aircraft";
import type { Backends, Modules } from "../types";

/** an object containing all repositories we need to expose */
const modules = (backends: Backends | undefined, currentCompany: Ref<string>): Modules => {
  return {
    auth: new AuthModule({}),
    users: new UsersModule({}),
    companies: new CompaniesModule({}),
    contacts: new ContactsModule({}),
    addresses: new AddressesModule({}),
    aircraft: new AircraftModule({}, currentCompany),
  };
};

export { modules };
