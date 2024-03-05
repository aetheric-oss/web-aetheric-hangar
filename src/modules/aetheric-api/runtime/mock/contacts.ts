import ApiFactory from "../";

import type {
  IContact,
  IContactCreate,
  IContactsModule,
} from "../types/contacts";
import type {
  IAdvancedSearchFilter,
  IFilterOption,
  IGetForIdRequest,
} from "../types";
import { ComparisonOperator, PredicateOperator } from "../types";
import { useContacts } from "../composables/useMock";

class ContactsModule extends ApiFactory<IContact> implements IContactsModule {
  resource = "/contacts";

  private contacts: Ref<{ [key: string]: IContact }>;

  constructor(fetchOptions: any) {
    super(fetchOptions);
    this.contacts = useState<{ [key: string]: IContact }>("contacts", () =>
      computed(() => {
        const contacts: { [key: string]: IContact } = {};
        for (const [id, contact] of Object.entries(useContacts().value)) {
          contacts[id] = contact;
        }
        return reactive(contacts);
      })
    );
  }

  // ------------------------ get contact data ---------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IContact | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (request.uuid) {
      const contact: IContact = this.contacts.value[request.uuid];
      if (!contact) {
        this.error = "No contact found for given id.";
        return [undefined, false];
      } else {
        return [contact, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- create new contact --------------------- //
  async create(this: ContactsModule, request: IContactCreate): Promise<string> {
    // clear this.error before we do anything
    this.error = undefined;

    const uuid: string = crypto.randomUUID();
    const contact = request as IContact;
    contact.uuid = uuid;
    useContacts().value[uuid] = contact;
    return uuid;
  }

  // --------------------- update existing contact ------------------ //
  async update(this: ContactsModule, request: IContact): Promise<boolean> {
    // clear this.error before we do anything
    this.error = undefined;
    useContacts().value[request.uuid] = request;
    return true;
  }

  // -------------------- get contacts for filter ------------------ //
  async filter(
    this: ContactsModule,
    request: IAdvancedSearchFilter
  ): Promise<[IContact[], boolean]> {
    // clear this.error before we do anything
    this.error = undefined;

    const data: IContact[] = [];
    const filter_later: IFilterOption[] = [];

    for (const [contactId, contact] of Object.entries<IContact>(
      useState<{ [key: string]: IContact }>("contacts").value
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
          if (filter.search_field === "uuid" && contact.uuid === compare_str) {
            data.push(contact);
          }
          if (filter.search_field === "type" && contact.type === compare_str) {
            data.push(contact);
          }
        }
        if (
          filter.predicate_operator === PredicateOperator.ILIKE ||
          filter.predicate_operator === PredicateOperator.LIKE
        ) {
          let find_str: string = filter.search_value[0];
          let compare_str: string = "";
          if (filter.search_field === "uuid") {
            compare_str = contact.uuid;
          }
          if (filter.search_field === "type") {
            compare_str = contact.type;
          }
          if (PredicateOperator.ILIKE) {
            find_str = find_str.toLowerCase();
            compare_str = compare_str.toLowerCase();
          }
          if (compare_str.includes(find_str)) {
            data.push(contact);
          }
        }
      }
    }
    return [data as IContact[], true];
  }
}

export default ContactsModule;
