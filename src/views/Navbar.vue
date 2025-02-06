<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/home">Rent a Car</a>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link to="/home" class="nav-link">Home</router-link>
            <router-link to="/cars" class="nav-link">Cars</router-link>
            <router-link to="/about_us" class="nav-link">About Us</router-link>
          </li>
        </ul>

        <!-- These will be shown only if the user is logged in -->
        <ul class="navbar-nav ml-auto">
          <li v-if="username" class="nav-item d-flex align-items-center">
            <span class="nav-link">Welcome, {{ username }}</span>
            <button @click="handleLogout" class="btn btn-danger ml-3">Logout</button>
          </li>

          <!-- This will be shown if the user is not logged in -->
          <li v-if="!username" class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavbarPage",
  data() {
    return {
      username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null,
    };
  },
  watch: {
    '$route': function() {
      this.username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    }
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('user');
      this.username = null;
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
  color: #333;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  animation: fadeInNav 0.5s ease-out;
}

@keyframes fadeInNav {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

ul {
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  gap: 30px;
  padding: 10px 0;
}

li {
  display: flex;
  align-items: center;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 1rem;
  padding: 10px 15px;
  transition: color 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
  border-radius: 20px;
}

a:hover {
  color: #ffdd57;
  transform: translateY(-3px);
  background-color: rgba(255, 221, 87, 0.1);
}

button {
  background-color: #ffdd57;
  color: #1f2937;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 20px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  transform: translateY(0);
}

button:hover {
  background-color: #ffc107;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

button {
  animation: buttonFadeIn 0.5s ease-out;
}

@keyframes buttonFadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-footer {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
}

body {
  padding-top: 70px;
}

/* Дополнителни стилови за модерен изглед */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
}

/* Анимации за појавување на елементи */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

/* Ховер ефект за линковите во навигацијата */
nav a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #ffdd57;
  transition: width 0.3s ease;
}

nav a:hover::after {
  width: 100%;
}

/* Подобрени копчиња */
.btn-primary {
  background: linear-gradient(90deg, #ffdd57, #ffc107);
  color: #1f2937;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
