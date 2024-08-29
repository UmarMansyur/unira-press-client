<template>
  <TheParent> 
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th class="text-center">No.</th>
                <th>Judul Naskah</th>
                <th>Kategori Buku</th>
                <th>Pengarang</th>
                <th class="text-center">#</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in result">
                <td class="text-center">
                  {{ currentPage * limitPage - limitPage + i + 1 }}
                </td>
                <td>
                  {{ item.judul }}
                </td>
                <td>
                  {{ item.kategori_buku?.name }}
                </td>
                <td>
                  {{ item.pengarang }}
                </td>
                <td class="text-center">
                  <RouterLink :to="'/pengajuan-naskah/' + encrypt(item.id.toString())" class="btn btn-light btn-sm btn-label">
                    <i class="bx bx-search-alt label-icon"></i> Selengkapnya
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination
            :current-page="currentPage"
            :is-first-page="isFirstPage"
            :is-last-page="isLastPage"
            :go-to="goToPage"
            :next-page="nextPage"
            :page-list="pageList"
            :total-page="totalPage"
            :prev-page="prevPage"
            :total-data="totalData"
            v-if="result.length > 0"
          />
      </div>
    </div>
  </TheParent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import { useSession } from "../stores/session";
import usePagination from "../composables/pagination";
import { disableLoader, enableLoader } from "../helpers/event";
import { encrypt } from "../helpers/crypto";
import Pagination from "../components/Pagination.vue";
const session = useSession();
const query = ref<string>("");
const filter = ref<string>("?editor=" + session.getUser?.id);
const {
  result,
  totalData,
  currentPage,
  totalPage,
  pageList,
  search,
  isFirstPage,
  isLastPage,
  nextPage,
  prevPage,
  goToPage,
  fetchData,
  changeLimit,
  limitPage,
} = usePagination("/pengajuanku/editor", filter, query);


onMounted(async() => {
  enableLoader();
  await fetchData();
  disableLoader();
})
</script>
