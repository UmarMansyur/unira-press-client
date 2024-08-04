<template>
  <TheParent>
    <template v-if="!addClick">
      <div class="row">
        <div class="col-auto mb-3">
          <select class="form-select">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="col-auto mb-3">
          <input type="text" class="form-control" placeholder="Cari berita" />
        </div>
        <div class="col-auto mb-3 ms-auto">
          <button type="button" class="btn btn-blue" @click="addNews">
            <i class="bx bx-plus-circle me-2"></i>
            <span>Tambah Berita</span>
          </button>
        </div>
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-hover table-bordered">
              <thead class="align-middle">
                <tr>
                  <th class="text-center">No</th>
                  <th>Tanggal Dibuat</th>
                  <th>Judul</th>
                  <th>Penulis</th>
                  <th class="text-center">Status</th>
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
    <template v-else>
      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <label for="" class="col-form-label">
              Judul
            </label>
            <input type="text" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="" class="col-form-label">
              Cover:
            </label>
            <input type="file" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="" class="col-form-label">
              Deskripsi
            </label>
            <CKEditor />
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-light" @click="addClick = false">
              <i class="bx bx-x me-2"></i> Batal
            </button>
            <button type="button" class="btn btn-blue">
              <i class="bx bx-save me-2"></i> Simpan
            </button>
          </div>
        </div>
      </div>
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import TheParent from "../components/TheParent.vue";
import CKEditor from "../components/CKEditor.vue";
import { ref } from "vue";

const addClick = ref<boolean>(false);
const addNews = () => {
  addClick.value = true;
};
</script>
