<template>
  <div class="register-container">
    <transition name="fade-scale">
      <div class="register-card">
        <h1 class="title">Create Account</h1>

        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <input type="text" v-model="username" required placeholder="Username" />
          </div>
          <div class="input-group">
            <input type="password" v-model="password" required placeholder="Password" />
          </div>
          <div class="input-group">
            <input type="password" v-model="confirmPassword" required placeholder="Confirm Password" />
          </div>

          <button type="submit" class="register-button">Sign Up</button>
        </form>

        <transition name="shake">
          <div v-if="registerError" class="error-msg">
            Passwords do not match or something went wrong.
          </div>
        </transition>

        <p class="login-text">
          Already have an account?
          <router-link to="/login">Login</router-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import '../assets/css/register.css'
export default {
  name: "RegisterPage",
  data() {
    return {
      username: "",
      password: "",
      confirmPassword: "",
      registerError: false,
      users: [
        { username: "admin", password: "admin" },
        { username: "user", password: "user" },
      ],
    };
  },
  methods: {
    handleRegister() {
      if (this.password !== this.confirmPassword) {
        this.registerError = true;
        setTimeout(() => {
          this.registerError = false;
        }, 2000);
        return;
      }

      const userExists = this.users.find(user => user.username === this.username);
      if (!userExists) {
        this.users.push({ username: this.username, password: this.password });
        localStorage.setItem("user", JSON.stringify({ username: this.username }));
        this.$router.push("/home");
      } else {
        this.registerError = true;
        setTimeout(() => {
          this.registerError = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
/* Gradient Background */

</style>
