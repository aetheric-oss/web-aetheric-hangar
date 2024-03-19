import { useState } from "nuxt/app";
import { useLocalStorage, type RemovableRef } from "@vueuse/core";
import type { IPaymentMethod, IPrivacySettings, IUser } from "../types/users";
import type { ICredentials } from "../types/auth";
import type { IAddress } from "../types/addresses";
import type { ICompany } from "../types/companies";
import type { IContact } from "../types/contacts";
import type { IAircraft } from "../types/aircraft";
import { EnumAddress, EnumContact, EnumVehicleState } from "../types/enums";

export const useAircraft = () => storeAircraft;
export const useCompanies = () => storeCompanies;
export const useContacts = () => storeContacts;
export const useAddresses = () => storeAddresses;
export const useUsers = () => storeUsers;
export const useUserProfiles = () => storeUserProfiles;
export const useCompanyProfiles = () => storeCompanyProfiles;
export const usePaymentMethods = () => storePaymentMethods;
export const useCredentials = () => useState("credentials", () => credentials);

export interface IUserProfile {
  user: IUser;
  currentCompany: string;
  companies: ICompany[];
  contactInfo: IContact[];
  addresses: IAddress[];
  paymentMethods: IPaymentMethod[];
  privacySettings: IPrivacySettings;
}
export interface ICompanyProfile {
  company: ICompany;
  aircraft: IAircraft[];
  contactInfo: IContact[];
  addresses: IAddress[];
}

const storeAircraft: RemovableRef<{ [key: string]: IAircraft }> =
  useLocalStorage("mock/store/aircraft", {
    "1": {
      uuid: "1",
      name: "Flying Bird",
      imgSrc: "/img/demo/drone-c.png",
      status: EnumVehicleState.NEEDS_MAINTENANCE
    } as ICompany,
    "2": {
      uuid: "2",
      name: "Little Swan",
      imgSrc: "/img/demo/drone-b.png",
      status: EnumVehicleState.IN_FLIGHT
    } as ICompany,
    "3": {
      uuid: "3",
      name: "Teh Chopper",
      imgSrc: "/img/demo/drone-a.png",
      status: EnumVehicleState.HOME_BASE
    } as ICompany,
    "4": {
      uuid: "4",
      name: "Angel",
      imgSrc: "/img/demo/drone-b.png",
      status: EnumVehicleState.HOME_BASE
    } as ICompany,
    "5": {
      uuid: "5",
      name: "Big Wing",
      imgSrc: "/img/demo/drone-a.png",
      status: EnumVehicleState.LANDING
    } as ICompany,
  });

const storeCompanies: RemovableRef<{ [key: string]: ICompany }> =
  useLocalStorage("mock/store/companies", {
    "1": {
      uuid: "1",
      name: "Arctic Ocean",
      imgSrc: "/img/demo/current-company.png",
    } as ICompany,
    "2": {
      uuid: "2",
      name: "Future Ventures",
      imgSrc: "/img/demo/company.svg",
    } as ICompany,
    "3": {
      uuid: "3",
      name: "Freedom Arrives",
      imgSrc: "/img/demo/company.svg",
    } as ICompany,
    "4": {
      uuid: "4",
      name: "A Fly Away Airport",
      imgSrc: "/img/demo/company.svg",
    } as ICompany,
    "5": {
      uuid: "5",
      name: "Four Counts",
      imgSrc: "/img/demo/company.svg",
    } as ICompany,
  });

const storeContacts: RemovableRef<{ [key: string]: IContact }> =
  useLocalStorage("mock/store/contacts", {
    "1": {
      uuid: "1",
      type: EnumContact.EMAIL,
      value: "patricia.hale@gmail.com",
      isPrimary: true,
      isVerified: true,
    } as IContact,
    "2": {
      uuid: "2",
      type: EnumContact.EMAIL,
      value: "patricia.hale@yahoo.com",
      isPrimary: false,
      isVerified: true,
    } as IContact,
    "3": {
      uuid: "3",
      type: EnumContact.PHONE,
      value: "+1 123 456 7890",
      isPrimary: true,
      isVerified: true,
    } as IContact,
  });

