<template>
  <TheParent>
      <div class="row mt-3">
        <div class="col-md-6 mb-2">
          <div class="row">
            <div class="col-sm-auto col-6">
              <select id="limit" class="form-select">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="col-sm-auto col-6">
              <select class="form-select">
                <option value="">Semua Status</option>
                <option value="1">Diterima</option>
              </select>
            </div>
            <div class="col-sm-auto col-6">
              <select class="form-select">
                <option value="">Semua Kategori</option>
                <option value="1">Novel</option>
                <option value="2">Komik</option>
                <option value="3">Ensiklopedia</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-3 ms-auto mb-2 col-6">
          <input type="text" class="form-control" placeholder="Cari Buku" />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="align-middle">
                <tr>
                  <th class="text-center">No.</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Cover</th>
                  <th>judul</th>
                  <th>Judul Buku</th>
                  <th>Kategori Buku</th>
                  <th>Status</th>
                  <th>Editor</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr style="cursor: pointer">
                  <td class="text-center">1</td>
                  <td>29 Juli 2024</td>
                  <td>
                    <img
                      src="https://via.placeholder.com/70"
                      alt="Cover Buku"
                    />
                  </td>
                  <td>Pengarang 1</td>
                  <td>Judul Bukunya panjang sekali heheheheh</td>
                  <td>Novel</td>
                  <td>
                    <span class="badge bg-success">Diterima</span>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="Editor"
                        class="rounded-circle avatar-sm me-2"
                      />
                      <div>
                        <p class="mb-0">Editor</p>
                        <p class="mb-0">Editor 1</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="Editor"
                        class="rounded-circle avatar-sm me-2"
                      />
                      <div>
                        <p class="mb-0">Editor</p>
                        <p class="mb-0">Editor 2</p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center">
                      <img
                        src="https://via.placeholder.com/30"
                        alt="Editor"
                        class="rounded-circle avatar-sm me-2"
                      />
                      <div>
                        <p class="mb-0">Editor</p>
                        <p class="mb-0">Editor 3</p>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

  </TheParent>
</template>

<script setup lang="ts">
import TheParent from "../components/TheParent.vue";
</script>
