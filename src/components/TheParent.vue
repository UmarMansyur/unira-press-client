<template>
  <div id="layout-wrapper">
    <TheHeader />
    <TheVerticalMenu />
    <div class="main-content">
      <div class="page-content">
        <div class="container-fluid">
          <!-- start page title -->
          <div class="row">
            <div class="col-12">
              <div
                class="page-title-box d-sm-flex align-items-center justify-content-between"
              >
                <h4 class="mb-sm-0 font-size-18">{{ $route.meta.title }}</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="javascript: void(0);">{{ $route.meta.title }}</a>
                    </li>
                    <li class="breadcrumb-item active">{{ $route.meta.title }}</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <slot></slot>
          <!-- end page title -->
        </div>
        <!-- container-fluid -->
      </div>
      <!-- End Page-content -->

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6"></div>
            <div class="col-sm-6">
              <div class="text-sm-end d-none d-sm-block">
                Fahrosi Angger © 2024 Informatika Universitas Madura
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>
<script lang="ts">
declare const feather: any;
declare const $: any;
</script>

<script setup lang="ts">
import TheHeader from "../components/TheHeader.vue";
import TheVerticalMenu from "../components/TheVerticalMenu.vue";
import { onMounted } from "vue";
onMounted(() => {
  feather.replace();
  $("#side-menu").metisMenu();
});
</script>
