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

    if (options.useMock) {
      modules.value = mockModules(options.backends, currentCompany);
    } else {
      modules.value = apiModules(options.backends, currentCompany);
    }
  }

  return modules.value;
}

export const flushAethericApi = () => {
  modules.value = undefined;
}

export { EnumContact, EnumAddress, type EnumAddressType, type EnumContactType };
