// This plugin defines all icons used.
// We're exporting the components using a more generic name making it possible
// to switch to a different icon library without the need of changing all occurrences in all files.

import {
  PhArrowLeft,
  PhArrowRight,
  PhArrowsInSimple,
  PhArrowsLeftRight,
  PhAt,
  PhBank,
  PhBell,
  PhCalendar,
  PhCaretDown,
  PhCaretLeft,
  PhCaretRight,
  PhCaretUp,
  PhCheck,
  PhCircleHalf,
  PhClock,
  PhCreditCard,
  PhDiscordLogo,
  PhDotOutline,
  PhDotsThreeOutline,
  PhEye,
  PhEyeSlash,
  PhGithubLogo,
  PhList,
  PhListMagnifyingGlass,
  PhLock,
  PhMoonStars,
  PhPencil,
  PhPhone,
  PhPlus,
  PhQuestion,
  PhShieldCheck,
  PhSignOut,
  PhSlidersHorizontal,
  PhSquaresFour,
  PhSunDim,
  PhUserCircle,
  PhUserGear,
  PhWarning,
  PhX,
} from "@phosphor-icons/vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("IconArrowLeft", PhArrowLeft);
  nuxtApp.vueApp.component("IconArrowRight", PhArrowRight);
  nuxtApp.vueApp.component("IconArrowsInSimple", PhArrowsInSimple);
  nuxtApp.vueApp.component("IconArrowsLeftRight", PhArrowsLeftRight);
  nuxtApp.vueApp.component("IconAt", PhAt);
  nuxtApp.vueApp.component("IconBank", PhBank);
  nuxtApp.vueApp.component("IconBell", PhBell);
  nuxtApp.vueApp.component("IconCalendar", PhCalendar);
  nuxtApp.vueApp.component("IconCaretDown", PhCaretDown);
  nuxtApp.vueApp.component("IconCaretLeft", PhCaretLeft);
  nuxtApp.vueApp.component("IconCaretRight", PhCaretRight);
  nuxtApp.vueApp.component("IconCaretUp", PhCaretUp);
  nuxtApp.vueApp.component("IconCheck", PhCheck);
  nuxtApp.vueApp.component("IconCircleHalf", PhCircleHalf);
  nuxtApp.vueApp.component("IconClock", PhClock);
  nuxtApp.vueApp.component("IconClose", PhX);
  nuxtApp.vueApp.component("IconCreditCard", PhCreditCard);
  nuxtApp.vueApp.component("IconDiscordLogo", PhDiscordLogo);
  nuxtApp.vueApp.component("IconDotOutline", PhDotOutline);
  nuxtApp.vueApp.component("IconDotsThreeOutline", PhDotsThreeOutline);
  nuxtApp.vueApp.component("IconEye", PhEye);
  nuxtApp.vueApp.component("IconEyeSlash", PhEyeSlash);
  nuxtApp.vueApp.component("IconGithubLogo", PhGithubLogo);
  nuxtApp.vueApp.component("IconList", PhList);
  nuxtApp.vueApp.component("IconLock", PhLock);
  nuxtApp.vueApp.component("IconMoonStars", PhMoonStars);
  nuxtApp.vueApp.component("IconPencil", PhPencil);
  nuxtApp.vueApp.component("IconPhone", PhPhone);
  nuxtApp.vueApp.component("IconPlus", PhPlus);
  nuxtApp.vueApp.component("IconQuestion", PhQuestion);
  nuxtApp.vueApp.component("IconSearch", PhListMagnifyingGlass);
  nuxtApp.vueApp.component("IconShieldCheck", PhShieldCheck);
  nuxtApp.vueApp.component("IconSignOut", PhSignOut);
  nuxtApp.vueApp.component("IconSlidersHorizontal", PhSlidersHorizontal);
  nuxtApp.vueApp.component("IconSquaresFour", PhSquaresFour);
  nuxtApp.vueApp.component("IconSunDim", PhSunDim);
  nuxtApp.vueApp.component("IconUserCircle", PhUserCircle);
  nuxtApp.vueApp.component("IconUserGear", PhUserGear);
  nuxtApp.vueApp.component("IconWarning", PhWarning);
});
