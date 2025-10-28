<template>
  <div>
    <section id="login">
      <form @submit="handleSubmit">
        <h1>Welcome!</h1>
        <p v-if="error" style="color: red">{{ error }}</p>
        <label for="username">username</label>
        <input 
          name="username" 
          type="text" 
          v-model="loginData.username"
          required
        />
        <label for="password">password</label>
        <input 
          type="password" 
          name="password" 
          v-model="loginData.password"
          required
        />
        <input type="submit" value="Login" />
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/login.css';

const router = useRouter();

const loginData = ref({
  username: '',
  password: ''
});

const error = ref('');

function handleSubmit(e) {
  e.preventDefault();
  
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && 
      storedUser.username === loginData.value.username && 
      storedUser.password === loginData.value.password) {
    router.push("/dashboard");
  } else {
    error.value = 'Invalid username or password';
  }
}
</script>