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
      <div class="col-auto ms-auto mb-3">
        <div class="input-group">
          <input
            type="text"
            class="form-control"
            placeholder="Cari Pengguna"
            v-model="query"
            @change="search"
          />
          <div class="input-group-text bg-blue">
            <i class="bx bx-search"></i>
          </div>
        </div>
      </div>
      <div class="col-12">
        <Modal modal-class="" modal-id="modalRole" title="Hak Akses">
          <div class="modal-body">
            <select v-model="role" class="form-select">
              <option value="0">Pilih Hak Akses</option>
              <option v-for="(item, i) in roles" :key="i" :value="item.id">
                {{ item.name }}
              </option>
            </select>
            <div class="my-3">
              <button
                class="btn btn-success w-100"
                @click="addRole"
                data-bs-dismiss="modal"
              >
                <i class="bx bx-plus"></i> Tambah Hak Akses
              </button>
            </div>
          </div>
        </Modal>
        <div class="table-responsive">
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th style="width: 80px" class="text-center">No.</th>
                <th>Pengguna</th>
                <th class="text-center">Hak Akses</th>
                <th class="text-center">Aksi</th>
              </tr>
            </thead>
            <tbody class="align-middle">
              <tr v-for="(item, i) in result" :key="i">
                <td class="text-center">
                  {{ currentPage * limitPage - limitPage + i + 1 }}.
                </td>
                <td>
                  <div class="d-flex align-items-center">
                    <img
                      :src="item.thumbnail"
                      alt="Foto Profil"
                      class="rounded-circle"
                      style="width: 40px; height: 40px; object-fit: cover"
                    />
                    <div class="ms-2">
                      <h6 class="mb-0">{{ item.nama }}</h6>
                      <div>{{ item.email }}</div>
                    </div>
                  </div>
                </td>
                <td class="text-center">
                  <!-- <div v-for="(role, i) in item.UserPrivillege" :key="i" class="badge bg-info mx-1">
                    {{ role.role.name }}
                  </div> -->
                  <div
                    class="text-start my-2"
                    v-for="(role, i) in item.UserPrivillege"
                    :key="i"
                  >
                    <div class="badge bg-info mx-1">{{ role.role.name }}</div>
                    <button
                      class="btn btn-sm-2 btn-red"
                      @click="deleteRole(role.id)"
                    >
                      <i class="bx bx-trash"></i>
                    </button>
                  </div>
                  <hr />
                  <button
                    type="button"
                    class="btn btn-sm btn-success"
                    data-bs-toggle="modal"
                    data-bs-target="#modalRole"
                    @click="setUser(item)"
                  >
                    <i class="bx bx-key"></i> Hak Akses
                  </button>
                </td>
                <td class="text-center">
                  <button
                    class="btn btn-sm btn-red"
                    @click="deleteUser(item.id)"
                    :disabled="item.id === session.getUser?.id"
                  >
                    <i class="bx bx-trash"></i>
                  </button>
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
import usePagination from "../composables/pagination";
import Pagination from "../components/Pagination.vue";
import { disableLoader, enableLoader } from "../helpers/event";
import { useSession } from "../stores/session";
import Modal from "../components/Modal.vue";
import useApi from "../composables/api";
import Sweet from "../helpers/sweetalert2";
import Notify from "../helpers/notify";
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
} = usePagination("/pengguna", "", query);

const deleteUser = async (id: number) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus data ini?", async () => {
    const response = await deleteResource(`/pengguna/akun/${id}`);
    if (response.data) {
      fetchData();
      Notify.success("Data berhasil dihapus");
    }
  });
};

const session = useSession();

onMounted(async () => {
  enableLoader();
  await fetchData();
  disableLoader();
});

const roles = ref<any[]>([]);
const role = ref<number>(0);
const { getResource, deleteResource, postResource } = useApi();
const setUser = async (item: any) => {
  const response = await getResource("/roles");
  roles.value = response.data;
  user_id.value = item.id;
};

const deleteRole = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus data ini?", async () => {
    const response = await deleteResource(`/pengguna/${id}`);
    if (response.data) {
      fetchData();
      Notify.success("Data berhasil dihapus");
    }
  });
};

const user_id = ref<number>(0);

const addRole = async () => {
  if (role.value === 0) {
    Sweet.error("Pilih hak akses terlebih dahulu");
    return;
  }
  const response = await postResource(`/pengguna`, {
    role_id: role.value,
    user_id: user_id.value,
  });
  if (response.data) {
    fetchData();
    Notify.success("Data berhasil ditambahkan");
  }
};
</script>

<style scoped>
.btn-sm-2 {
  padding: 2px;
  font-size: 10px;
  line-height: 1.5;
  border-radius: 0.2rem;
}
</style>
