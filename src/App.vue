<script setup>
import NavBar from "@/components/NavBar/Nav.vue";

</script>

<template>
  <div v-if="$route.meta.requiresAuth">
    <NavBar />
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<style></style>
