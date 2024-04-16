import AuthModule from "./auth";
import CompaniesModule from "./companies";
import ContactsModule from "./contacts";
import UsersModule from "./users";
import AddressesModule from "./addresses";
import AircraftModule from "./aircraft";
import type { Backends, Modules } from "../types";

/** an object containing all repositories we need to expose */
const modules = (backends: Backends, currentCompany: string): Modules => {
  return {
    auth: new AuthModule({baseUrl: backends.auth}),
    users: new UsersModule({baseUrl: backends.users}),
    companies: new CompaniesModule({baseUrl: backends.companies}),
    contacts: new ContactsModule({baseUrl: backends.contact}),
    addresses: new AddressesModule({baseUrl: backends.address}),
    aircraft: new AircraftModule({baseUrl: backends.aircraft}, currentCompany),
  };
};

export { modules };
