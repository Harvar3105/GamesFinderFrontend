<template>
  <div class="p-30">
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead class="bg-gray-200">
      <tr>
        <th class="border p-2">#</th>
        <th class="border p-2">Image</th>
        <th class="border p-2">Name</th>
        <th class="border p-2">Description</th>
        <th class="border p-2">Vendor 1</th>
        <th class="border p-2">Vendor 1 Price</th>
        <th class="border p-2">Vendor 2</th>
        <th class="border p-2">Vendor 2 Price</th>
        <th class="border p-2">Actions</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in games" :key="item.id" class="hover:bg-gray-50">
          <td class="border p-2 text-center">{{ index + 1 }}</td>
          <td class="border p-2 text-center">
            <img :src="item.headerImage" alt="game image" class="h-10 w-15 object-contain mx-auto" />
          </td>
          <td class="border p-2">{{ item.name }}</td>
          <td class="border p-2">{{ item.description }}</td>
          <td class="border p-2">{{ item.offers.find(o => o.vendor == EVendor.Steam)?.vendor ?? '-' }}</td>
          <td class="border p-2">{{ item.offers.find(o => o.vendor == EVendor.Steam)?.prices.entries() }}</td>
          <td class="border p-2">{{ item.offers.find(o => o.vendor == EVendor.InstantGaming)?.vendor ?? '-'  }}</td>
          <td class="border p-2">{{ item.offers.find(o => o.vendor == EVendor.InstantGaming)?.prices.entries() }} €</td>
          <td class="border p-2 text-center">
  <!--          <button @click="onEdit(item)" class="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-sm">-->
  <!--            Edit-->
  <!--          </button>-->
  <!--          <button @click="onDelete(item)" class="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm ml-2">-->
  <!--            Delete-->
  <!--          </button>-->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {controller} from "@/axios/BackendController.ts";
import {EVendor} from "@shared/enums";

let games = await controller.getGamesWithOffersPaged(1, 50);
if (!games){
  games = [];
  alert("No games found.");
}
</script>