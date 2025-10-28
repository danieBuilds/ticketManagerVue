<template>
  <section id="signup">
    <form @submit.prevent="handleSubmit" method="post">
      <h1>Create your account</h1>

      <label for="username">Username</label>
      <input id="username" name="username" type="text" v-model="user.username" required />

      <label for="email">Email</label>
      <input id="email" name="email" type="email" v-model="user.email" required />

      <label for="password">Password</label>
      <input id="password" name="password" type="password" v-model="user.password" required />

      <p v-if="error" class="error" style="color: red;">{{ error }}</p>

      <input type="submit" value="Sign Up" />
    </form>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = reactive({ username: '', email: '', password: '' })
const error = ref('')

function handleSubmit() {
  error.value = ''

  if (!user.username.trim() || !user.email.trim() || !user.password.trim()) {
    error.value = 'All fields are required'
    return
  }

  // simple email check
  if (!/^\S+@\S+\.\S+$/.test(user.email)) {
    error.value = 'Please enter a valid email'
    return
  }

  // persist
  try {
    localStorage.setItem('user', JSON.stringify(user))
  } catch (e) {
    error.value = 'Unable to save data locally'
    return
  }

  router.push('/dashboard')
}
</script>

<style scoped>
@import './signUp.css';
</style>