<template>
  <div class="header">
    <div v-if="username" class="username">
      Welcome, {{ username }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      username: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null
    };
  },
  watch: {
    '$route': function() {
      this.username = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).username : null;
    }
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.username {
  font-size: 1.25rem;
  font-weight: 500;
  color: #343a40;
}
</style>
