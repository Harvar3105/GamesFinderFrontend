<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <form id="registrationForm" @submit="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
          <input v-model="email" type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" placeholder="Enter your email" required>
          <p class="text-red-500 text-sm mt-2 hidden" id="emailError">Please enter email.</p>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
          <input v-model="password" type="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" placeholder="Enter your password" required>
          <p class="text-red-500 text-sm mt-2 hidden" id="passwordError">Password is required.</p>
        </div>
        <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Login</button>
      </form>
      <br/>
      <button type="button" class="w-full bg-green-700 text-black py-2 rounded-lg font-semibold" @click="goToRegister">
        To register
      </button>
  <!--    <p class="text-center text-gray-600 mt-4">Dont have an account? <a href="#" class="text-blue-500 font-semibold">Register</a></p>-->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import router from "@/router.ts";

const email = ref('');
const password = ref('');

const handleSubmit = async (e: Event) => {
  e.preventDefault();


  try {
    const response = await axios.post(import.meta.env.VITE_NODE_SERVER_URL + import.meta.env.VITE_NODE_SERVER_LOGIN_PATH, {
      password: password.value,
      email: email.value,
    })

    console.log(response);

    alert(`Registration successful! ${import.meta.env.VITE_NODE_SERVER_URL + import.meta.env.VITE_NODE_SERVER_LOGIN_PATH}`);
  } catch (error) {
    console.error(error);
    alert('Registration failed.');
  }
}

const goToRegister = () => {
  router.push('register');
}
</script>