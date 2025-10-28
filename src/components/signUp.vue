<template>
  <div>
    <section id="signup">
      <form @submit="handleSubmit" method="post">
        <h1>Create your account</h1>
        <label for="username">Username</label>
        <input 
          type="text" 
          name="username" 
          id="username" 
          v-model="user.username"
          required 
        />
        <label for="email">Email</label>
        <input 
          type="email" 
          name="email" 
          id="email" 
          v-model="user.email"
          required 
        />
        <label for="password">Password</label>
        <input 
          type="password" 
          name="password" 
          id="password" 
          v-model="user.password"
          required 
        />
        <input type="submit" value="Sign Up" />
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import '../styles/signUp.css';

const router = useRouter();

const user = ref({
  username: '',
  email: '',
  password: ''
});

// Watch for changes and update localStorage
watch(user, (newUser) => {
  localStorage.setItem("user", JSON.stringify(newUser));
}, { deep: true });

function handleSubmit(e) {
  e.preventDefault();
  localStorage.setItem("user", JSON.stringify(user.value));
  router.push("/dashboard");
}
</script>