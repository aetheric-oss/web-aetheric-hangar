// Types of addresses
export enum EnumAddress {
  RESIDENCE = "RESIDENCE",
  SHIPPING = "SHIPPING",
  BILLING = "BILLING",
}
export type EnumAddressType = typeof EnumAddress;
// Types of contact data
export enum EnumContact {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
}
export type EnumContactType = typeof EnumContact;
