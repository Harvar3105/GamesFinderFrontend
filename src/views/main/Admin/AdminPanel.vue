<script setup lang="ts">
import { onMounted, ref} from 'vue';
import {steamController} from "@/axios/ControllersInit.ts";
import ResponseError from "@/axios/ResponseError.ts";

const cellStyle = "p-2";

const jsonStats = ref<{lastMod: Date, contentCount: number} | undefined>();
const fetchJsonStats = async () => {
  const result = await steamController.getSteamJsonMetadata();
  if (result instanceof ResponseError) {
    console.error(result.error);
  } else {
    jsonStats.value = result;
  }
}
const updateSteamJson = async () => {
  const result = await steamController.updateSteamJson();
  if (!result) {
    await fetchJsonStats();
  } else {
    console.error(result.error);
  }
}

onMounted(async () => {
  await fetchJsonStats();
})
</script>

<template>
  <div class="p-6">
    <button type="button" class="btn btn-primary" @click="updateSteamJson">Update JSON</button>
    <div>
      <h1>
        Steam JSON stats:
      </h1>
      <table class="table border-2 border-amber-100">
        <thead>
          <tr>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td :class="cellStyle">
              Last Update:
            </td>
            <td :class="cellStyle">
              {{jsonStats?.lastMod ?? "Unknown"}}
            </td>
          </tr>
          <tr>
            <td :class="cellStyle">
              Content Count:
            </td>
            <td :class="cellStyle">
              {{jsonStats?.contentCount ?? "Unknown"}}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

</style>