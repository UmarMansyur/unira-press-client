<template>
  <TheParent>
    <template v-if="detail && !addClick">
      <Selengkapnya @close="close"/>
    </template>
    <template v-if="addClick">
      <TambahPengajuan @set-click="getClick"/>
    </template>
    <template v-else-if="!addClick && !detail">
      <div class="row">
        <div class="col-auto mb-3">
          <select class="form-select">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <!-- <div class="col-auto mb-3">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Menunggu</option>
            <option value="50">Disetujui</option>
            <option value="100">Ditolak</option>
            <option value="25">Diterbitkan</option>
          </select>
        </div>
        <div class="col-auto mb-3">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Buku</option>
            <option value="50">PDF</option>
            <option value="100">EPUB</option>
            <option value="25">Audio Book</option>
          </select>
        </div>
        <div class="col-auto mb-3">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Buku</option>
            <option value="50">PDF</option>
            <option value="100">EPUB</option>
            <option value="25">Audio Book</option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Fiksi</option>
            <option value="50">Non Fiksi</option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Terjemahan</option>
            <option value="50">Non Terjemahan</option>
          </select>
        </div>
        <div class="col-auto">
          <select class="form-select">
            <option value="10">Semua</option>
            <option value="100">Pemerintah</option>
            <option value="50">Perguruan Tinggi</option>
            <option value="100">Swasta</option>
            <option value="25">Penelitian</option>
            <option value="25">Non Penelitian</option>
  
          </select>
        </div> -->
        <div class="col-auto mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Cari pengajuan"
          />
        </div>
        <div class="col-auto ms-auto">
          <button type="button" class="btn btn-blue" @click="setClick(true)">
            <i class="bx bx-plus-circle"></i> Tambah Pengajuan
          </button>
        </div>

        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead class="align-middle">
                <tr>
                  <th class="text-center">No</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Detail</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr v-for="i in 10" :key="i">
                  <td class="text-center">1</td>
                  <td>2021-08-01</td>
                  <td>Menulis Buku</td>
                  <td>Khana Zulfana Imam</td>
                  <td class="text-center">
                    <span class="badge bg-info font-size-14 rounded-pill">
                      <span>AKTIF</span>
                    </span>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-light btn-label" @click="detail = true">
                      <i class="bx bx-search label-icon"></i> Selengkapnya
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-warning-2 mx-1">
                      <i class="bx bx-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-red">
                      <i class="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center mb-2">
          <div class="mb-0">
            <span class="me-2">Menampilkan 1-10 dari 100 data</span>
          </div>
          <div>
            <ul class="pagination pagination-sm mb-0">
              <li class="page-item disabled">
                <span class="page-link"
                  ><i class="mdi mdi-chevron-left"></i
                ></span>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active">
                <span class="page-link">
                  2
                  <span class="sr-only">(current)</span>
                </span>
              </li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#"
                  ><i class="mdi mdi-chevron-right"></i
                ></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import { ref } from "vue";
import TheParent from "../components/TheParent.vue";
import Selengkapnya from "./Selengkapnya.vue";
import TambahPengajuan from "./TambahPengajuan.vue";

const detail = ref<boolean>(false);
const addClick = ref<boolean>(false);

const getClick = (value: any) => {
  addClick.value = value;
};

const close = () => {
  detail.value = false;
};

const setClick = (value: boolean) => {
  addClick.value = value;
};


</script>
