<template>
    <main class="login container-fluid">
        <template v-if="isMobile">
        <MobileLoginLayout>
          <NuxtLayout name="mobile-login"></NuxtLayout>
        </MobileLoginLayout>
        </template>

      <template v-else>
        <DesktopLoginLayout>
          <NuxtLayout name="desktop-login"></NuxtLayout>
        </DesktopLoginLayout>
      </template>
    </main>
  </template>
  
  <script setup>

  import { isMobile } from 'mobile-device-detect';
  import MobileLoginLayout from '~/layouts/auth/mobile-login.vue'; 
  import DesktopLoginLayout from '~/layouts/auth/desktop-login.vue';
  
  definePageMeta({ layout: 'auth/login' });
  </script>
  
<style>
  div#__nuxt,
  #__layout,
  #__layout > div,
  #app {
    min-height: 100vh;
  }
</style>