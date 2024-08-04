<template>
  <template v-if="step == 1">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Indentitas Buku</h4>
            <p class="card-title-desc">
              Isi form berikut untuk menambahkan pengajuan buku baru
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="judul" class="form-label">Judul</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    >Kepengarangan</label
                  >
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label">Edisi</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label">Seri</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="judul" class="form-label">Link Buku</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="judul" class="form-label">Deskripsi</label>
                  <CKEditor />
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-light"
                    @click="$emit('add-click', false)"
                  >
                    <i class="bx bx-x me"></i> Kembali
                  </button>
                  <button type="button" class="btn btn-blue" @click="step = 2">
                    <i class="bx bx-arrow-to-right me"></i> Selanjutnya
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="step == 2">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Informasi Publikasi & Detail Fisik</h4>
            <p class="card-title-desc">
              Isi form berikut untuk menambahkan pengajuan buku baru
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="distributor" class="form-label"
                    >Distributor</label
                  >
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="tahun-terbit" class="form-label"
                    >Tahun Terbit</label
                  >
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="terbitan" class="form-label">Terbitan</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    >Jumlah Halaman</label
                  >
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label">Tinggi Buku</label>
                  <input type="text" class="form-control" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label">Kategori Pembaca</label>
                  <select class="form-select">
                    <option value="10">Semua</option>
                    <option value="100">Anak-anak</option>
                    <option value="50">Remaja</option>
                    <option value="100">Dewasa</option>
                    <option value="25">Umum</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label">Jenis Pustaka</label>
                  <select class="form-select">
                    <option value="10">Semua</option>
                    <option value="100">Fiksi</option>
                    <option value="50">Non Fisik</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label">Kategori Jenis</label>
                  <select class="form-select">
                    <option value="100">Terjamahan</option>
                    <option value="50">Non Terjemahan</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="file" class="form-label">File: </label>
                  <input type="file" class="form-control" />
                </div>
              </div>

              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-light" @click="step = 1">
                    <i class="bx bx-x me"></i> Kembali
                  </button>
                  <button type="button" class="btn btn-blue">
                    <i class="bx bx-save me"></i> Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import CKEditor from "../components/CKEditor.vue";
import { ref } from "vue";
const step = ref<number>(1);
</script>
