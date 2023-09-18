<template>
    <div class="justify-content-center form-group">
        <div class="p-1 text-white input-group">
            <label for="Username" class="text-gray">Username</label>
            <div class="input-group-addon desktop-button-input border border-white">
                <PhUserCircle :size="24" />
                <input
                    type="username"
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
        <a
            href="#"
            class="font-weight-bold text-decoration-underline text-white p-1 mr-1"
        >FORGOT PASSWORD?</a>
    </div>
    <div class="justify-content-center p-1 text-center">
        <button type="submit" class="btn login-button">Login</button>
    </div>
</template>

<script>
import { PhUserCircle, PhLock, PhEye, PhEyeSlash } from "@phosphor-icons/vue";

export default {
    data() {
        return {
        showPassword: false,
        password: null
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
        return (this.showPassword) ? "Hide" : "Show";
    }
},
methods: {
    toggleShow() {
        this.showPassword = !this.showPassword;
        }
    }
}

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

