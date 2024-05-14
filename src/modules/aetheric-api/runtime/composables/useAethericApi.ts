import { useNuxtApp } from "nuxt/app";
import { ref } from "vue";
import { modules as mockModules } from "../mock/modules";
import { modules as apiModules } from "../api/modules";

import type { ModuleOptions } from "../../index";
import type {Ref} from 'vue';
import type {Modules} from "../types";
import { EnumContact, EnumAddress} from "../types/enums";

const modules: Ref<Modules | undefined> = ref(undefined);
type EnumAddressType = typeof EnumAddress;
type EnumContactType = typeof EnumContact;

export const useAethericApi = (currentCompany: string) => {
  const nuxtApp = useNuxtApp();
  if(modules.value === undefined) {
    const options: ModuleOptions = nuxtApp.$config.public.api as ModuleOptions;
    const fetchOptions = {
      baseURL: options.apiUrl,
    };

    if (options.useMock) {
      modules.value = mockModules(fetchOptions, currentCompany);
    } else {
      modules.value = apiModules(fetchOptions, currentCompany);
    }
  }

  return modules.value;
}

export const flushAethericApi = () => {
  modules.value = undefined;
}

export { EnumContact, EnumAddress, type EnumAddressType, type EnumContactType };
