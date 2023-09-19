<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import { usePointOfSale } from "@/stores/pointOfSale";
const posState = usePointOfSale();
</script>

<template>
  <Header />

  <RouterView />
</template>
