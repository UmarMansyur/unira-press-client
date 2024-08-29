<template>
  <ul class="metismenu list-unstyled" id="side-menu">
    <li>
      <div class="text-center mt-4 mb-3" id="wrapper-sidebar-img">
        <div class="p-1 d-inline-flex bg-light rounded-circle">
          <img
            :src="`${session.getUser?.thumbnail}`"
            alt="img-thumbnail"
            id="sidebar-img"
            class="rounded-circle avatar-xl"
          />
        </div>
        <h5 class="font-size-14 mt-3 mb-1 text-white" id="sidebar-name">
          {{ session.getUser?.nama }}
        </h5>
      </div>
    </li>
    <li>
      <RouterLink to="/beranda" class="waves-effect">
        <i data-feather="home"></i>
        <span data-key="t-horizontal">Beranda</span>
      </RouterLink>
    </li>
    <li v-show="session.getUser?.role === 'Administrator'">
      <RouterLink to="/berita" class="waves-effect">
        <i data-feather="globe"></i>
        <span data-key="t-horizontal">Berita</span>
      </RouterLink>
    </li>
    <li v-show="session.getUser?.role !== 'Administrator' && session.getUser?.role !== 'Pengguna'" :class="{ 'mm-active': $route.path.includes('pengajuan-naskah') }">
      <RouterLink to="/pengajuan-naskah" class="waves-effect">
        <i data-feather="grid"></i>
        <span data-key="t-horizontal">Pengajuan Naskah</span>
      </RouterLink>
    </li>
    <li :class="{ 'mm-active': $route.path.includes('upload-naskah') }" v-show="session.getUser?.role === 'Pengguna'">
      <RouterLink to="/upload-naskah" class="waves-effect">
        <i data-feather="upload"></i>
        <span data-key="t-horizontal">Upload Naskah</span>
      </RouterLink>
    </li>
    <li :class="{ 'mm-active': $route.path.includes('naskah-saya') }" v-show="session.getUser?.role === 'Pengguna'">
      <RouterLink to="/naskah-saya" class="waves-effect">
        <i data-feather="file-text"></i>
        <span data-key="t-horizontal">Naskah Saya</span>
      </RouterLink>
    </li>
    <li :class="{ 'mm-active': $route.path.includes('naskah') }" v-show="session.getUser?.role === 'Administrator'">
      <RouterLink to="/naskah" class="waves-effect">
        <i data-feather="file-text"></i>
        <span data-key="t-horizontal">Naskah</span>
      </RouterLink>
    </li>
    <li :class="{ 'mm-active': $route.path.includes('hak-akses-pengguna') }" v-show="session.getUser?.role === 'Administrator'">
      <RouterLink to="/hak-akses-pengguna" class="waves-effect">
        <i data-feather="lock"></i>
        <span data-key="t-horizontal">Hak Akses Pengguna</span>
      </RouterLink>
    </li>
    <li :class="{ 'mm-active': $route.path.includes('profile') }" v-show="session.getUser?.is_simat === false">
      <RouterLink to="/profile" class="waves-effect">
        <i data-feather="user"></i>
        <span data-key="t-horizontal">Profile</span>
      </RouterLink>
    </li>
    <li v-show="session.getUser?.role === 'Administrator'" :class="{ 'mm-active': $route.path.includes('kategori-buku') || $route.path.includes('manajemen-role') || $route.path.includes('tentang-kami') }">
      <a href="javascript: void(0);" class="has-arrow waves-effect">
        <i data-feather="settings"></i>
        <span data-key="t-apps">Pengaturan</span>
      </a>
      <ul
        class="sub-menu mm-collapse" :class="{ 'mm-show': $route.path.includes('tentang-kami') || $route.path.includes('kategori-buku') || $route.path.includes('manajemen-role') }"
        aria-expanded="false"
        style="height: 0px"
      >
        <li>
          <RouterLink to="/tentang-kami">
            <span data-key="t-calendar">Tentang Kami</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/kategori-buku">
            <span data-key="t-calendar">Kategori Buku</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/manajemen-role">
            <span data-key="t-calendar">Manajemen Role</span>
          </RouterLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useSession } from '../stores/session';
import { onMounted } from 'vue';

const session = useSession();



</script>
<style scoped>
li a {
  font-size: 13px !important;
}
</style>