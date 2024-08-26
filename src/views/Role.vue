<template>
  <TheParent>
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
        <input
          type="text"
          class="form-control"
          placeholder="Cari role"
          v-model="query"
          @change="search"
        />
      </div>
      <div class="col-auto mb-3 ms-auto">
        <button type="button" class="btn btn-blue" data-bs-toggle="modal" data-bs-target="#modal-role">
          <i class="bx bx-plus-circle me-2"></i>
          <span>Tambah Role</span>
        </button>
      </div>
    </div>
    <div class="col-12">
      <Modal modal-class="" modal-id="modal-role" title="Tambah role Buku">
        <div class="modal-body">
          <div class="row">
            <div class="col-12">
              <div class="mb-3">
                <label for="role" class="form-label">Nama role</label>
                <input
                  type="text"
                  class="form-control"
                  id="role"
                  v-model="role"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer d-flex justify-content-between">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
            <i class="bx bx-x me-1"></i> Batal
          </button>
          <button type="button" class="btn btn-primary-2" @click="onSave" :disabled="!meta.valid" data-bs-dismiss="modal">
            <i class="bx bx-save me-1"></i> Simpan
          </button>
        </div>
      </Modal>
    </div>
    <div class="table-responsive">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th class="text-center" style="width: 5%;">No.</th>
            <th>Nama role</th>
            <th class="text-center" style="width: 20%;">Aksi</th>
          </tr>
        </thead>
        <tbody class="align-middle">
          <tr v-for="(item, i) in result" :key="i">
            <td class="text-center">
              {{ currentPage * limitPage - limitPage + i + 1 }}.
            </td>
            <td>{{ item.name }}</td>
            <td class="text-center">
              <button class="btn btn-sm btn-primary-2" @click="editClick(item)" data-bs-toggle="modal" data-bs-target="#modal-role">
                <i class="bx bx-pencil"></i> Edit
              </button>
              <button class="btn btn-sm btn-red ms-2" @click="deleterole(item.id)">
                <i class="bx bx-trash"></i> Hapus
              </button>
            </td>
          </tr>
          <tr v-if="result.length === 0">
            <td colspan="2" class="text-center">Data tidak ditemukan</td>
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
  </TheParent>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import Pagination from "../components/Pagination.vue";
import usePagination from "../composables/pagination";
import { disableLoader, enableLoader } from "../helpers/event";
import Modal from "../components/Modal.vue";
import { useField, useForm } from "vee-validate";
import useApi from "../composables/api";
import Sweet from "../helpers/sweetalert2";
import Notify from "../helpers/notify";
import * as yup from "yup";

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
} = usePagination("/roles", "", query);

onMounted(async () => {
  enableLoader();
  await fetchData();
  disableLoader();
});

const schema = yup.object().shape({
  role: yup.string().required("Nama role harus diisi"),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    role: "",
  },
});

const { value: role } = useField<string>("role");

const {  putResource, postResource, deleteResource } = useApi();


const onSave = async () => {
  if(id.value === 0) {
    const response = await postResource('/roles', { name: role.value });
    if(response.data) {
      Notify.success('role berhasil ditambahkan');
      await fetchData();
    }
  } else {
    const response = await putResource(`/roles/${id.value}`, { name: role.value });
    if(response.data) {
      Notify.success('role berhasil diubah');
      await fetchData();
    }
  }
}

const id = ref<number>(0);

const editClick = (item: any) => {
  id.value = item.id;
  role.value = item.name;
};

const deleterole = async(id: string) => {
  Sweet.confirm('Data role akan menghapus semua data buku yang memiliki role ini', async() => {
    const response = await deleteResource(`/roles/${id}`);
    if(response.data) {
      Notify.success('role berhasil dihapus');
      await fetchData();
    }
    await fetchData();
  });
}

</script>
