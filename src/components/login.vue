<template>
  <div>
    <section id="login">
      <form @submit="handleSubmit">
        <h1>Welcome!</h1>
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
import { useToast } from '../composables/useToast';
import '../styles/login.css';

const router = useRouter();
const { success, error } = useToast();

const loginData = ref({
  username: '',
  password: ''
});

function handleSubmit(e) {
  e.preventDefault();
  
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser && 
      storedUser.username === loginData.value.username && 
      storedUser.password === loginData.value.password) {
    success('Login successful! Welcome back.');
    router.push("/dashboard");
  } else {
    error('Invalid username or password. Please try again.');
  }
}
</script>