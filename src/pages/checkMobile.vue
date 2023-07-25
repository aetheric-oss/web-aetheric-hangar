<template>
    <div class="hello">
        {{ msg }}
    </div>
</template>

<script>
import { isMobile } from 'mobile-device-detect';
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: isMobile ? 'Welcome to Your Vue.js mobile App!' : 'Welcome to Your Vue.js App'
        }
    }
}
</script>
