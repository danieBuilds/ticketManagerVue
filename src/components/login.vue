<template>
  <section id="login">
    <form @submit.prevent="handleSubmit">
      <h1>Welcome!</h1>
      <p v-if="error" class="error" style="color: red;">{{ error }}</p>

      <label for="username">username</label>
      <input
        id="username"
        name="username"
        type="text"
        v-model="loginData.username"
        required
      />

      <label for="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="loginData.password"
        required
      />

      <input type="submit" value="Login" />
    </form>
  </section>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginData = reactive({
  username: '',
  password: ''
})
const error = ref('')

function handleSubmit() {
  error.value = ''
  const stored = localStorage.getItem('user')
  let storedUser = null

  try {
    storedUser = stored ? JSON.parse(stored) : null
  } catch (e) {
    storedUser = null
  }
}
</Script>