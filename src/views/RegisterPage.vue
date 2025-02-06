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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  overflow: hidden;
}

/* Glassmorphism Register Card */
.register-card {
  width: 380px;
  padding: 30px;
  border-radius: 15px;
  backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  animation: fadeIn 1s ease-in-out;
}

/* Title */
.title {
  font-size: 24px;
  color: #fff;
  margin-bottom: 20px;
}

/* Input Fields */
.input-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  text-align: center;
  outline: none;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  transition: 0.3s;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

input:focus {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}

/* Button with Click Effect */
.register-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 18px;
  background: #ff7eb3;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.register-button:hover {
  background: #ff529c;
}

.register-button:active {
  transform: scale(0.95);
}

/* Error Message */
.error-msg {
  color: #ff4d4d;
  margin-top: 10px;
  font-weight: bold;
  animation: shake 0.4s ease-in-out;
}

/* Login Link */
.login-text {
  margin-top: 15px;
  color: #fff;
}

.login-text a {
  color: #ff7eb3;
  text-decoration: none;
  font-weight: bold;
}

.login-text a:hover {
  text-decoration: underline;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-scale-enter-active {
  animation: fadeScale 0.6s ease-in-out;
}

@keyframes fadeScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.shake-enter-active {
  animation: shake 0.4s ease-in-out;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  50% {
    transform: translateX(5px);
  }
  75% {
    transform: translateX(-5px);
  }
}
</style>
