interface Address {
  address: string;
  town: string;
  state: string;
  country: string;
  postalCode: string;
}

interface AddressInfo {
  type: string;
  name?: string;
  address: Address;
  isMasked?: boolean;
}

interface Credential {
  username: string;
  password: string;
}

interface Business {
  uuid: string;
  name: string;
  imgSrc: string;
};

interface Profile{
  profile: {
    name: string;
    publicName: string;
    arrowBalance: string;
    currentBusiness: string;
    businesses: Array<Business>;
  };
};
