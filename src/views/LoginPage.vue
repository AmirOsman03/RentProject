<template>
  <div class="login-container">
    <transition name="fade-scale">
      <div class="login-card">
        <h1 class="title">Welcome Back</h1>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <input type="text" v-model="username" required placeholder="Username" />
          </div>
          <div class="input-group">
            <input type="password" v-model="password" required placeholder="Password" />
          </div>

          <button type="submit" class="login-button">Login</button>
        </form>

        <transition name="shake">
          <div v-if="loginError" class="error-msg">
            Invalid username or password.
          </div>
        </transition>

        <p class="register-text">
          Don't have an account?
          <router-link to="/register">Sign up</router-link>
        </p>
      </div>
    </transition>
  </div>
</template>

<script>
import "../assets/css/login.css";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      loginError: false,
      users: [
        { username: "admin", password: "admin", role: "admin" },
        { username: "user", password: "user", role: "user" },
      ],
    };
  },
  methods: {
    handleLogin() {
      const user = this.users.find(
          (user) =>
              user.username === this.username && user.password === this.password
      );

      if (user) {
        // Зачувување на податоци во localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userRole", user.role); // Додавање на role

        this.$router.push("/home"); // Пренасочување на home по успешна најава
      } else {
        this.loginError = true;
        setTimeout(() => {
          this.loginError = false;
        }, 2000);
      }
    },
  },
};
</script>


