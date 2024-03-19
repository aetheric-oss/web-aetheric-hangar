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

// Types of vehicle states
export enum EnumVehicleState {
  IN_MAINTENANCE = "IN_MAINTENANCE",
  CHARGING = "CHARGING",
  PENDING = "PENDING",
  HOME_BASE = "HOME_BASE",
  LANDING = "LANDING",
  TAKE_OFF = "TAKE_OFF",
  PARKED = "PARKED",
  IN_FLIGHT = "IN_FLIGHT",
  DISABLED = "DISABLED",
  ARCHIVED = "ARCHIVED",
  REJECTED = "REJECTED",
  NEEDS_MAINTENANCE = "NEEDS_MAINTENANCE"
}
