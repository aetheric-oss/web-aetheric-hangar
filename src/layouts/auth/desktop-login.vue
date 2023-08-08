<template>
    <div class="login-layout row row-no-gutters mb-4">
      <section class="col-sm-4">
            <img 
            class="d-flex justify-content-top align-items-start desktop-login-menu-svg"
            src="~/assets/icons/desktop-login-menu.svg"
            alt="Desktop Login Arrow Menu"
            />
            <p class="text-white text-center welcome-login-text fw-normal fs-3 lh-base">Welcome back to Hangar</p>
                <main class="d-grid justify-content-center">
                    <div class="button-spacing p-3">
                        <div class="custom-input-field justify-content-center">
                            <GoogleLogin class="desktop-google-button text-white"/>
                            <!-- Add error msg -->
                        </div>
                    </div>
                    <div class="divider-container">
                        <div class="divider-line"></div>
                        <div class="divider-text">OR</div>
                        <div class="divider-line"></div>
                    </div>
                    <form>
                        test
                    </form>
                </main>
      </section>
      <section class="col-sm-8">
        <div class="d-flex justify-content-end">
            <img
            class="login-background-svg"
            src="~/assets/icons/login-background.svg"
            alt="Login Arrow Background"
            loading="lazy"
            />
        </div>
      </section>
    </div>
</template>

<script>
import GoogleLogin from '@/components/auth/google-login-button.vue';

export default {
  components: {
    GoogleLogin
  },
  
};
</script>
  
<style>
html,body, div #__nuxt, #__layout{
  height:100%!important;
  width: 100%!important;
  overflow: hidden;
}

.custom-input-field {
            width: 345px;
            height: 80px;
            padding: 8px, 0px, 8px, 0px;
            border-radius: 25px;
            display: flex;
            gap: 5px;
        }

.desktop-google-button {
  padding: 10px 15px;
  width: 90%;
  height: 80%;
  border-radius: 25px;
  align-items: center;
  gap: 10px;
  background-color: #8086ED1A;
  border: 1px solid #CCCDE0;
}

.divider-container {
        display: flex;
        align-items: center;
    }

    .divider-line {
        flex-grow: 1;
        border-top: 1px solid #ccc;
        content: "";
        margin-top: 5%;
    }

    .divider-text {
        margin: 0 10px;
        color: #999;
    }
</style>
