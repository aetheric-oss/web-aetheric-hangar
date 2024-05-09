import ApiFactory from "../";
import type { IGetForIdRequest, IAdvancedSearchFilter } from "../types";
import type {
  IContactsModule,
  IContactCreate,
  IContact,
} from "../types/contacts";

class ContactsModule extends ApiFactory<IContact> implements IContactsModule {
  resource = "/contacts";

  // ----------------------- get contact data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IContact | undefined, boolean]> => {
    return await this.get(request);
  };

  // ----------------------- create new contact --------------------- //
  async create(
    this: ContactsModule,
    request: IContactCreate
  ): Promise<string | undefined> {
    return await super.create(request);
  }

  // -------------------- get contacts for filter ------------------ //
  async filter(
    this: ContactsModule,
    request: IAdvancedSearchFilter
  ): Promise<[IContact[], boolean]> {
    return await super.filter(request);
  }
}

export default ContactsModule;