const storeAddresses: RemovableRef<{ [key: string]: IAddress }> =
  useLocalStorage("mock/store/addresses", {
    "1": {
      uuid: "1",
      type: EnumAddress.RESIDENCE,
      country_code: "US",
      state: "CA",
      postalCode: "94111",
      city: "San Francisco",
      street: "Main St",
      street_number: "1234",
    } as IAddress,
    "2": {
      uuid: "2",
      type: EnumAddress.SHIPPING,
      name: "NAME",
      country_code: "US",
      state: "CA",
      postalCode: "94111",
      city: "San Francisco",
      street: "Second St",
      street_number: "1234",
    } as IAddress,
  });

const storeUsers: RemovableRef<{ [key: string]: IUser }> =
  useLocalStorage( "mock/store/users", {
    "1": {
      uuid: "1",
      username: "user_123",
      name: "Patricia Hale",
      publicName: "Miss Patricia",
      arrowBalance: "203,00",
      profilePicture: "/img/demo/my-profile.png",
    } as IUser,
  }
);

const storePaymentMethods: RemovableRef<{ [key: string]: IPaymentMethod }> =
  useLocalStorage("mock/store/paymentMethods", {
    "1": {
      uuid: "1",
      type: "bank",
      value: "1234 5678 9012 3456",
      isPrimary: true,
      isVerified: true,
    } as IPaymentMethod,
  });

const storeUserProfiles: RemovableRef<{
  [key: string]: {
    user: string;
    currentCompany: string;
    companies: string[];
    addresses: string[];
    contactInfo: string[];
    paymentMethods: string[];
    privacySettings: IPrivacySettings;
  };
}> = useLocalStorage("mock/store/user_profiles", {
  "1": {
    user: "1",
    currentCompany: "1",
    companies: ["1", "2", "3", "4", "5"],
    addresses: ["1", "2"],
    contactInfo: ["1", "2", "3"],
    paymentMethods: ["1"],
    privacySettings: {
      "contact permissions": [
        { name: "Contact me through e-mail", checked: false },
        { name: "Contact me through sms", checked: true },
      ],
      "opt ins": [
        { name: "Receive all FLYARROW newsletters", checked: false },
        { name: "Receive discounts and promotions", checked: true },
      ],
      "email alerts": [
        { name: "All", checked: true },
        {
          name: "Receive message when new team member is added",
          checked: true,
        },
        {
          name: "Receive message when vehicles are added/changed",
          checked: false,
        },
      ],
    } as IPrivacySettings,
  },
});

const storeCompanyProfiles: RemovableRef<{
  [key: string]: {
    company: string;
    aircraft: string[];
    addresses: string[];
    contactInfo: string[];
  };
}> = useLocalStorage("mock/store/company_profiles", {
  "1": {
    company: "1",
    aircraft: ["1", "2", "3", "4", "5"],
    addresses: ["1", "2"],
    contactInfo: ["1", "2", "3"],
  },
});

const credentials = [
  {
    uuid: "1",
    username: "user_123",
    password: "password123",
  } as ICredentials,
  {
    uuid: "2",
    username: "john_doe",
    password: "secret456",
  } as ICredentials,
  {
    uuid: "3",
    username: "alice_smith",
    password: "securePass",
  } as ICredentials,
  {
    uuid: "4",
    username: "jane_doe",
    password: "12345678",
  } as ICredentials,
  {
    uuid: "5",
    username: "bob_thompson",
    password: "qwerty",
  } as ICredentials,
];

export const privacySettingsDefaults: IPrivacySettings = {
  "contact permissions": [
    { name: "Contact me through e-mail", checked: true },
    { name: "Contact me through sms", checked: true },
  ],
  "opt ins": [
    { name: "Receive all FLYARROW newsletters", checked: false },
    { name: "Receive discounts and promotions", checked: false },
  ],
  "email alerts": [
    { name: "All", checked: true },
    {
      name: "Receive message when new team member is added",
      checked: true,
    },
    {
      name: "Receive message when vehicles are added/changed",
      checked: true,
    },
  ],
};
