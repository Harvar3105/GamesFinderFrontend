<template>
  <div class="flex flex-col items-center h-screen space-y-5 text-center py-5">
    <img
        :src="avatarSrc"
        alt="User Avatar"
        class=" w-75 h-75 rounded-full cursor-pointer border border-amber-300 dark:border-[#33353b] shadow-sm"
    />
    <div class="flex flex-col items-center h-screen space-y-5 text-center py-5 w-2/3">
      <TextDisplayField :text="`Username:\n${user?.username}`" :class-options="fieldsSharedOptions"/>
      <TextDisplayField :text="`Name:\n${preparedName}`" :class-options="fieldsSharedOptions"/>
      <TextDisplayField :text="`Email:\n${user?.email}`" :class-options="fieldsSharedOptions"/>
      <span class="flex items-center justify-between w-full mx-auto space-x-2">
        <TextDisplayField :text="`WishList:\n${user?.data?.wishlist}`" :class-options="`${(user?.data?.wishlist === undefined || user?.data?.wishlist.length === 0) ? fieldsSharedOptions + ' text-red-500' : fieldsSharedOptions}`" />
        <button type="button" class="flex-shrink-0 w-15 h-15 rounded-full p-2.5 bg-amber-200 dark:bg-[#33353b] hover:bg-amber-100 dark:hover:bg-[#545761]" @click="editeWishlist">
          <svg class="w-10 h-10 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"/>
          </svg>
        </button>
    </span>
    </div>
  </div>
  <UniversalDialog v-if="wishlistDialogOpen" @close="onWishlistClose">
    <div class="flex flex-col items-end gap-2">
      <TextInputField @update="updateWishlist"/>
      <button @click="saveWishlist" type="button" class="bg-green-600 py-2 px-4 rounded-2xl">
        Done
      </button>
    </div>
  </UniversalDialog>
</template>

<script setup lang="ts">
import {useUserStore} from "@/store/user-store.ts";
import {computed, ref} from "vue";
import TextDisplayField from "@/views/widgets/fields/TextDisplayField.vue";
import UniversalDialog from "@/views/widgets/dialog/UniversalDialog.vue";
import TextInputField from "@/views/widgets/fields/TextInputField.vue";
import {controller} from "@/axios/BackendController.ts";
import {User} from "@shared/entities/User.ts";

const fieldsSharedOptions:string = "w-full";

const userStore = useUserStore();
const user = userStore.user;

const wishlistDialogOpen = ref<boolean>(false);

const preparedName = `${user?.firstName} ${user?.lastName}`;

const avatarSrc = computed(() => {
  const user = userStore.user;
  if (user?.data?.avatarContent) {
    return `data:${user.data?.avatarType};base64,${user.data?.avatarContent}`;
  }
  return new URL('@/assets/default-user.png', import.meta.url).href;
});

const editeWishlist = () => {
  wishlistDialogOpen.value = true;
};
const wishlist = ref('');
const onWishlistClose = () => {
  wishlistDialogOpen.value = false;
};
const updateWishlist = (value: string) => {
  wishlist.value = value;
}
const saveWishlist = async () => {
  const parsedWishlist = parseWishlist(wishlist.value);

  if (parsedWishlist){
    // const result = await controller.crawlSteam(parsedWishlist, false);

    const user = userStore.user;
    console.log(user);
    user!.data!.wishlist = parsedWishlist;
    await userStore.setUserWithDataSave(user as User);

    wishlistDialogOpen.value = false;
  } else {
    console.error(`Could not parse ${wishlist.value}`);
  }
}

function parseWishlist(wishlist: string): number[] | null {
  try {
    let preparedWishlist = "";
    if (wishlist.includes('[') && wishlist.includes(']')) {
      preparedWishlist = wishlist;
    } else {
      preparedWishlist = '[' + wishlist + ']';
    }

    const parsed = JSON.parse(preparedWishlist);
    if (Array.isArray(parsed) &&
        parsed.every(item => typeof item === 'number' && Number.isInteger(item))) {
      return parsed;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

</script>