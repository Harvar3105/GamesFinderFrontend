<template>
  <div class="p-6">

    <div class="mb-4 flex flex-wrap gap-4 items-end">
      <div>
        <label class="block text-sm font-medium mb-1">Search by Name</label>
        <input v-model="filters.search" type="text" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg" placeholder="Enter game name" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Price Filter</label>
        <select v-model="filters.priceFilter"
                class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg">
          <option :value="null">All</option>
          <option :value="EPriceCompare.null">TDA</option>
          <option :value="EPriceCompare.notNull">Available</option>
          <option :value="EPriceCompare.greater">Greater</option>
          <option :value="EPriceCompare.less">Less</option>
          <option :value="EPriceCompare.equal">Equal to</option>
          <option :value="EPriceCompare.inRange">Price in range</option>
        </select>
      </div>

      <div v-if="filters.priceFilter === EPriceCompare.greater || filters.priceFilter === EPriceCompare.less">
        <label class="block text-sm font-medium mb-1">Price Value</label>
        <input v-model.number="filters.priceValue" type="number" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg" />
      </div>

      <div v-if="filters.priceFilter === EPriceCompare.inRange" class="flex gap-2">
        <div>
          <label class="block text-sm font-medium mb-1">Min</label>
          <input v-model.number="filters.priceRangeMin" type="number" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1">Max</label>
          <input v-model.number="filters.priceRangeMax" type="number" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg" />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Sort by</label>
        <select v-model="filters.sortField" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg">
          <option value="name">Name</option>
          <option value="steam">Steam Price</option>
          <option value="instant">Instant Gaming Price</option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Direction</label>
        <select v-model="filters.sortOrder" class="border rounded px-2 py-1 bg-amber-200 dark:bg-[#33353b] shadow-lg">
          <option :value="ESort.Ascending">Ascending</option>
          <option :value="ESort.Descending">Descending</option>
        </select>
      </div>
    </div>


    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead class="">
        <tr>
          <th class="border p-2">#</th>
          <th class="border p-2">Image</th>
          <th class="border p-2">Name</th>
          <th class="border p-2">Description</th>
          <th class="border p-2">
            <div class="px-2">Steam</div>
            <span class="px-2">Initial</span>
            <span>|</span>
            <span class="px-2">Current</span>
          </th>
          <th class="border p-2">
            <div class="px-2">Instant Gaming</div>
            <span class="px-2">Initial</span>
            <span>|</span>
            <span class="px-2">Current</span>
          </th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in games" :key="item.id!" class="hover:bg-gray-700">
          <td class="border p-2 text-center">{{ index + 1 }}</td>
          <td class="border p-2 text-center ">
            <img :src="item.headerImage" alt="game image" class="h-24 w-32 object-cover mx-auto transition-transform duration-300 hover:scale-110" />
          </td>
          <td class="border p-2">{{ item.name }}</td>
          <td class="border p-2 align-top max-w-[600px]">
            <div class="line-clamp-4 break-words overflow-hidden">
              {{ item.description }}
            </div>
          </td>
          <td class="border p-2 whitespace-pre-line">
            <div v-if="getPrice(item, EVendor.Steam)">
              <div v-for="[currency, p] in getPrice(item, EVendor.Steam)" :key="currency">
                {{ currency }}: {{ p.initial }} | {{ p.current }}
              </div>
            </div>
            <div v-else>-</div>
          </td>
          <td class="border p-2 whitespace-pre-line">
            <div v-if="getPrice(item, EVendor.InstantGaming)">
              <div v-for="[currency, p] in getPrice(item, EVendor.InstantGaming)" :key="currency">
                {{ currency }}: {{ p.initial }} | {{ p.current }}
              </div>
            </div>
            <div v-else>-</div>
          </td>
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
import {computed, onMounted, ref, watch} from 'vue';
import {controller} from "@/axios/BackendController.ts";
import {ECurrency, EVendor} from "@shared/enums";
import {IGame, PriceRange} from "@shared/entities";
import GamesFilters from "@shared/params/gamesFilters.ts";
import {ESort} from "@shared/enums/ESort";
import {EPriceCompare} from "@shared/enums/EPriceCompare";

const games = ref<IGame[]>([]);

const currentPage = ref(1);

const filters = ref({
  search: '',
  priceFilter: null,
  priceValue: 0,
  priceRangeMin: 0,
  priceRangeMax: 0,
  sortField: 'name',
  sortOrder: ESort.Ascending
} as GamesFilters);

function getPrice(game: IGame, vendorKey: keyof typeof EVendor | EVendor) : Map<ECurrency, PriceRange> | null {
  return game.offers?.find(o => o.vendor === EVendor[vendorKey])?.prices || null;
}

onMounted(async () => {
  const result = await controller.getGamesWithOffersPaged(1, 25);
  if (!result) {
    alert("No games found.");
  } else {
    games.value = result.items;
  }

  watch(filters, async () => {
    currentPage.value = 1;
    await fetchGames();
  }, { deep: true });
});

const fetchGames = async () => {
  const result = await controller.getGamesWithOffersPaged(1, 25, filters.value);
  if (!result) {
    games.value = [];
  } else {
    games.value = result.items;
  }
}
</script>