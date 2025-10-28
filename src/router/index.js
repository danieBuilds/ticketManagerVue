import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../components/LandingPage.vue';
import Login from '../components/login.vue';
import SignUp from '../components/signUp.vue';
import Dashboard from '../components/dashboard.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: Login },
  { path: '/signUp', component: SignUp },
  { path: '/dashboard', component: Dashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;