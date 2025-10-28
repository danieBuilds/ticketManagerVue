import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'


// Import components
import Dashboard from './components/Dashboard.vue'
import Login from './components/Login.vue'
import SignUp from './components/SignUp.vue'
import LandingPage from './components/LandingPage.vue'

// Define routes
const routes = [
  { path: '/', component: LandingPage },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/signup', component: SignUp }
]

// Create router instance
const router = createRouter({
  history: createWebHistory('/taskManager-react'),
  routes
})

// Create and mount the Vue application
const app = createApp(App)
app.use(router)
app.mount('#app')