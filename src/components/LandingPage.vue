<template>
  <div>
    <nav class="landingPage-nav">
      <div class="nav-logo">
        <h1>tickHandler</h1>
      </div>
      <div class="nav-buttons">
        <button @click="handleNavigation" type="button">
          Login
        </button>
        <button @click="handleNavigation" type="button">
          Get Started
        </button>
      </div>
    </nav>

    <section id="hero">
      <div class="hero-container">
        <h1>Manage tickets effortlessly anytime, anywhere</h1>
        <p>
          Streamline your ticket management process with our intuitive platform designed for efficiency and ease of use.
          management process made efficient
        </p>
        <div class="hero-button">
          <button @click="handleNavigation" type="button">
            Get Started
          </button>
          <button @click="handleNavigation" type="button">
            Login
          </button>
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
        <div class="feature-card">
          <h2>Create tickets</h2>
          <p>Description of feature one.</p>
        </div>
        <div class="feature-card">
          <h2>Edit Tickets</h2>
          <p>Description of feature two.</p>
        </div>
        <div class="feature-card">
          <h2>View Tickets</h2>
          <p>Description of feature three.</p>
        </div>
        <div class="feature-card">
          <h2>Delete Tickets</h2>
          <p>Description of feature three.</p>
        </div>
      </div>
    </section>

    <footer>
      <p>&copy; 2024 tickHandler. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import waveImg from '../assets/wave.svg';
import '../styles/landingPage.css';

const router = useRouter();

function handleNavigation(e) {
  const wasClicked = e.target.innerText;
  
  if (wasClicked === "Login") {
    router.push("/login");
  } else if (wasClicked === "Get Started") {
    router.push("/signUp");
  }
}
</script>