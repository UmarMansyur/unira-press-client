<template>
  <div class="d-flex flex-column h-100 overflow-x-hidden">
    <header class="mb-4">
      <div class="bg-blue" id="top-page">
        <div
          class="d-flex flex-column flex-grow-1 justify-content-between align-items-center"
          id="background-landing"
        >
          <div class="d-flex w-100 flex-column justify-content-between">
            <div class="d-flex ms-auto" id="navbar">
              <div class="d-flex gap-3">
                <a href="https://unira.ac.id" class="text-white">WEB UNIRA</a>
                <a href="https://simat.unira.ac.id" class="text-white">SIMAT</a>
                <a href="https://elearning.unira.ac.id" class="text-warning-2">E-Learning</a>
                <a href="https://silab.unira.ac.id" class="text-warning-2">SILAB</a>
              </div>
            </div>
            <div class="container-fluid px-5" id="navbar-2">
              <div class="d-flex justify-content-between align-items-center">
                <div
                  class="d-flex justify-content-between align-items-end gap-2"
                >
                  <div class="bg-white rounded-bottom-pill rounded-4 px-1">
                    <img
                      src="/assets/images/logo.png"
                      alt="logo"
                      class="logo-header"
                    />
                  </div>
                  <div>
                    <h4 class="text-white mb-0">UNIRA</h4>
                    <small class="mb-0">Universitas Madura</small>
                    <p class="text-white mb-0">Pilihan Bijak Masa Depan</p>
                  </div>
                </div>
                <div class="d-flex gap-4 text-uppercase align-items-center">
                  <RouterLink to="/" class="text-white">Beranda</RouterLink>
                  <RouterLink to="/katalog" class="text-white">Katalog</RouterLink>
                  <RouterLink to="/about-me" class="text-white">Tentang Kami</RouterLink>
                  <a href="" class="text-warning-2">
                    <i class="bx bx-search fs-20"></i>
                  </a>
                  <RouterLink to="/login" class="btn btn-light rounded-pill">
                    <i class="bx bx-user"></i> MASUK
                  </RouterLink>
                </div>
              </div>
            </div>
          </div>
          <div class="title">
            <h1>UNIRA PRESS</h1>
          </div>
          <div class="w-100 text-center" id="information">
            <h6 class="py-3" id="browser-product">
              Jelajahi Produk UNIRA Press !
            </h6>
          </div>
        </div>
      </div>
    </header>
    <main class="flex-grow-1">
      <slot></slot>
    </main>
    <footer class="bg-blue text-white text-center py-3">
      <p class="mb-0">© 2024 - Universitas Madura</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.body.style.fontFamily = "Poppins, sans-serif";
});
</script>

<style scoped lang="css">
.mb-0 {
  margin-bottom: 0px !important;
}

.p-0 {
  padding: 0px !important;
}

.m-0 {
  margin: 0px !important;
}

.h-100 {
  height: 100vh !important;
}


.logo-header {
  width: 50px !important;
  padding-top: 30px;
}

.fs-20 {
  font-size: 25px !important;
}

#navbar-2 {
  z-index: 1000 !important;
  color: white;
}

#browser-product {
  color: white;
  border-bottom: 7px solid #f1c40f;
  display: inline-block;
  margin-bottom: 0px;
  padding-inline: 2rem;
  padding-bottom: 0.5rem;
}

#top-page {
  height: 450px !important;
  overflow: hidden;
  display: flex;
  position: relative;
}

.h-20 {
  height: 50px;
}

.text-blue {
  color: #102c57 !important;
}

</style>
