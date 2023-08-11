<template>
    <div class="login-layout row row-no-gutters mb-4">
      <section class="col-sm-4 mw-100">
            <img 
            class="d-flex justify-content-top align-items-start desktop-login-menu-svg"
            src="~/assets/icons/desktop-login-menu.svg"
            alt="Desktop Login Arrow Menu"
            />
            <p class="text-white text-center welcome-login-text fw-normal fs-3 lh-base">Welcome back to Hangar</p>
                <main class="d-grid justify-content-center">
                    <div class="button-spacing p-3">
                        <div class="custom-input-field justify-content-center">
                            <GoogleLogin class="desktop-button-input text-white"/>
                            <!-- Add error msg -->
                        </div>
                    </div>
                    <div class="divider-container">
                        <div class="divider-line"></div>
                        <div class="divider-text">OR</div>
                        <div class="divider-line"></div>
                    </div>

                        <CustomLogin />
                    <div class="h-25 py-40 px-0 mb-10">
                        <p class="poppins-style text-white">
                        Don’t have an account?
                        <a href="#" class="font-weight-bold text-decoration-underline">Sign up for FREE</a>
                        </p>
                    </div>
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
import CustomLogin from '@/components/auth/custom-login.vue';

export default {
  components: {
    GoogleLogin,
    CustomLogin
  },
  mounted() {

    this.waitForStylesheetsToLoad();
  },
  methods: {
    waitForStylesheetsToLoad() {
      const styleSheets = document.styleSheets;
      let loadedCount = 0;

      const checkLoaded = () => {
        loadedCount++;
        if (loadedCount === styleSheets.length) {
          // All stylesheets have been loaded
          this.stylesheetsLoaded = true;
        }
      };
    }
  }
}
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

.not-having-account {
    height: 10%;
}

  .poppins-style {
    font-family: Poppins, sans-serif;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
    letter-spacing: 0.1em;
    text-align: center;
  }

  .rubik-style {
    font-family: Rubik, sans-serif;
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.1em;
    text-align: center;
  }


</style>
