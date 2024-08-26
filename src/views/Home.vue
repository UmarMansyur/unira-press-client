<template>
  <TheParent>
    <div class="card">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <span class="badge bg-blue font-size-14">
              <span>AKTIF</span>
            </span>
            <h4 class="mb-0 mt-2">{{ session.getUser?.username }}</h4>
            <h3>{{ session.getUser?.nama }}</h3>
          </div>
          <div
            class="mt-3 d-flex flex-column justify-content-center align-items-center"
          >
            <img
              src="/assets/images/logo.png"
              alt="profile"
              class="avatar-md"
            />
            <span class="fw-bold">UNIVERSITAS MADURA</span>
            <span class="fw-medium"> UNIRA PRESS v1.0.0 </span>
          </div>
        </div>
      </div>
    </div>
  </TheParent>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import TheParent from "../components/TheParent.vue";
import { useSession } from "../stores/session";
const session = useSession();

onMounted(() => {
  document.body.style.fontFamily =
    "Noto Sans,Segoe UI,IBM Plex Sans,Tahoma,Geneva,Verdana,sans-serif";
});
</script>
