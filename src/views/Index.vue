<template>
  <template v-if="!detail">
    <LandingLayout>
      <div class="container">
        <div class="text-center mb-4">
          <h1 class="display-6 mb-0 fw-bold text-blue border-bottom-warning title-page">
            RILIS TERBARU
          </h1>
          <div class="row border-top-warning">
            <div class="col-md-2 pt-3" v-for="index in books.rilis_new" :key="index" style="cursor: pointer;">
              <a :href="index.cover" target="_blank">
                <img :src="index.cover" class="card-img-top" alt="cover-1" />
                <p class="my-3 text-blue">
                  <strong>
                    {{ index.title }}
                  </strong>
                </p>
              </a>
            </div>
            <div class="col-md-12" v-if="books.rilis_new.length === 0">
              <p class="text-muted">Data tidak ditemukan</p>

            </div>
          </div>
        </div>
        <div class="text-start mb-4 overflow-hidden">
          <h1 class="display-6 mb-0 fw-bold text-blue border-bottom-warning d-inline-block">
            REKOMENDASI BUKU
          </h1>
          <div class="row border-top-warning">
            <div class="col-md-3 pt-3" v-for="index in books.rilis_populer" :key="index">
              <a style="cursor: pointer;" :href="index.cover" target="_blank">
                <img :src="index.cover" class="card-img-top" alt="cover-1" />
                <p class="my-3 text-blue">
                  <strong>
                    {{ index.title }}
                  </strong>
                </p>
              </a>
            </div>
            <div class="col-md-12" v-if="books.rilis_populer.length === 0">
              <p class="text-muted">Data tidak ditemukan</p>
              </div>
          </div>
        </div>
        <div class="row">
          <div class="col-xl-8">
            <div class="text-start mb-4 overflow-hidden">
              <h1 class="display-6 mb-0 fw-bold text-blue border-bottom-warning d-inline-block">
                LOKASI
              </h1>
              <div class="row border-top-warning">
                <div class="col-md-12 my-3">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.4304786225484!2d113.47300617684199!3d-7.191623192813637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd77e81a24e13b1%3A0x933c68261d6703ff!2sMadura%20University!5e0!3m2!1sen!2sid!4v1722877156919!5m2!1sen!2sid"
                    class="w-100" height="450" style="border: 0" allowfullscreen loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4">
            <div class="text-start mb-4 overflow-hidden">
              <h1 class="display-6 mb-0 fw-bold text-blue border-bottom-warning d-inline-block">
                BERITA UNIRA
              </h1>
              <div class="row border-top-warning beritas">
                <div class="mt-3">
                  <div class="row gap-0 mb-2" v-for="index in news" :key="index">
                    <div class="col-12 image-container" @click="setDetail(index.id)" style="cursor: pointer">
                      <img :src="`https://api.unira.ac.id/${index.gambar}`" class="cover-image" alt="cover-1" />
                    </div>
                    <div class="col-12" @click="setDetail(index.id)" style="cursor: pointer">
                      <h6 class="font-size-12">
                        {{ index.judul }}
                      </h6>
                      <p class="text-muted font-size-10">
                        {{ index.tanggal }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  </template>
  <template v-else>
    <LandingLayout>
      <div class="container">
        <div class="row">
          <div class="col-lg-1 col-xl-1 position-relative">
            <div class="position-absolute top-0 end-0">
              <button class="btn btn-light rounded-circle p-0 m-0" style="width: 40px; height: 40px">
                <i class="bx bx-share-alt font-size-20 align-middle m-0 p-0"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-7 col-xl-7 position-relative">
            <div class="text-center mb-4 overflow-hidden">
              <div class="row text-start">
                <div class="col-12 my-2">
                  <i class="text-blue font-size-10">{{
                    new Date(detailData.tanggal).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}</i>
                </div>
                <div class="col-12">
                  <h1 class="font-size-24 text-blue fw-bold">{{ detailData.judul }}</h1>
                </div>
                <div class="col-md-12 font-size-12 text-blue">
                  <i class="text-blue">Oleh: {{ detailData.pengirim.nama }} |
                    <i class="bx bx-time"></i> {{ detailData.dibaca }} dibaca</i>
                  | <i class="text-blue">{{ detailData.fakultas.nama }}</i>
                </div>
                <div class="col-md-12 pt-3 text-start">
                  <div v-html="detailData.isi"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-xl-4">
            <div class="row bg-light">
              <div class="col-12 bg-blue">
                <h4 class="text-white mb-0 p-4 fw-bold" style="font-size: 26px">
                  Berita Terkait
                </h4>
              </div>
              <div class="col-12 px-4" v-for="index in news" :key="index">
                <div class="row gap-0 mt-4" v-if="index.id !== detailData.id">
                  <div class="col-12" @click="setDetail(index.id)" style="cursor: pointer">
                    <h6 class="font-size-16">
                      {{ index.judul }}
                    </h6>
                    <p class="text-muted">
                    <div v-html="index.isi.substr(0, 100)"></div>
                    </p>
                    <p class="text-muted">
                      {{ index.tanggal }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingLayout>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LandingLayout from "./LandingLayout.vue";
import { disableLoader, enableLoader } from "../helpers/event";

const news = ref<any>({});
const detail = ref<boolean>(false);

const loadData = async () => {
  const response = await fetch("https://api.unira.ac.id/v2", {
    method: "POST",
    body: JSON.stringify({
      query: `
        query getMuatan($page: Int, $limit: Int, $search: String, $jenis: Int, $fakultas: Int) {
          muatan2(page: $page, limit: $limit, search: $search, jenis: $jenis, fakultas: $fakultas) {
            total
            muatan {
              id
              judul
              gambar
              isi
              dibaca
              pengirim {
                nis
                nama
              }
              tanggal(format: "d/m/Y"),
              fakultas {
                id
                nama
              }
              status
            }
          }
        }
      `,
      variables: {
        search: "",
        fakultas: 200,
        jenis: 1,
        limit: 7,
        page: 1,
      },
    }),
  });
  const data = await response.json();
  news.value = data.data.muatan2.muatan;
};

const detailData = ref<any>({});
const setDetail = async (id: number) => {
  window.scrollTo(0, 0);
  detail.value = true;
  detailData.value = news.value.find((item: any) => item.id === id);
};

const books = ref<any>({
  rilis_new: [],
  rilis_populer: [],
});
const loadResource = async () => {
  enableLoader();
  const response = await fetch(import.meta.env.VITE_API + "/landing");
  const data = await response.json();
  books.value = {
    rilis_new: data.data.rilis_new.map((item: any) => {
      return {
        ...item,
        cover: import.meta.env.VITE_API + '/uploads/' + item.cover,
      };
    }),
    rilis_populer: data.data.rilis_populer.map((item: any) => {
      return {
        ...item,
        cover: import.meta.env.VITE_API + '/uploads/' + item.cover,
      };
    })
  };
  disableLoader();
};

onMounted(async () => {
  enableLoader();
  await loadResource();
  await loadData();
  disableLoader();
});
</script>

<style scoped>
.beritas {
  max-height: 450px;
  overflow-y: auto;
  scrollbar-width: thin;
}

.image-container {
  max-height: 100px;
  overflow: hidden;
  width: 100%;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


</style>
