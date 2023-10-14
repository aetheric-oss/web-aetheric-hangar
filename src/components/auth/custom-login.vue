<template>
    <form class="form-group">
        <div class="justify-content-center form-group">
            <div class="p-1 text-white input-group">
                <label for="Username" class="text-gray">Username</label>
                <div class="input-group-addon desktop-button-input border border-white">
                    <PhUserCircle :size="24" />
                    <input
                        type="text"
                        class="desktop-button-input text-white"
                        aria-describedby="username"
                        placeholder="Type username"
                        v-model="username"
                    />
                </div>
            </div>
        </div>
        <div class="justify-content-center form-group">
            <div class="p-1 text-white input-group">
                <label for="Password" class="text-gray">Password</label>
                <div class="input-group-addon desktop-button-input border border-white">
                    <PhLock :size="24" class="text-dark"/>
                    <input v-if="showPassword"
                        type="text"
                        class="desktop-button-input text-white"
                        placeholder="Type your password"
                        v-model="password"
                    /><input v-else
                        type="password"
                        class="desktop-button-input text-white border-0"
                        placeholder="Type your password"
                        v-model="password"
                    />
                <button type="button" class="btn btn-link m-0 p-0" @click="toggleShow">
                    <PhEye v-if="!showPassword" :size="24" class="eye-color" />
                    <PhEyeSlash v-if="showPassword" :size="24" class="eye-color" />
                </button>
                </div>
            </div>
        </div>
        <div class="p-1 d-flex justify-content-end">
            <nuxt-link
                to="/login/forgot-password"
                class="font-weight-bold text-decoration-underline text-white p-0">FORGOT PASSWORD?
            </nuxt-link>
        </div>
        <div class="justify-content-center p-1 text-center">
            <button type="button" class="btn login-button" @click="customLogin">Login</button>
        </div>
    </form>
</template>

<script>
import { useAuthStore } from '@/store/auth';
import { PhUserCircle, PhLock, PhEye, PhEyeSlash } from "@phosphor-icons/vue";
import userData from "../../utils/users.json"

export default {
    data() {
        return {
            username: "",
            password: "",
            showPassword: false,
            store: useAuthStore(),
        };
    },
    components: {
        PhUserCircle,
        PhLock,
        PhEye,
        PhEyeSlash
    },
    computed: {
        buttonLabel() {
            return this.showPassword ? "Hide" : "Show";
        },
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        customLogin() {
            // TODO: Replace with actual login logic using Axios
            let user = userData.find(el => el.username === this.username && el.password === this.password);

            if (!user) {
                const errorMessage = "The password and/or username is wrong. <br>We can’t log you into the platform."
                this.$emit('error', errorMessage);
            } else {
                this.store.login()
                this.$router.push('/dashboard');
            }
        }
    }
};


</script>

<style  scoped lang="scss">
.login-button {
    background-color: $coral-red;
    width: 95%;
    display: block;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
}

.login-button:hover
.login-button:active {
    background-color:  $coral-red!important;
}

.btn-link {
    margin: 0;
    padding: 0;
}

.eye-color {
    color: $coral-red;
    vertical-align: middle;
}

</style>

