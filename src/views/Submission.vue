<template>
  <TheParent>
    <template v-if="detail && !addClick && !ubahClick">
      <Selengkapnya @close="close" :data="detailData" @ubah-click="getUbahClick"/>
    </template>
    <template v-if="addClick && !detail">
      <TambahPengajuan @set-click="getClick" />
    </template>
    <template v-if="ubahClick">
      <EditPengajuan :datas="dataDetail" @set-click="getClick"  @ubah-click="getUbahClick"/>
    </template>
    <template v-else-if="!addClick && !detail && !ubahClick">
      <div class="row">
        <div class="col-auto mb-3">
          <select class="form-select" @change="changeLimit($event)">
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
            v-model="query"
            @change="search"
          />
        </div>
        <div class="col-auto ms-auto">
          <button type="button" class="btn btn-blue" @click="setClick(true)" v-if="session.getUser?.role !== 'admin'">
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
                  <th class="text-center">#</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr v-for="(item, i) in result" :key="i">
                  <td class="text-center">{{ currentPage * limitPage - limitPage + i + 1 }}</td>
                  <td>{{ new Date(item.createdAt).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}</td>
                  <td>
                    {{ item.title }}
                  </td>
                  <td>
                    {{ item.author }}
                  </td>
                  <td class="text-center">
                    <span class="badge bg-info font-size-14 rounded-pill" v-if="item.status_publish === 'Menunggu'">
                      <span>
                        {{ item.status_publish }}
                      </span>
                    </span>
                    <span class="badge bg-warning font-size-14 rounded-pill" v-if="item.status_publish === 'Direview'">
                      <span>
                        {{ item.status_publish }}
                      </span>
                    </span>
                    <span class="badge bg-danger font-size-14 rounded-pill" v-if="item.status_publish === 'Ditolak'">
                      <span>
                        {{ item.status_publish }}
                      </span>
                    </span>
                    <span class="badge bg-success font-size-14 rounded-pill" v-if="item.status_publish === 'Diterbitkan'">
                      <span>
                        {{ item.status_publish }}
                      </span>
                    </span>
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-sm btn-light btn-label"
                      @click="clickedMore(item.id)"
                    >
                      <i class="bx bx-search-alt label-icon"></i> Selengkapnya
                    </button>
                  </td>
                 
                </tr>
                <tr v-if="result.length === 0">
                  <td colspan="6" class="text-center">Data tidak ditemukan</td>
                </tr>
              </tbody>
            </table>
          </div>
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
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import Selengkapnya from "./Selengkapnya.vue";
import Pagination from "../components/Pagination.vue";
import TambahPengajuan from "./TambahPengajuan.vue";
import usePagination from "../composables/pagination";
import { disableLoader, enableLoader } from "../helpers/event";
import useApi from "../composables/api";
import EditPengajuan from "./EditPengajuan.vue";
import { useSession } from "../stores/session";

const query = ref<string>("");
const session = useSession();
const ubahClick = ref<boolean>(false);

const dataDetail = ref<any>({});
const getUbahClick = async (value: any) => {
  ubahClick.value = value.value ? value.value : false;
  dataDetail.value = value.data ? value.data : {};
  detailData.value = value.data ? value.data : {};
  // detail.value = value.value ? false : true;
};

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
} = usePagination("/pengajuan", "", query);

onMounted(async () => {
  enableLoader();
  await fetchData();
  disableLoader();
});

const detail = ref<boolean>(false);
const addClick = ref<boolean>(false);
const detailData = ref<any>({});

const getClick = async (value: any) => {
  enableLoader();
  await fetchData();
  disableLoader();
  addClick.value = value;
};

const close = async () => {
  enableLoader();
  await fetchData();
  disableLoader();
  detail.value = false;
};

const setClick = async (value: boolean) => {
  enableLoader();
  await fetchData();
  disableLoader();
  addClick.value = value;
};

const { getResource, putResource } = useApi();

const clickedMore = async (id: string) => {
  detail.value = true;
  const response = await getResource('/pengajuan/' + id);
  if (response) {
    detailData.value = response.data;
    if(detailData.value && detailData.value.status_publish === 'Menunggu' && session.getUser?.role === 'admin') {
      await putResource('/pengajuan/' + id, { status_publish: 'Direview' });
    }
  }
};
</script>
