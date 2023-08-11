<template>
    <div class="justify-content-center ">
      <div class="p-1 text-white">
        <label for="Username">Username</label>
        <input
          type="username"
          class="desktop-button-input text-white"
          aria-describedby="username"
          placeholder="Type username"
        />
      </div>
    </div>
    <div class="justify-content-center">
      <div class="p-1 text-white">
        <label for="Pasword">Password</label>
        <input
          type="password"
          class="desktop-button-input text-white"
          placeholder="Type your password"
          v-model="password"
        />
      </div>
    </div>
    <div class="p-1 d-flex justify-content-end">
      <a
        href="#"
        class="font-weight-bold text-decoration-underline text-white p-1"
      >FORGOT PASSWORD?</a
      >
    </div>
    <div class="justify-content-center p-1 text-center">
    <button type="submit" class="btn login-button">Login</button>
  </div>
</template>

<style>
.login-button {
  background-color: #FF5E45;
  height: 60px;
  width: 95%;
  display: block;
  margin: 0 auto;
  align-items: center; 
  justify-content: center; 
}
.login-button:hover {
  background-color: #FF5E45;
}
</style>