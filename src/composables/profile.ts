import { useLocalStorage } from "@vueuse/core";

export const useCurrentCompany = () =>
  useState<string>("currentCompany", () => "");
export const useCurrentUsername = () =>
  useState<string>("currentUsername", () =>
    useLocalStorage("aetheric/auth/username", "")
  );
export const useCurrentTheme = () =>
  useState<string>("currentTheme", () => {
    let theme = useLocalStorage(
      "aetheric/profile/theme",
      usePreferredTheme()
    );

    return theme;
  });
export const useSelectedTheme = () =>
    useState<string>("selectedTheme", () => {
      let theme = useLocalStorage(
        "aetheric/profile/selected_theme",
        usePreferredTheme()
      );

      return theme;
    });
export const usePreferredTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
