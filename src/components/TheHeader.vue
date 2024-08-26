<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="d-flex">
        <!-- LOGO -->
        <div class="navbar-brand-box">
          <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
              <img src="/assets/images/logo.png" alt="" height="24" />
            </span>
            <span class="logo-lg">
              <img src="/assets/images/logo.png" alt="" height="24" />
              <span class="logo-txt">UNIRA PRESS</span>
            </span>
          </a>

          <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
              <img src="/assets/images/logo.png" alt="" height="24" />
            </span>
            <span class="logo-lg">
              <img src="/assets/images/logo.png" alt="" height="24" />
              <span class="logo-txt">UNIRA PRESS</span>
            </span>
          </a>
        </div>
        <!-- Toogle Menu Sidebar -->
        <button
          type="button"
          class="btn btn-sm px-3 font-size-16 header-item"
          id="vertical-menu-btn"
          @click="toggleMenu"
        >
          <i class="fa fa-fw fa-bars"></i>
        </button>
      </div>

      <div class="d-flex">
        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item border-start border-end"
            id="page-header-user-dropdown"
          >
            <img
              class="rounded-circle header-profile-user"
              :src="`${session.getUser?.thumbnail}`"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ms-2 fw-medium"
              >{{ session.getUser?.nama }}</span
            >
          </button>
        </div>
        <div class="d-inline-block border-end text-center">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle"
            @click="tryLogout"
          >
            <i data-feather="power" class="icon-lg"></i>
          </button>

        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {useSession} from "../stores/session.ts";
import router from "../routes";

const session = useSession();

const toggleMenu = () => {
  document.body.classList.toggle("sidebar-enable");
  const getAttribute = document.body.getAttribute("data-sidebar-size");
  if (getAttribute === "lg") {
    document.body.setAttribute("data-sidebar-size", "sm");
    document.getElementById("sidebar-img")?.classList.add("avatar-sm");
    document.getElementById("sidebar-img")?.classList.remove("avatar-xl");
  } else {
    document.body.setAttribute("data-sidebar-size", "lg");
    document.getElementById("sidebar-img")?.classList.remove("avatar-sm");
    document.getElementById("sidebar-img")?.classList.add("avatar-xl");
  }
  document.getElementById("wrapper-sidebar-img")?.classList.toggle("mb-5");
  document.getElementById("wrapper-sidebar-img")?.classList.toggle("mt-4");
  document.getElementById("sidebar-name")?.classList.toggle("d-none");
};


const tryLogout = () => {
  sessionStorage.clear()
  session.logout();
  router.push('/login');
};

onMounted(() => {
  document.body.setAttribute("data-sidebar-size", "lg");
});
</script>
