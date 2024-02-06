import { defineStore } from "pinia";

export const useProfileStore = defineStore({
  id: "profile-store",
  state: () => {
    return {
      _user: {
        uuid: "1",
        username: "user123",
        name: "Patricia Hale",
        publicName: "Miss Patricia",
        arrowBalance: "203,00",
        profilePicture: "/img/demo/my-profile.png",
      },
      _currentCompany: "1",
      _companies: [
        {
          uuid: "1",
          name: "Arctic Ocean",
          imgSrc: "/img/demo/current-company.png",
        },
        {
          uuid: "2",
          name: "Future Ventures",
          imgSrc: "/img/demo/company.svg",
        },
        {
          uuid: "3",
          name: "Freedom Arrives",
          imgSrc: "/img/demo/company.svg",
        },
        {
          uuid: "4",
          name: "A Fly Away Airport",
          imgSrc: "/img/demo/company.svg",
        },
        {
          uuid: "5",
          name: "Four Counts",
          imgSrc: "/img/demo/company.svg",
        },
      ] as ICompany[],
      _contactInfo: [
        {
          uuid: "1",
          type: "email",
          value: "patricia.hale@gmail.com",
          isPrimary: true,
          isVerified: true,
        },
        {
          uuid: "2",
          type: "email",
          value: "patricia.hale@yahoo.com",
          isPrimary: false,
          isVerified: true,
        },
        {
          uuid: "3",
          type: "phone",
          value: "+1 123 456 7890",
          isPrimary: true,
          isVerified: true,
        },
      ] as IContact[],
      _addresses: [
        {
          uuid: "1",
          type: "residence",
          address: {
            address: "1234 Main St",
            town: "San Francisco",
            state: "CA",
            country: "US",
            postalCode: "94111",
          },
        },
        {
          uuid: "2",
          type: "shipping",
          name: "NAME",
          address: {
            address: "1234 Main St",
            town: "San Francisco",
            state: "CA",
            country: "US",
            postalCode: "94111",
          },
        },
      ] as IAddressInfo[],
      _privacySettings: {
        contact_permissions: [
          { name: "Contact me through e-mail", checked: false },
          { name: "Contact me through sms", checked: true },
        ],
        opt_ins: [
          { name: "Receive all FLYARROW newsletters", checked: false },
          { name: "Receive discounts and promotions", checked: true },
        ],
        email_alerts: [
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
      _paymentMethods: [
        {
          uuid: "1",
          type: "bank",
          value: "1234 5678 9012 3456",
          isPrimary: true,
          isVerified: true,
        },
      ] as IPaymentMethod[],
    } as IProfileState;
  },

  actions: {
    switchUser(user: IUser) {
      this._user = user;
    },
    switchAccount(uuid: string) {
      this._currentCompany = uuid;
    },
    getCurrentCompany(): ICompany | undefined {
      if (this._companies) {
        let index = this._companies.findIndex(
          (company) => company.uuid === this._currentCompany
        );
        return this._companies[index];
      }

      return undefined;
    },
    getContacts(): IContact[] {
      return this._contactInfo;
    },
    getAddresses(): IAddressInfo[] {
      return this._addresses;
    },
    getCompanies(): ICompany[] {
      return this._companies;
    },
    getPaymentMethods(): IPaymentMethod[] {
      return this._paymentMethods;
    },
    getSortedCompanies() {
      let companies = this.getCompanies();

      if (companies) {
        const sortedCompaniesList: { [key: string]: ICompany[] } = {};
        let companies: ICompany[];

        if (this._companies) {
          // return an alphabetically sorted list
          this._companies
            .sort((a, b) => a.name.localeCompare(b.name))
            .forEach((company) => {
              let firstLetter = company.name[0].toUpperCase();
              if (sortedCompaniesList[firstLetter]) {
                sortedCompaniesList[firstLetter].push(company);
              } else {
                sortedCompaniesList[firstLetter] = [company];
              }
            });
          return sortedCompaniesList;
        }
      }
      return {};
    },
    getCompany(uuid: string): ICompany | undefined {
      let companies = this.getCompanies();
      if (this._companies) {
        this._companies.forEach((company: ICompany) => {
          if (company.uuid === uuid) {
            return company;
          }
        });
      }
      return undefined;
    },
    addAddress(address: IAddressInfoCreate) {
      // TODO use API to update backend
      const uuid: string = crypto.randomUUID();
      const newAddress = {
        uuid,
        ...address,
      } as IAddressInfo;
      if (this._addresses) {
        this._addresses.push(newAddress);
      } else {
        this._addresses = [newAddress];
      }
    },
    updateAddress(address: IAddressInfo): boolean {
      // TODO use API to update backend
      if (this._addresses) {
        let index = this._addresses.findIndex(
          (data) => data.uuid === address.uuid
        );
        if (index) {
          this._addresses[index] = {
            ...address,
          };
          return true;
        }
      }
      return false;
    },
    addContact(contact: IContactCreate) {
      // TODO use API to update backend
      const uuid: string = crypto.randomUUID();
      const newContact = {
        uuid,
        ...contact,
      } as IContact;
      if (this._contactInfo) {
        this._contactInfo.push(newContact);
      } else {
        this._contactInfo = [newContact];
      }
    },
    updateContact(contact: IContact): boolean {
      // TODO use API to update backend
      if (this._contactInfo) {
        let index = this._contactInfo.findIndex(
          (data) => data.uuid === contact.uuid
        );
        if (index) {
          this._contactInfo[index] = {
            ...contact,
          };
          return true;
        }
      }
      return false;
    },
    addPaymentMethod(method: IPaymentMethodCreate) {
      // TODO use API to update backend
      const uuid: string = crypto.randomUUID();
      const newPaymentMethod = {
        uuid,
        ...method,
      } as IPaymentMethod;
      if (this._paymentMethods) {
        this._paymentMethods.push(newPaymentMethod);
      } else {
        this._paymentMethods = [newPaymentMethod];
      }
    },
    updatePaymentMethod(method: IPaymentMethod): boolean {
      // TODO use API to update backend
      if (this._paymentMethods) {
        let index = this._paymentMethods.findIndex(
          (data) => data.uuid === method.uuid
        );
        if (index) {
          this._paymentMethods[index] = {
            ...method,
          };
          return true;
        }
      }
      return false;
    },
  },

  getters: {
    user: (state: IProfileState) => state._user,
    username: (state: IProfileState) => state._user.name,
    publicName: (state: IProfileState) => state._user.publicName,
    profilePicture: (state: IProfileState) => state._user.profilePicture,
    arrowBalance: (state: IProfileState) => state._user.arrowBalance,
    privacySettings: (state: IProfileState) => state._privacySettings,
  },
});
