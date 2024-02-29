import { defineStore } from "pinia";

export type dropdownValuesState = {
  addressTypes: { [key: string]: string };
  contactTypes: { [key: string]: string };
  countries: { [key: string]: string };
  privacyTypes: { [key: string]: string };
  paymentTypes: { [key: string]: string };
};

export const useDropdownValuesStore = defineStore({
  id: "dropdownValues-store",
  state: () => {
    return {
      addressTypes: {
        "shipping": "Shipping Address",
        "billing": "Billing Address",
        "residence": "Residence Address",
      },
      contactTypes: {
        "email": "Email Address",
        "phone": "Phone Number",
      },
      countries: {
        "CA": "Canada",
        "FR": "France",
        "DE": "Germany",
        "IN": "India",
        "IT": "Italy",
        "NL": "The Netherlands",
        "GB": "United Kingdom",
        "US": "United States",
      },
      privacyTypes: {
        "contact_permissions": "Contact Permissions",
        "opt_ins": "Opt ins",
        "email_alerts": "Email alerts"
      },
      paymentTypes: {
        "paypal": "PayPal",
        "bank": "Bank Transfer",
        "credit": "Credit Card",
      }
    } as dropdownValuesState;
  },
});
