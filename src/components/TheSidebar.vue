<template>
  <ul class="metismenu list-unstyled" id="side-menu">
    <li>
      <div class="text-center mt-4 mb-5" id="wrapper-sidebar-img">
        <div class="p-1 d-inline-flex bg-light rounded-circle">
          <img
            :src="`${session.getUser?.thumbnail}`"
            alt="img-thumbnail"
            id="sidebar-img"
            class="rounded-circle avatar-xl"
          />
        </div>
        <h5 class="font-size-16 mt-3 mb-1 text-white" id="sidebar-name">
          {{ session.getUser?.username }}
        </h5>
      </div>
    </li>
    <li>
      <RouterLink to="/" class="waves-effect">
        <i data-feather="home"></i>
        <span data-key="t-horizontal">Beranda</span>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/pengajuan" class="waves-effect">
        <i data-feather="check-circle"></i>
        <span data-key="t-horizontal">Pengajuan Penerbitan</span>
      </RouterLink>
    </li>
    <li class="">
      <a href="javascript: void(0);" class="has-arrow waves-effect">
        <i data-feather="settings"></i>
        <span data-key="t-apps">Pengaturan</span>
      </a>
      <ul
        class="sub-menu mm-collapse"
        aria-expanded="false"
        style="height: 0px"
      >
        <li>
          <RouterLink to="/tentang-kami">
            <span data-key="t-calendar">Tentang Kami</span>
          </RouterLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useSession } from '../stores/session';

const session = useSession();

</script>
<style scoped>
li a {
  font-size: 14px !important;
}
</style>