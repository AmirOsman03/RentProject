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
  // data() {
  //   return {
  //     username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null,
  //   };
  // },
  // watch: {
  //   '$route': function() {
  //     this.username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
  //   }
  // },
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
  transition: color 0.3s ease, transform 0.3s ease;
}

a:hover {
  color: #ffdd57;
  transform: translateY(-3px);
}

button {
  background-color: #ffdd57;
  color: #1f2937;
  border: none;
  padding: 5px 20px;
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
}

body {
  padding-top: 70px;
}
</style>