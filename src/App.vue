<template>
  <div>
    <router-view />
    <ToastContainer />
  </div>
</template>

<script setup>
import ToastContainer from './components/ToastContainer.vue';
</script>

<style>
/* No styles needed here */
</style>