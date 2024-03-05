import { useLocalStorage } from "@vueuse/core";

export const useCurrentCompany = () => useState<string>('currentCompany', () => "");
export const useCurrentUsername = () => useState<string>('currentUsername', () => useLocalStorage("aetheric/auth/username", ""));
