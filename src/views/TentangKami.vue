<template>
  <LandingLayout>
    <div class="container">
      <div class="text-center mb-4 overflow-hidden">
        <h1
          class="display-6 mb-0 fw-bold text-blue border-bottom-warning title-page"
        >
          Tentang Kami
        </h1>
        <div class="row border-top-warning">
          <div class="col-md-12 pt-3 text-start">
            <div v-html="tentangKami"></div>
          </div>
        </div>
      </div>
    </div>
  </LandingLayout>
</template>

<script setup lang="ts">
import { disableLoader, enableLoader } from "../helpers/event";
import LandingLayout from "./LandingLayout.vue";
import { ref, onMounted } from "vue";

const tentangKami = ref<string>("");

const loadData = async () => {
  enableLoader();
  const response = await fetch(import.meta.env.VITE_API + "/about-me");
  const data = await response.json();
  disableLoader();
  tentangKami.value = data.data.content;
}



onMounted(async () => {
  await loadData();
});
</script>
