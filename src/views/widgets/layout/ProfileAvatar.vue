<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <img
        :src="avatarSrc"
        alt="User Avatar"
        class="w-10 h-10 rounded-full cursor-pointer border border-amber-300 dark:border-[#33353b] shadow-sm"
        @click="toggleMenu"
    />

    <transition name="fade">
      <div
          v-if="menuVisible"
          class="absolute right-0 mt-2 w-28 origin-top-right rounded-md bg-amber-200 dark:bg-[#33353b] shadow-lg z-51"
      >
        <div class="py-1">
          <button
              class="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#43454d]"
              @click="goToProfile"
          >To Profile</button>
          <button
              class="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#43454d]"
              @click="logout"
          >Logout</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { onClickOutside } from '@vueuse/core'
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../store/user-store.ts'; // путь к твоему store может отличаться

const userStore = useUserStore();
const router = useRouter();

const menuVisible = ref(false);
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  menuVisible.value = false;
})

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const avatarSrc = computed(() => {
  const user = userStore.user;
  if (user?.data?.avatarContent) {
    return `data:${user.data?.avatarType};base64,${user.data?.avatarContent}`;
  }
  return new URL('@/assets/default-user.png', import.meta.url).href;
});

const goToProfile = () => {
  router.push('/profile');
  menuVisible.value = false;
};

const logout = () => {
  userStore.logout();
  router.push('/login');
  menuVisible.value = false;
};
</script>