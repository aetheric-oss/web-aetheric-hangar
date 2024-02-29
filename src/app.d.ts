interface IAddress {
  address: string;
  town: string;
  state: string;
  country: string;
  postalCode: string;
}

interface IAddressInfo extends IAddressInfoCreate {
  uuid: string;
}
interface IAddressInfoCreate {
  type: string;
  name?: string;
  address: IAddress;
}
interface Credential {
  username: string;
  password: string;
}

interface ICompany {
  uuid: string;
  name: string;
  imgSrc: string;
}

interface IProfileState {
  _user: IUser;
  _currentCompany: string;
  _companies: ICompany[];
  _contactInfo: ContactInfo[];
  _addresses: IAddressInfo[];
  _paymentMethods: IPaymentMethod[];
  _privacySettings: IPrivacySettings;
}

interface IMenuItem {
  name: string;
  path: string;
}
interface IContact extends IContactCreate {
  uuid: string;
}
interface IContactCreate {
  type: string;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
}
interface IUser {
  uuid: string;
  username: string;
  name: string;
  publicName: string;
  arrowBalance: string;
  profilePicture: string;
}
interface IGoogleJwtResponse {
  sub: string;
  email: string;
  email_verified: string;
  name: string;
  picture: string;
}
interface IDropdownValues {
  [key: string]: string;
}

interface IPrivacySetting {
  name: string;
  checked: boolean;
}
interface IPrivacySettings {
  [key: string]: IPrivacySetting[];
}
interface IPaymentMethod extends IPaymentMethodCreate {
  uuid: string;
}
interface IPaymentMethodCreate {
  type: string;
  value: string;
  isPrimary: boolean;
  isVerified: boolean;
}
