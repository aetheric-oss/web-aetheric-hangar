// This plugin defines all icons used.
// We're exporting the components using a more generic name making it possible
// to switch to a different icon library without the need of changing all occurrences in all files.

import {
  PhUserCircle,
  PhUserGear,
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
  PhList,
  PhShieldCheck,
  PhSignOut,
  PhCheck,
  PhWarning,
  PhDotOutline,
  PhCreditCard,
  PhAt,
  PhPhone,
  PhBank,
  PhSquaresFour,
  PhSlidersHorizontal,
  PhDotsThreeOutline,
} from "@phosphor-icons/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("IconUserCircle", PhUserCircle);
  nuxtApp.vueApp.component("IconUserGear", PhUserGear);
  nuxtApp.vueApp.component("IconLock", PhLock);
  nuxtApp.vueApp.component("IconEye", PhEye);
  nuxtApp.vueApp.component("IconEyeSlash", PhEyeSlash);
  nuxtApp.vueApp.component("IconCaretUp", PhCaretUp);
  nuxtApp.vueApp.component("IconCaretDown", PhCaretDown);
  nuxtApp.vueApp.component("IconCaretLeft", PhCaretLeft);
  nuxtApp.vueApp.component("IconCaretRight", PhCaretRight);
  nuxtApp.vueApp.component("IconArrowsLeftRight", PhArrowsLeftRight);
  nuxtApp.vueApp.component("IconArrowsInSimple", PhArrowsInSimple);
  nuxtApp.vueApp.component("IconArrowLeft", PhArrowLeft);
  nuxtApp.vueApp.component("IconPencil", PhPencil);
  nuxtApp.vueApp.component("IconBell", PhBell);
  nuxtApp.vueApp.component("IconClose", PhX);
  nuxtApp.vueApp.component("IconDiscordLogo", PhDiscordLogo);
  nuxtApp.vueApp.component("IconQuestion", PhQuestion);
  nuxtApp.vueApp.component("IconList", PhList);
  nuxtApp.vueApp.component("IconShieldCheck", PhShieldCheck);
  nuxtApp.vueApp.component("IconSignOut", PhSignOut);
  nuxtApp.vueApp.component("IconCheck", PhCheck);
  nuxtApp.vueApp.component("IconWarning", PhWarning);
  nuxtApp.vueApp.component("IconDotOutline", PhDotOutline);
  nuxtApp.vueApp.component("IconCreditCard", PhCreditCard);
  nuxtApp.vueApp.component("IconAt", PhAt);
  nuxtApp.vueApp.component("IconPhone", PhPhone);
  nuxtApp.vueApp.component("IconBank", PhBank);
  nuxtApp.vueApp.component("SquaresFour", PhSquaresFour);
  nuxtApp.vueApp.component("SlidersHorizontal", PhSlidersHorizontal);
  nuxtApp.vueApp.component("DotsThreeOutline", PhDotsThreeOutline);
});
