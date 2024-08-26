<template>
  <TheParent>
    <template v-if="!addClick">
      <div class="row">
        <div class="col-auto mb-3">
          <select class="form-select" @change="changeLimit($event)">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div class="col-auto mb-3">
          <input type="text" class="form-control" placeholder="Cari berita" v-model="query" @change="search" />
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
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr v-for="(item, i) in result" :key="i">
                  <td class="text-center">{{ currentPage * limitPage - limitPage + i + 1 }}</td>
                  <td>{{ formatedDate(item.tanggal_publish) }}</td>
                  <td>{{ item.judul_berita }}</td>
                  <td>{{ item.penulis.nama }}</td>
                  <td class="text-center">
                    <button class="btn btn-sm btn-warning-2 mx-1" @click="editClick(item)">
                      <i class="bx bx-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-red" @click="deleteNews(item.id)">
                      <i class="bx bx-trash"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="result.length === 0">
                  <td class="text-center" colspan="5">Data tidak ditemukan</td>
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
    <template v-else>
      <div class="row">
        <div class="col-12">
          <div class="mb-3">
            <label for="title" class="form-label">
              Judul:
            </label>
            <input type="text" class="form-control" id="title" v-model="judul" placeholder="Judul berita" />
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Cover:
            </label>
            <input type="file" class="form-control" @change="onFileChange" accept="image/*" />
            <span v-if="id" class="text-danger">* Kosongkan jika tidak ingin mengganti cover</span>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Deskripsi:
            </label>
            <CKEditor @input="getInput" :value="deskripsi"/>
          </div>
        </div>
        <div class="col-12">
          <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-light" @click="backButton">
              <i class="bx bx-x me-2"></i> Batal
            </button>
            <button type="button" class="btn btn-blue" @click="trySave" :disabled="!meta.valid">
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
import Pagination from "../components/Pagination.vue";
import { onMounted, ref } from "vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import useApi from "../composables/api";
import { disableLoader, enableLoader, formatedDate } from "../helpers/event";
import Notify from "../helpers/notify";
import usePagination from "../composables/pagination";
import Sweet from "../helpers/sweetalert2";

const query = ref<string>("");
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
} = usePagination("/news", "", query);

onMounted(async () => {
  enableLoader();
  await fetchData();
  disableLoader();
});

const addClick = ref<boolean>(false);
const addNews = () => {
  judul.value = "";
  deskripsi.value = "";
  file.value = null;
  addClick.value = true;
};

const { postResourceFormData, deleteResource } = useApi();

const schema = yup.object().shape({
  judul: yup.string().required("Judul harus diisi"),
  deskripsi: yup.string().required("Deskripsi harus diisi"),
  file: yup.mixed().required("Cover harus diisi"),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    judul: "",
    deskripsi: "",
    file: null,
  },
});

const { value: deskripsi } = useField<string>("deskripsi");
const { value: judul } = useField<string>("judul");
const { value: file } = useField<File | null>("file");
const getInput = (e: string) => {
  deskripsi.value = e;
};

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  file.value = target.files![0];
};

const trySave = async () => {
  const data = {
    judul_berita: judul.value,
    isi: deskripsi.value,
    cover: file.value,
    dilihat: 0,
  };

  enableLoader();
  let response = null;
  if (id.value) {
    response = await postResourceFormData(`/news/${id.value}`, data, "PUT");
  } else {
    response = await postResourceFormData("/news", data);
  }
  if(response.data) {
    Notify.success(response.message);
    judul.value = "";
    deskripsi.value = "";
    file.value = null;
    addClick.value = false;
  }
  await fetchData();
  disableLoader();
};

const deleteNews = async (id: number) => {
  Sweet.confirm('Berita yang dihapus tidak dapat dikembalikan', async () => {
    enableLoader();
    const response = await deleteResource(`/news/${id}`);
    if(response.data) {
      Notify.success(response.message);
      await fetchData();
    }
    await fetchData();
    disableLoader();
  });
};

const id = ref<any>(null);
const editClick = (item: any) => {
  judul.value = item.judul_berita;
  deskripsi.value = item.isi;
  file.value = item.cover;
  id.value = item.id;
  addClick.value = true;
};

const backButton = () => {
  addClick.value = false;
  id.value = null;
};




</script>
