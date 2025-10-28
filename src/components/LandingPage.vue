<template>
  <div>
    <nav class="landingPage-nav">
      <div class="nav-logo">
        <h1>tickHandler</h1>
      </div>
      <div class="nav-buttons">
        <button @click="navigate('Login')">Login</button>
        <button @click="navigate('Get Started')">Get Started</button>
      </div>
    </nav>

    <section id="hero">
      <div class="hero-container">
        <h1>Manage tickets effortlessly anytime,anywhere</h1>
        <p>
          Streamline your ticket management process with our intuitive platform designed for efficiency and ease of use.
          managment process made efficient
        </p>
        <div class="hero-button">
          <button @click="navigate('Get Started')">Get Started</button>
          <button @click="navigate('Login')">Login</button>
        </div>
        <span>Secure. Fast. Built for you.</span>
      </div>
      <img :src="waveImg" alt="" />
    </section>

    <section id="features">
      <div class="feature-intro">
        <h1>Features</h1>
        <p>Explore the powerful features that make ticket management a breeze.</p>
      </div>
      <div class="feature-cards">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <h2>{{ feature.title }}</h2>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </section>

    <footer>
      <p>&copy; 2024 tickHandler. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import waveImg from './wave.svg' // <- fix path if needed

export default {
  name: 'LandingPage',
  data() {
    return {
      waveImg,
      features: [
        {
          title: 'Create tickets',
          description: 'Description of feature one.'
        },
        {
          title: 'Edit Tickets',
          description: 'Description of feature two.'
        },
        {
          title: 'View Tickets',
          description: 'Description of feature three.'
        },
        {
          title: 'Delete Tickets',
          description: 'Description of feature three.'
        }
      ]
    }
  },
  methods: {
    navigate(buttonText) {
      if (buttonText === 'Login') {
        this.$router.push('/login')
      } else if (buttonText === 'Get Started') {
        this.$router.push('/signup')
      }
    }
  }
}
</script>

<style scoped>
/* Import your existing CSS */
@import '../styles/landingPage.css';
</style>