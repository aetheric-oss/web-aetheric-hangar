import { ComparisonOperator, PredicateOperator } from "../types";
import { useAethericApi } from "../composables/useAethericApi";
import ApiFactory from "..";

import type {
  IUsersModule,
  IUserGetByUsername,
  IUser,
  IUserCreate,
  IUserContact,
  IUserAddress,
  IUserCompany,
  IUserPaymentMethod,
  IUserPrivacySettings,
  IPaymentMethod,
  IPrivacySettings,
} from "../types/users";
import type { ICompany } from "../types/companies";
import type { IContact } from "../types/contacts";
import type { IAddress } from "../types/addresses";
import type {
  IAdvancedSearchFilter,
  IFilterOption,
  IGetForIdRequest,
} from "../types";
import type { IProfile } from "../composables/useMock";

import {
  privacySettingsDefaults,
  useCompanies,
  useProfiles,
  useUsers,
  useContacts,
  useAddresses,
  usePaymentMethods,
} from "../composables/useMock";

class UsersModule extends ApiFactory<IUser> implements IUsersModule {
  resource = "/users";

  constructor(fetchOptions: any) {
    super(fetchOptions);

    // load state data
    useState<{ [key: string]: IUser }>("users", () =>
      computed(() => {
        const users: { [key: string]: IUser } = {};
        for (const [id, user] of Object.entries(useUsers().value)) {
          users[id] = reactive(user);
        }
        return users;
      })
    );

    useState<{ [key: string]: IProfile }>("profiles", () =>
      computed(() => {
        const profiles: { [key: string]: IProfile } = {};
        const storeCompanies = useCompanies();
        const storeAddresses = useAddresses();
        const storeContacts = useContacts();
        const storePaymentMethods = usePaymentMethods();
        const storeUsers = useUsers();
        for (const [id, profile] of Object.entries(useProfiles().value)) {
          const companies: ICompany[] = reactive([]);
          profile.companies.forEach((id) =>
            companies.push(storeCompanies.value[id])
          );
          const addresses: IAddress[] = reactive([]);
          profile.addresses.forEach((id) =>
            addresses.push(storeAddresses.value[id])
          );
          const contactInfo: IContact[] = reactive([]);
          profile.contactInfo.forEach((id) =>
            contactInfo.push(storeContacts.value[id])
          );
          const paymentMethods: IPaymentMethod[] = reactive([]);
          profile.paymentMethods.forEach((id) =>
            paymentMethods.push(storePaymentMethods.value[id])
          );

          profiles[id] = reactive({
            user: useUsers().value[id],
            currentCompany: profile.currentCompany,
            companies,
            addresses,
            contactInfo,
            paymentMethods,
            privacySettings: reactive(profile.privacySettings),
          } as IProfile);
        }
        return profiles;
      })
    );
  }

