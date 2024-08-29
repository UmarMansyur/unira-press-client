<template>
  <div class="d-flex flex-column h-100 overflow-x-hidden">
    <header class="mb-4">
      <div class="bg-blue" id="top-page">
        <div class="d-flex flex-column flex-grow-1 justify-content-between align-items-center" id="background-landing">
          <div class="container-fluid px-5 d-none d-sm-block" id="navbar-2">
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
                  <div class="d-flex justify-content-between align-items-end gap-2">
                    <div class="bg-white rounded-bottom-pill rounded-4 px-1">
                      <img src="/assets/images/logo.png" alt="logo" class="logo-header" />
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
          </div>
          <div class="px-5 d-block d-sm-none bg-blue text-white" id="navbar-2" style="width: 100%">
            <nav class="navbar navbar-dark navbar-expand-lg text-white">
              <div class="container-fluid text-white">
                <a class="d-flex gap-2 align-items-center text-white fw-bold display-6 py-2" href="#">
                  <img src="/assets/images/logo.png" alt="logo" style="width: 25px" />
                  <h4 class="mb-0 text-white font-size-24">UNIRA PRESS</h4>
                </a>
                <button class="btn btn-warning btn-sm" type="button" data-bs-toggle="collapse"
                  data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                  aria-label="Toggle navigation">
                  <i class="bx bx-menu font-size-18"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                  <ul class="navbar-nav">
                    <li class="nav-item">
                      <RouterLink class="nav-link" aria-current="page" to="/">
                        Beranda
                      </RouterLink>
                    </li>
                    <li class="nav-item">
                      <RouterLink class="nav-link" to="/katalog">
                        Katalog
                      </RouterLink>
                    </li>
                    <li class="nav-item">
                      <RouterLink class="nav-link" to="/about-me">
                        Tentang Kami
                      </RouterLink>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Lainnya
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="https://unira.ac.id/">WEB UNIRA</a></li>
                        <li>
                          <a class="dropdown-item" href="https://simat.unira.ac.id/">SIMAT</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="https://elearning.unira.ac.id/">E-LEARNING</a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="https://silab.unira.ac.id/login">SILAB</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div class="title text-center" style="width: 100%">
            <h1>
              {{ props.title ?? "UNIRA PRESS" }}
            </h1>
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
    <footer class="bg-blue text-white text-center py-4 mt-5">
      <div class="container">
        <div class="row text-start">
          <div class="col-md-6">
            <div class="d-flex align-items-center gap-3">
              <div>
                <img src="/assets/images/logo.png" alt="logo" width="70" />
              </div>
              <div>
                <h5 class="mb-3 text-white">UNIRA PRESS</h5>
                <p class="mb-0">Jl. Raya Panglegur No.Km 3,5, Barat, Panglegur, Kec. Tlanakan, Kabupaten Pamekasan, Jawa Timur 69371</p>
                <p class="mb-0">Telp.  (0324) 322231</p>
                <p class="mb-0">Email: unira-press@unira.ac.id</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <h5 class="mb-3 text-white">TAUTAN</h5>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li>
                <a href="https://unira.ac.id" class="text-white">WEB UNIRA</a>
              </li>
              <li>
                <a href="https://simat.unira.ac.id" class="text-white">SIMAT</a>
              </li>
              <li>
                <a href="https://elearning.unira.ac.id" class="text-white">E-LEARNING</a>
              </li>
              <li>
                <a href="https://silab.unira.ac.id/login" class="text-white">SILAB</a>
              </li>
            </ul>
          </div>
          <div class="col-md-3">
            <h5 class="mb-3 text-white">SOCIAL MEDIA</h5>
            <ul class="list-unstyled d-flex flex-column gap-2">
              <li>
                <a href="https://www.facebook.com/unira.ac.id" class="text-white">Facebook</a>
              </li>
              <li>
                <a href="https://www.instagram.com/unira.ac.id/" class="text-white">Instagram</a>
              </li>
              <li>
                <a href="https://www.youtube.com/channel/UC" class="text-white">Youtube</a>
              </li>
              <li>
                <a href="https://twitter.com/unira.ac.id" class="text-white">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  document.body.style.fontFamily = "Poppins, sans-serif";
});

const props = defineProps<{
  title: string;
}>();
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

.active {
  border-bottom: 2px solid #f1c40f !important;
}

li a:hover {
  color: white !important;
}

.show {
  color: #f1c40f !important;
}

.dropdown-menu {
  background-color: #102c57 !important;
  border: 1px solid #102c57 !important;
}

.dropdown-item {
  color: rgba(255, 255, 255, 0.55)!important;
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

.navbar-item {
  font-size: 20px;
  color: white !important;
}

.text-blue {
  color: #102c57 !important;
}
</style>
