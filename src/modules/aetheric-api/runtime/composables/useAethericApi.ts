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

export const useAethericApi = () => {
  const nuxtApp = useNuxtApp();
  if(modules.value === undefined) {
    const options: ModuleOptions = nuxtApp.$config.public.api as ModuleOptions;
    const fetchOptions = {
      baseURL: options.apiUrl,
    };

    if (options.useMock) {
      modules.value = mockModules(fetchOptions);
    } else {
      modules.value = apiModules(fetchOptions);
    }
  }

  return modules.value;
}

export { EnumContact, EnumAddress, type EnumAddressType, type EnumContactType };