  // ----------------------- get user data --------------------- //
  get = async (
    request: IGetForIdRequest
  ): Promise<[IUser | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;

    if (request.uuid) {
      const user = useState<{ [key: string]: IUser }>("users").value[
        request.uuid
      ];
      if (!user) {
        this.error = "No user info found for logged in user.";
        return [undefined, false];
      } else {
        return [user as IUser, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- get user data for given username --------------------- //
  getByUsername = async (
    request: IUserGetByUsername
  ): Promise<[IUser | undefined, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    const users = useState<{ [key: string]: IUser }>("users");
    if (users.value && request.username) {
      let user: IUser | undefined = undefined;
      for (const [key, item] of Object.entries(users.value)) {
        if (item.username == request.username) {
          user = item;
          break;
        }
      }
      if (!user) {
        this.error = "No user info found for logged in user.";
        return [undefined, false];
      } else {
        return [user as IUser, true];
      }
    }
    return [undefined, false];
  };

  // ----------------------- create new user --------------------- //
  create = async (request: IUserCreate): Promise<string | undefined> => {
    const uuid: string = crypto.randomUUID();
    const $api = useAethericApi();

    const user = request as IUser;
    user.uuid = uuid;
    useUsers().value[uuid] = reactive(user);

    // API would handle the part below, but we'll have to do it ourselves now
    const companyUuid = await $api.companies.create({
      name: "My first company",
      imgSrc: "/img/demo/company.svg",
    });

    const [company, success]: [ICompany | undefined, boolean] =
      await $api.companies.get({ uuid: companyUuid! });

    if (!success) {
      return undefined;
    }
    useProfiles().value[uuid] = reactive({
      user: user.uuid as string,
      currentCompany: companyUuid as string,
      companies: [companyUuid as string],
      addresses: [],
      contactInfo: [],
      paymentMethods: [],
      privacySettings: privacySettingsDefaults,
    });

    return uuid;
  };

  addCompany = async (request: IUserCompany): Promise<boolean> => {
    const $api = useAethericApi();
    const uuid = await $api.companies.create(request.company);

    if (uuid) {
      useProfiles().value[request.uuid].companies.push(uuid);
      return true;
    }

    return false;
  };
  updateCompany = async (request: IUserCompany): Promise<boolean> => {
    const company = request.company as ICompany;
    if (useProfiles().value[request.uuid].companies.includes(company.uuid)) {
      const $api = useAethericApi();
      return await $api.companies.update(request.company as ICompany);
    }

    this.error = "Can't find the provided company for the current user.";
    return false;
  };

  addContact = async (request: IUserContact): Promise<boolean> => {
    const $api = useAethericApi();
    const uuid = await $api.contacts.create(request.contact);

    if (uuid) {
      useProfiles().value[request.uuid].contactInfo.push(uuid);
      return true;
    }

    return false;
  };
  updateContact = async (request: IUserContact): Promise<boolean> => {
    const contact = request.contact as IContact;
    if (useProfiles().value[request.uuid].contactInfo.includes(contact.uuid)) {
      const $api = useAethericApi();
      return await $api.contacts.update(request.contact as IContact);
    }

    this.error = "Can't find the provided contact info for the current user.";
    return false;
  };

  addAddress = async (request: IUserAddress): Promise<boolean> => {
    const $api = useAethericApi();
    const uuid = await $api.addresses.create(request.address);

    if (uuid) {
      useProfiles().value[request.uuid].addresses.push(uuid);
      return true;
    }

    return false;
  };
  updateAddress = async (request: IUserAddress): Promise<boolean> => {
    const address = request.address as IAddress;
    if (useProfiles().value[request.uuid].addresses.includes(address.uuid)) {
      const $api = useAethericApi();
      return await $api.addresses.update(request.address as IAddress);
    }

    this.error = "Can't find the provided address for the current user.";
    return false;
  };

  addPaymentMethod = async (request: IUserPaymentMethod): Promise<boolean> => {
    const uuid: string = crypto.randomUUID();
    const method = request.method as IPaymentMethod;
    method.uuid = uuid;
    usePaymentMethods().value[uuid] = method;
    useProfiles().value[request.uuid].paymentMethods.push(uuid);
    return true;
  };
  updatePaymentMethod = async (
    request: IUserPaymentMethod
  ): Promise<boolean> => {
    const method = request.method as IPaymentMethod;
    usePaymentMethods().value[method.uuid] = method;
    useProfiles().value[request.uuid].paymentMethods.push(method.uuid);
    return true;
  };

  updatePrivacySettings = async (
    request: IUserPrivacySettings
  ): Promise<boolean> => {
    const settings = request.privacySettings as IPrivacySettings;
    useProfiles().value[request.uuid].privacySettings = settings;

    return true;
  };

  getCompanies = async (
    request: IGetForIdRequest
  ): Promise<[ICompany[], boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (useProfiles().value[request.uuid]) {
      return [
        useState<{ [key: string]: IProfile }>("profiles").value[request.uuid]
          .companies,
        true,
      ];
    }
    return [[], true];
  };
  getContacts = async (
    request: IGetForIdRequest
  ): Promise<[IContact[], boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (useProfiles().value[request.uuid]) {
      return [
        useState<{ [key: string]: IProfile }>("profiles").value[request.uuid]
          .contactInfo,
        true,
      ];
    }
    return [[], true];
  };
  getAddresses = async (
    request: IGetForIdRequest
  ): Promise<[IAddress[], boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (useProfiles().value[request.uuid]) {
      return [
        useState<{ [key: string]: IProfile }>("profiles").value[request.uuid]
          .addresses,
        true,
      ];
    }
    return [[], true];
  };
  getPaymentMethods = async (
    request: IGetForIdRequest
  ): Promise<[IPaymentMethod[], boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (useProfiles().value[request.uuid]) {
      return [
        useState<{ [key: string]: IProfile }>("profiles").value[request.uuid]
          .paymentMethods,
        true,
      ];
    }
    return [[], true];
  };
  getPrivacySettings = async (
    request: IGetForIdRequest
  ): Promise<[IPrivacySettings, boolean]> => {
    // clear this.error before we do anything
    this.error = undefined;
    if (useProfiles().value[request.uuid]) {
      return [
        useState<{ [key: string]: IProfile }>("profiles").value[request.uuid]
          .privacySettings,
        true,
      ];
    }
    return [privacySettingsDefaults, true];
  };

  // -------------------- get users for filter ------------------ //
  // TODO: This doesn't filter properly yet, never goes back to the "filter_later" part
  filter = async (
    request: IAdvancedSearchFilter
  ): Promise<[IUser[], boolean]> => {
    const data: IUser[] = [];
    const filter_later: IFilterOption[] = [];
    for (const [userId, user] of Object.entries<IUser>(
      useState<{ [key: string]: IUser }>("users").value
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
          if (filter.search_field === "uuid" && user.uuid === compare_str) {
            data.push(user);
          }
          if (filter.search_field === "name" && user.name === compare_str) {
            data.push(user);
          }
        }
        if (
          filter.predicate_operator === PredicateOperator.ILIKE ||
          filter.predicate_operator === PredicateOperator.LIKE
        ) {
          let find_str: string = filter.search_value[0];
          let compare_str: string = "";
          if (filter.search_field === "uuid") {
            compare_str = user.uuid;
          }
          if (filter.search_field === "name") {
            compare_str = user.name;
          }
          if (PredicateOperator.ILIKE) {
            find_str = find_str.toLowerCase();
            compare_str = compare_str.toLowerCase();
          }
          if (compare_str.includes(find_str)) {
            data.push(user);
          }
        }
      }
    }

    return [data, true];
  };
}

export default UsersModule;
