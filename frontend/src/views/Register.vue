<template>
  <div class="container mt-3">
    <h2 class="text-info">
      Register or <RouterLink to="/login">Login</RouterLink>
    </h2>
    <form @submit.prevent="onSubmit" class="mt-5 mb-5">
      <div class="form-group">
        <label for="email">Email address</label>
        <input
          class="form-control"
          name="email"
          type="email"
          id="email"
          placeholder="Your Email"
        />
      </div>
      <div class="form-group mb-5">
        <label for="password">Password</label>
        <input
          class="form-control"
          name="password"
          id="password"
          type="password"
          placeholder="Your password"
        />
      </div>
      <button class="btn btn-lg btn-primary" type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth.js";

async function onSubmit(e) {
  const authStore = useAuthStore();

  const email = e.target.querySelector("input[name=email]").value;
  const password = e.target.querySelector("input[name=password]").value;

  await authStore.register(email, password);
}
</script>
