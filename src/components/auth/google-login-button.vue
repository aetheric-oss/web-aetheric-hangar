<template>
    <button :class="computedClasses">
        <img 
        class="google"
        src="~/assets/icons/google.svg"
        alt="Google"
        />
        Login with Google
    </button>
</template>

<script>
export default {
  props: {
    classValue: {
      type: String,
      default: '' 
    }
  },
  computed: {
    computedClasses() {
      return this.classValue;
    }
  }
};
</script>

<style>
.google {
    width: 10%;
    height: 70%;
}
</style>