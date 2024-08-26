<template>
  <TheParent>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-hover table-bordered table-striped">
            <thead class="align-middle">
              <tr>
                <th class="text-center">No.</th>
                <th>Judul Buku</th>
                <th>Pengarang</th>
                <th>Cover</th>
                <th>Tipe Kepenulisan</th>
                <th>
                  Detail
                </th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr>
                <td class="text-center">1</td>
                <td>Judul Buku 1</td>
                <td>Pengarang 1</td>
                <td>
                  <img src="https://via.placeholder.com/70" alt="Cover Buku" />
                </td>
                <td>Penulisan 1</td>
                <td>
                  <button class="btn btn-info-2 mx-1 btn-label">
                    <i class="bx bx-search label-icon"></i> Selengkapnya ...
                  </button>
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
  import TheParent from '../components/TheParent.vue';
</script>