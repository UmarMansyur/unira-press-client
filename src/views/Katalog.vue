<template>
  <LandingLayout>
    <template v-if="!detail">
      <div class="container px-5">
        <div class="text-center mb-4 overflow-hidden">
          <h1
            class="display-6 mb-0 fw-bold text-blue border-bottom-warning title-page"
          >
            Katalog
          </h1>
          <div class="row border-top-warning justify-content-center">
            <div class="col-auto px-1 mt-1">
              <span
                class="badge bg-blue font-size-10 py-1 rounded-pill"
                style="cursor: pointer"
                @click="filterKatalog('')"
                :class="select === '' ? 'bg-blue' : 'bg-warning-2'"
              >
                All
              </span>
            </div>
            <div
              class="col-auto px-0 mt-1"
              v-for="index in katalogs.kategori"
              :key="index.id"
            >
              <span
                class="badge font-size-10 mx-1 py-1 rounded-pill"
                style="cursor: pointer"
                @click="filterKatalog(index.id)"
                :class="index.id === select ? 'bg-blue' : 'bg-warning-2'"
              >
                {{ index.name }}
              </span>
            </div>
          </div>
          <div class="row my-4">
            <div
              class="col-md-4"
              v-for="index in katalogs.data"
              :key="index.id"
            >
              <div class="card">
                <img :src="index.cover" class="image-card" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">{{ index.title }}</h5>
                  <div v-html="index.sinopsis.substring(0, 200)"></div>
                  <button class="btn btn-blue mt-3" @click="clickedDetail(index)">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row text-center my-5" v-if="totalData > 0">
        <div class="col-12">
          <button
            class="btn btn-blue me-2"
            @click="prevPage"
            :disabled="page === 1"
          >
            Sebelumnya
          </button>
          <button
            class="btn btn-blue"
            @click="nextPage"
            :disabled="page * 10 >= totalData"
          >
            Selanjutnya
          </button>
        </div>
      </div>
      <div class="row text-center my-5 d-flex" v-else>
        <div class="col-12" id="no-data">
          <h3>Tidak ada data</h3>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="container px-5">
        <div class="row">
          <div class="col-md-9">
            <div>
              <h4 class="text-blue fw-bold mb-0">Judul: {{ selectData.title }}</h4>
              <p class="text-muted my-0 fw-bold">Pengarang: {{ selectData.author }}</p>
              <p class="text-muted my-0">Dibaca: {{ selectData.view_count }}</p>
              <div class="text-center">
                <img :src="selectData.cover" class="img-fluid my-3" alt="..." />
              </div>
              <div v-html="selectData.sinopsis"></div>
            </div>
          </div>
          <div class="col-auto my-3 text-end">
            <button class="btn btn-blue btn-sm" @click="detail = false">
              Kembali
            </button>
          </div>
         </div>
      </div>
    </template>
  </LandingLayout>
</template>

<script setup lang="ts">
import { disableLoader, enableLoader } from "../helpers/event";
import LandingLayout from "./LandingLayout.vue";
import { ref, onMounted } from "vue";

const tentangKami = ref<string>("");

const totalData = ref<number>(0);

const detail = ref<boolean>(false);

const loadData = async () => {
  enableLoader();
  const response = await fetch(import.meta.env.VITE_API + "/about-me");
  const data = await response.json();
  disableLoader();
  tentangKami.value = data.data.content;
};

const katalogs = ref<any>({});
const selectData = ref<any>({});
const page = ref<number>(1);

const clickedDetail = async (data: any) => {
  selectData.value = data;
  await fetch(
    import.meta.env.VITE_API + "/landing/" + data.id, {
      method: "PUT",
    }
  );
  detail.value = true;
};

const loadData2 = async () => {
  enableLoader();
  const response = await fetch(
    import.meta.env.VITE_API + "/landing/katalog?limit=10&page=" + page.value
  );
  const data = await response.json();
  totalData.value = data.data.total_data;
  disableLoader();
  katalogs.value = data.data;
};
const select = ref<string>("");
const filterKatalog = async (id: string) => {
  select.value = id;
  enableLoader();
  if (id === "") {
    const response = await fetch(
      import.meta.env.VITE_API + "/landing/katalog?limit=10&page=" + page.value
    );
    const data = await response.json();
    totalData.value = data.data.total_data;
    disableLoader();
    katalogs.value = data.data;
  } else {
    const response = await fetch(
      import.meta.env.VITE_API +
        "/landing/katalog?category=" +
        id +
        "&limit=10&page=" +
        page.value
    );
    const data = await response.json();
    totalData.value = data.data.total_data;
    disableLoader();
    katalogs.value = data.data;
  }
};

const nextPage = async () => {
  page.value += 1;
  await loadData2();
};

const prevPage = async () => {
  page.value -= 1;
  await loadData2();
};

onMounted(async () => {
  await loadData();
  await loadData2();
});
</script>

<style scoped lang="css">
.image-card {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.font-size-14 {
  font-size: 14px;
}
</style>
