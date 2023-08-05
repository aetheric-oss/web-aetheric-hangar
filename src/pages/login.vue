<template>
    <main class="login">
      <MobileLoginLayout v-show="isMobile">
        <NuxtLayout name="mobile-login"></NuxtLayout>
      </MobileLoginLayout>
  
      <DesktopLoginLayout v-show="!isMobile">
        <NuxtLayout name="desktop-login"></NuxtLayout>
      </DesktopLoginLayout>
    </main>
  </template>
  
  <script setup>

  import { isMobile } from 'mobile-device-detect';
  import MobileLoginLayout from '~/layouts/auth/mobile-login.vue'; 
  import DesktopLoginLayout from '~/layouts/auth/desktop-login.vue';
  
  definePageMeta({ layout: 'auth/login' });
  </script>
  
<style>

</style>