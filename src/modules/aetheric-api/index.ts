import { defu } from "defu";
import { defineNuxtModule, createResolver, addImportsSources } from "@nuxt/kit";
import type { Backends } from "./runtime/types";

export * from "./types";
export type {
  EnumContactType,
  EnumAddressType,
} from "./runtime/composables/useAethericApi";

export interface ModuleOptions {
  /**
   * Enable API Module
   * @default true
   * @type boolean
   */
  enabled: boolean;

  /**
   * API Module Default api Url endpoint
   * @default
   * {
   *    cargo: 'http://localhost:8080'
   *    assets: 'http://localhost:8080'
   *    contact: 'http://localhost:8080'
   * }
   * @type string
   */
  backends: Backends;

  /**
   * Should the API Module mock data be used (will not call any API endpoints)
   * @default false
   * @type boolean
   */
  useMock: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "aetheric-api",
    configKey: "api",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {
    enabled: true,
    backends: {
      cargo: "http://localhost:8080",
      assets: "http://localhost:8080",
      contact: "http://localhost:8080",
      users: "http://localhost:8080",
      auth: "http://localhost:8080",
      address: "http://localhost:8080",
      aircraft: "http://localhost:8080",
      companies: "http://localhost:8080",
    },
    useMock: false,
  },
  setup(options, nuxt) {
    if (options.enabled) {
      const { resolve } = createResolver(import.meta.url);
      nuxt.options.build.transpile.push(resolve("./runtime"));
      // @ts-ignore
      nuxt.options.runtimeConfig.public = defu(
        nuxt.options.runtimeConfig.public,
        {
          api: {
            enabled: options.enabled,
            backends: options.backends,
            useMock: options.useMock,
          },
        }
      );

      // This doesn't seem to do much? Exporting types through the module for now...
      /*
      addTypeTemplate({
        filename: "types/aetheric-api.d.ts",
        getContents: () =>
          [
            "declare global {",
            "  const ContactType: typeof import('../../node_modules/aetheric-api/dist/module')['EnumContact'];",
            "  const AddressType: typeof import('../../node_modules/aetheric-api/dist/module')['EnumAddress'];",
            '}'
          ].join("\n"),
      });
      if (nuxt.options.dev) {
        nuxt.hook("prepare:types", ({ references }) => {
          const types = resolve("types/aetheric-api.d.ts");
          references.push({ path: types });
        });
      }
    */
      addImportsSources({
        from: resolve("./runtime/composables/useAethericApi"),
        imports: ["useAethericApi", "EnumContact", "EnumAddress"],
      });
    }
  },
});
