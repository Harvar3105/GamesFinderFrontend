<template>
  <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
    <form id="registrationForm" @submit="handleSubmit">
      <div class="mb-4">
        <label for="username" class="block text-gray-700 font-semibold mb-2">Username</label>
        <input v-model="username" type="text" id="username" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your username" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="usernameError">Username is required.</p>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email</label>
        <input v-model="email" type="email" id="email" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="emailError">Please enter a valid email.</p>
      </div>
      <div class="mb-4">
        <label for="firstName" class="block text-gray-700 font-semibold mb-2">First Name</label>
        <input v-model="firstName" type="text" id="firstName" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="firstNameError">Please enter a valid email.</p>
      </div>
      <div class="mb-4">
        <label for="lastName" class="block text-gray-700 font-semibold mb-2">Last Name</label>
        <input v-model="lastName" type="text" id="lastName" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your email" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="lastNameError">Please enter a valid email.</p>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-semibold mb-2">Password</label>
        <input v-model="password" type="password" id="password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter your password" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="passwordError">Password is required.</p>
      </div>
      <div class="mb-4">
        <label for="confirm-password" class="block text-gray-700 font-semibold mb-2">Confirm Password</label>
        <input v-model="confirmPassword" type="password" id="confirm-password" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Confirm your password" required>
        <p class="text-red-500 text-sm mt-2 hidden" id="confirmPasswordError">Passwords do not match.</p>
      </div>
      <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Register</button>
    </form>
    <p class="text-center text-gray-600 mt-4">Already have an account? <a href="#" class="text-blue-500 font-semibold">Sign In</a></p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const email = ref('')
const firstName = ref('')
const lastName = ref('')
const password = ref('')
const confirmPassword = ref('')

const handleSubmit = async (e: Event) => {
  e.preventDefault()

  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match')
    return
  }

  try {
    const response = await axios.post((import.meta as any).env.VITE_NODE_SERVER_URL + (import.meta as any).env.VITE_NODE_SERVER_REGISTER_PATH, {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value
    })

    alert('Registration successful!')
    console.log(response.data)
  } catch (error) {
    console.error(error)
    alert('Registration failed.')
  }
}
</script>