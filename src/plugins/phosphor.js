// This plugin defines all icons used.
// We're exporting the components using a more generic name making it possible
// to switch to a different icon library without the need of changing all occurrences in all files.

import {
    PhUserCircle,
    PhLock,
    PhEye,
    PhEyeSlash,
    PhCaretUp,
    PhCaretDown,
    PhCaretLeft,
    PhCaretRight,
    PhArrowsLeftRight,
    PhArrowsInSimple,
    PhArrowLeft,
    PhPencil,
    PhBell,
    PhX,
    PhDiscordLogo,
    PhQuestion,
    PhList
  } from '@phosphor-icons/vue';

  export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component("IconUserCircle", PhUserCircle);
    nuxtApp.vueApp.component("IconLock", PhLock);
    nuxtApp.vueApp.component("IconEye", PhEye);
    nuxtApp.vueApp.component("IconEyeSlash", PhEyeSlash);
    nuxtApp.vueApp.component("IconCaretUp", PhCaretUp);
    nuxtApp.vueApp.component("IconCaretDown", PhCaretDown);
    nuxtApp.vueApp.component("IconCaretLeft", PhCaretLeft);
    nuxtApp.vueApp.component("IconCaretRight", PhCaretRight);
    nuxtApp.vueApp.component("IconArrowsLeftRight", PhArrowsLeftRight);
    nuxtApp.vueApp.component("IconArrowInSimple", PhArrowsInSimple);
    nuxtApp.vueApp.component("IconArrowLeft", PhArrowLeft);
    nuxtApp.vueApp.component("IconPencil", PhPencil);
    nuxtApp.vueApp.component("IconBell", PhBell);
    nuxtApp.vueApp.component("IconClose", PhX);
    nuxtApp.vueApp.component("IconDiscordLogo", PhDiscordLogo);
    nuxtApp.vueApp.component("IconQuestion", PhQuestion);
    nuxtApp.vueApp.component("IconList", PhList);
  });
