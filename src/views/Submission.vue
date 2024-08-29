<template>
  <TheParent>
    <template v-if="!editClick">
      <!-- <div class="row">
        <div class="col-md-3 col-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5>Jumlah Naskah</h5>
                  <p class="mb-0">100</p>
                </div>
                <div class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center icon-circle font-size-24">
                  <i class="bx bx-book-content"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5>Naskah Diproses</h5>
                  <p class="mb-0">100</p>
                </div>
                <div class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center icon-circle font-size-24">
                  <i class="bx bx-file-find"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5>Naskah Diterbitkan</h5>
                  <p class="mb-0">100</p>
                </div>
                <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center icon-circle font-size-24">
                  <i class="bx bx-check"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="card">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div>
                  <h5>Naskah Ditolak</h5>
                  <p class="mb-0">100</p>
                </div>
                <div class="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center icon-circle font-size-24">
                  <i class="bx bx-shield-x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row mt-3">
        <div class="col-md-6 mb-3">
          <div class="row">
            <div class="col-sm-auto col-6">
              <select
                id="limit"
                class="form-select"
                @change="changeLimit($event)"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div class="col-sm-auto col-6">
              <select
                class="form-select"
                @change="changeStatusPengajuan($event)"
              >
                <option value="">Semua Status</option>
                <option value="diproses">Diproses</option>
                <option value="ditolak">Ditolak</option>
                <option value="diterima_untuk_ditinjau">
                  Diterima untuk Ditinjau
                </option>
                <option value="revisi">Direvisi</option>
                <option value="proses_cetak">Proses Cetak</option>
                <option value="diterbitkan">Diterbitkan</option>
              </select>
            </div>
            <div class="col-sm-auto col-6">
              <select class="form-select" @change="changeKategori($event)">
                <option value="">Semua Kategori</option>
                <option value="1">Novel</option>
                <option value="2">Komik</option>
                <option value="3">Ensiklopedia</option>
              </select>
            </div>
            <div class="col-sm-auto col-6">
              <select class="form-select" @change="changeTipePengajuan($event)">
                <option value="">Semua Tipe Pengajuan</option>
                <option value="ISBN">ISBN</option>
                <option value="QRCBN">QRCBN</option>
                <option value="hanya_cetak">Hanya Cetak</option>
                <option value="hanya_publish">Hanya Publish Di Website</option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-sm-3 ms-auto mb-3 col-6">
          <input
            type="text"
            class="form-control"
            placeholder="Cari Buku"
            v-model="query"
            @change="search"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="table-responsive">
            <table class="table table-bordered">
              <thead class="align-middle">
                <tr class="align-middle">
                  <th class="text-center">No.</th>
                  <th>Tanggal Pengajuan</th>
                  <th>Cover</th>
                  <th>Judul Naskah</th>
                  <th>Tipe Pengajuan</th>
                  <th>Kategori Buku</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="align-middle">
                <tr
                  v-for="(item, i) in result"
                  style="cursor: pointer"
                  :key="i"
                >
                  <td class="text-center">
                    {{ currentPage * limitPage - limitPage + i + 1 }}
                  </td>
                  <td>
                    {{ formatedDate(item.tanggal_pengajuan) }}
                  </td>
                  <td>
                    <img
                      :src="item.file_cover"
                      alt="file_cover"
                      class="img-fluid"
                      width="100"
                      v-if="item.file_cover"
                    />
                    <span v-else class="badge bg-danger text-white"
                      >Tidak ada cover</span
                    >
                  </td>
                  <td>{{ item.judul }}</td>
                  <td>
                    <span v-if="item.tipe_identifikasi === 'hanya_publish'"
                      >Publish Website</span
                    >
                    <span v-if="item.tipe_identifikasi === 'hanya_cetak'"
                      >Hanya Cetak</span
                    >
                    <span v-if="item.tipe_identifikasi === 'ISBN'"
                      >Pengajuan ISBN</span
                    >
                    <span v-if="item.tipe_identifikasi === 'QRCBN'">QRCBN</span>
                  </td>
                  <td>{{ item.kategori_buku.name }}</td>
                  <td class="text-center">
                    <span
                      v-if="
                        item.PengajuanBuku[0].status_pengajuan === 'diproses'
                      "
                      class="badge bg-info text-white"
                      >Diproses</span
                    >
                    <span
                      v-if="
                        item.PengajuanBuku[0].status_pengajuan === 'ditolak'
                      "
                      class="badge bg-danger text-white"
                      >Ditolak</span
                    >
                    <span
                      v-if="
                        item.PengajuanBuku[0].status_pengajuan ===
                        'diterima_untuk_ditinjau'
                      "
                      class="badge bg-primary text-white"
                      >Diterima untuk Ditinjau</span
                    >
                    <span
                      v-if="item.PengajuanBuku[0].status_pengajuan === 'revisi'"
                      class="badge bg-warning text-white"
                      >Direvisi</span
                    >
                    <span
                      v-if="
                        item.PengajuanBuku[0].status_pengajuan ===
                        'proses_cetak'
                      "
                      class="badge bg-info text-white"
                      >Proses Cetak</span
                    >
                    <span
                      v-if="
                        item.PengajuanBuku[0].status_pengajuan === 'diterbitkan'
                      "
                      class="badge bg-success text-white"
                      >Diterbitkan</span
                    >
                  </td>
                  <td class="text-center">
                    <RouterLink
                      type="button"
                      class="btn btn-sm btn-light"
                      :to="`/naskah-saya/${encrypt(item.id.toString())}`"
                    >
                      <i class="bx bx-search"></i> Selengkapnya
                    </RouterLink>
                    <button
                      type="button"
                      class="btn btn-sm btn-warning-2 mx-1"
                      @click="setEdit(item)"
                    >
                      <i class="bx bx-pencil"></i> Edit
                    </button>
                    <button
                      type="button"
                      class="btn btn-sm btn-red"
                      @click="hapus(item.id)"
                    >
                      <i class="bx bx-trash"></i> Hapus
                    </button>
                  </td>
                </tr>
                <tr>
                  <td
                    class="text-center"
                    colspan="8"
                    v-if="result.length === 0"
                  >
                    Data tidak ditemukan
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
    </template>
    <template v-else>
      <div class="row">
        <div class="mb-3 col-md-12">
          <label for="judul" class="form-label"
            ><sup class="text-danger">*</sup>Judul:
          </label>
          <input
            type="text"
            id="judul"
            class="form-control"
            placeholder="Judul Naskah"
            v-model="judul_buku"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="pengarang" class="form-label"
            ><sup class="text-danger">*</sup>Pengarang:
          </label>
          <input
            type="text"
            id="pengarang"
            class="form-control"
            placeholder="Nama Pengarang"
            v-model="pengarang"
          />
        </div>
        <div class="mb-3 col-md-6">
          <label for="kategori-buku" class="form-label"
            ><sup class="text-danger">*</sup>Kategori Buku:
          </label>
          <select
            id="kategori-buku"
            class="form-select"
            v-model="kategori_buku"
          >
            <option value="" disabled>Pilih Kategori</option>
            <option
              v-for="kategori in kategoris"
              :key="kategori.id"
              :value="kategori.id"
            >
              {{ kategori.name }}
            </option>
          </select>
        </div>
        <div class="mb-3 col-md-4">
          <label for="ukuran" class="form-label">Ukuran: </label>
          <div class="input-group">
            <input
              type="text"
              class="form-control"
              placeholder="Ukuran Buku"
              v-model="ukuran"
            />
            <span class="input-group-text">Cm.</span>
          </div>
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada ukuran</small
          >
        </div>
        <div class="mb-3 col-md-4">
          <label for="jumlah_halaman" class="form-label"
            >Jumlah Halaman:
          </label>
          <input
            type="text"
            class="form-control"
            id="jumlah_halaman"
            placeholder="Jumlah Halaman"
            v-model="jumlah_halaman"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada jumlah
            halaman</small
          >
        </div>
        <div class="mb-3 col-md-4">
          <label for="harga" class="form-label">Harga: </label>
          <div class="input-group">
            <span class="input-group-text">Rp.</span>
            <input
              type="text"
              class="form-control"
              id="harga"
              placeholder="Harga Buku"
              v-model="inputNominal"
            />
          </div>
          <small class="text-danger"></small>
        </div>
        <div class="col-md-12 mb-3">
          <label for="sinopsis" class="form-label"
            ><sup class="text-danger">*</sup>Sinopsis:
          </label>
          <CKEditor @input="getInput" :value="sinopsis" />
        </div>
        <div class="col-md-12 mb-3">
          <label for="cover" class="form-label">Cover: </label>
          <input
            type="file"
            id="cover"
            class="form-control"
            @change="getCover"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Ukuran file maksimal 2MB. Format file:
            JPG, JPEG, PNG. Kosongkan jika belum ada cover</small
          >
        </div>

        <div class="col-md-6 mb-3">
          <label for="cover" class="form-label"
            ><sup class="text-danger">*</sup>Tipe Identifikasi:
          </label>
          <select id="cover" class="form-select" v-model="tipe_identifikasi">
            <option value="" disabled>Pilih Tipe Identifikasi</option>
            <option value="ISBN">ISBN</option>
            <option value="QRCBN">QRCBN</option>
            <option value="hanya_cetak">Hanya Cetak</option>
            <option value="hanya_publish">Hanya Publish Di Website</option>
          </select>
        </div>
        <div class="col-md-6 mb-3">
          <label for="cover" class="form-label"
            ><sup class="text-danger">*</sup>Tipe Kepenulisan:
          </label>
          <select id="cover" class="form-select" v-model="tipe_kepenulisan">
            <option value="" disabled>Pilih Tipe Kepenulisan</option>
            <option value="naskah_pribadi">Naskah Pribadi</option>
            <option value="lebih_dari_satu">Lebih dari 1 Penulis</option>
            <option value="naskah_komunitas">Naskah Komunitas</option>
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <label for="editor" class="form-label">Editor: </label>
          <input
            type="text"
            id="editor"
            class="form-control"
            placeholder="Nama Editor"
            v-model="editor"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada editor</small
          >
        </div>
        <div class="col-md-3 mb-3">
          <label for="desain" class="form-label">Desainer: </label>
          <input
            type="text"
            id="desain"
            class="form-control"
            placeholder="Nama Desainer"
            v-model="desainer"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada
            desainer</small
          >
        </div>
        <div class="col-md-3 mb-3">
          <label for="layouter" class="form-label">Layouter: </label>
          <input
            type="text"
            id="layouter"
            class="form-control"
            placeholder="Nama Layouter"
            v-model="layouter"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada
            layouter</small
          >
        </div>
        <div class="col-md-3 mb-3">
          <label for="proofreader" class="form-label">Proofreader: </label>
          <input
            type="text"
            id="proofreader"
            class="form-control"
            placeholder="Nama Proofreader"
            v-model="proofreader"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Kosongkan jika belum ada
            proofreader</small
          >
        </div>
        <div class="col-md-10 mb-3" v-if="tipe_identifikasi === 'ISBN'">
          <label for="surat" class="form-label"
            ><sup class="text-danger">*</sup>Surat Pernyataan Keaslian:
          </label>
          <input
            type="file"
            id="surat"
            class="form-control"
            @change="getSurat"
          />
          <small class="text-danger"
            ><i class="bx bx-error"></i> Ukuran file maksimal 2MB. Format file:
            PDF.</small
          >
        </div>
        <div class="col-md-2 mb-2 d-flex" v-if="tipe_identifikasi === 'ISBN'">
          <!-- <label for="surat" class="form-label text-white">Preview</label> -->
          <button
            class="btn btn-blue font-size-14 my-auto"
            data-bs-toggle="modal"
            data-bs-target="#modal-template"
          >
            <i class="bx bx-upload"></i> Download Template
          </button>
        </div>
        <div class="col-12">
          <Modal
            modal-class=""
            modal-id="modal-template"
            title="Download Template Surat Pernyataan Keaslian"
          >
            <div class="modal-body">
              <p>
                Untuk melanjutkan pendaftaran dengan nomor identifikasi ISBN,
                PERPUSNAS mewajibkan anda mengisi SURAT PERNYATAAN KEASLIAN
                KARYA, Silahkan download surat pernyataan dengan menekan tombol
                dibawah ini.
              </p>
              <p class="text-danger">
                Jika anda mendaftar ISBN anda harus melampirkan surat pernyataan
                ini!
              </p>
              <a
                href="https://isbn.perpusnas.go.id/docsurat/Surat%20Keaslian%20-%2020220813.docx"
                class="btn btn-blue rounded-pill btn-lg font-size-14 d-block"
                download
              >
                <i class="bx bx-download"></i> Download Template
              </a>
            </div>
          </Modal>
        </div>
        <div
          class="col-md-6 mb-3"
          v-if="
            tipe_kepenulisan !== 'naskah_pribadi' && tipe_kepenulisan !== ''
          "
        >
          <label for="penanggung_jawab" class="form-label"
            ><sup class="text-danger">*</sup>Penanggung Jawab:
          </label>
          <input
            type="text"
            id="penanggung_jawab"
            class="form-control"
            placeholder="Nama Penanggung Jawab"
            v-model="penanggung_jawab"
          />
        </div>
        <div
          class="col-md-6 mb-3"
          v-if="
            tipe_kepenulisan !== 'naskah_pribadi' && tipe_kepenulisan !== ''
          "
        >
          <label for="nomor_penanggung_jawab" class="form-label"
            ><sup class="text-danger">*</sup>Nomor Penanggung Jawab:
          </label>
          <input
            type="text"
            id="nomor_penanggung_jawab"
            class="form-control"
            placeholder="Nomor Penanggung Jawab"
            v-model="nomor_penanggung_jawab"
          />
        </div>
        <div class="col-md-6 mt-3 d-grid">
          <button
            type="button"
            class="btn btn-light rounded-pill btn-lg font-size-14"
            @click="back"
          >
            <i class="bx bx-x"></i> Batal
          </button>
        </div>
        <div class="col-md-6 mt-3 d-grid">
          <button
            type="button"
            class="btn btn-blue rounded-pill btn-lg font-size-14"
            @click="onSave"
          >
            <i class="bx bx-save"></i> Simpan
          </button>
        </div>
      </div>
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import usePagination from "../composables/pagination";
import Pagination from "../components/Pagination.vue";
import {
  convertToNumber,
  disableLoader,
  enableLoader,
  formatedDate,
  toIDR,
} from "../helpers/event";
import CKEditor from "../components/CKEditor.vue";
import Modal from "../components/Modal.vue";
import * as yup from "yup";
import Notify from "../helpers/notify";
import useApi from "../composables/api";
import { useField, useForm } from "vee-validate";
import Sweet from "../helpers/sweetalert2";
import { encrypt } from "../helpers/crypto";
const query = ref<string>("");
const filter = ref<string>("");
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
} = usePagination("/pengajuan", filter, query);

const editClick = ref<boolean>(false);

const kategoris = ref<any>([]);
const loadKategori = async () => {
  const response = await getResource("/book-categories");
  kategoris.value = response.data;
};

onMounted(async () => {
  enableLoader();
  await fetchData();
  await loadKategori();
  disableLoader();
});

const schema = yup.object().shape({
  judul_buku: yup.string().required(),
  pengarang: yup.string().required(),
  kategori_buku: yup.string().required(),
  sinopsis: yup.string().required(),
  cover: yup.mixed(),
  tipe_identifikasi: yup.string().required(),
  tipe_kepenulisan: yup.string().required(),
  editor: yup.string(),
  desainer: yup.string(),
  layouter: yup.string(),
  proofreader: yup.string(),
  surat_pernyataan_keaslian: yup.mixed(),
  penanggung_jawab: yup.string(),
  nomor_penanggung_jawab: yup.string(),
  ukuran: yup.string(),
  jumlah_halaman: yup.string(),
  harga: yup.string(),
});

useForm({
  validationSchema: schema,
  initialValues: {
    judul_buku: "",
    pengarang: "",
    kategori_buku: "",
    sinopsis: "",
    cover: "",
    tipe_identifikasi: "",
    tipe_kepenulisan: "",
    editor: "",
    desainer: "",
    layouter: "",
    proofreader: "",
    surat_pernyataan_keaslian: "",
    penanggung_jawab: "",
    nomor_penanggung_jawab: "",
    ukuran: "",
    jumlah_halaman: "",
    harga: "",
  },
});

const statusPengajuan = ref<string>("");
const filterKategori = ref<string>("");
const tipePengajuan = ref<string>("");

const changeStatusPengajuan = (event: Event) => {
  statusPengajuan.value = (event.target as HTMLSelectElement).value;
  filter.value =
    "?filter=" +
    statusPengajuan.value +
    "&filter_kategori=" +
    filterKategori.value +
    "&filter_tipe=" +
    tipePengajuan.value;
  fetchData();
};

const changeKategori = (event: Event) => {
  filterKategori.value = (event.target as HTMLSelectElement).value;
  filter.value =
    "?filter=" +
    statusPengajuan.value +
    "&filter_kategori=" +
    filterKategori.value +
    "&filter_tipe=" +
    tipePengajuan.value;
  fetchData();
};

const changeTipePengajuan = (event: Event) => {
  tipePengajuan.value = (event.target as HTMLSelectElement).value;
  filter.value =
    "?filter=" +
    statusPengajuan.value +
    "&filter_kategori=" +
    filterKategori.value +
    "&filter_tipe=" +
    tipePengajuan.value;
  fetchData();
};

const { value: judul_buku } = useField<string>("judul_buku");
const { value: pengarang } = useField<string>("pengarang");
const { value: kategori_buku } = useField<string>("kategori_buku");
const { value: sinopsis } = useField<string>("sinopsis");
const { value: cover } = useField<File | undefined | null>("cover");
const { value: tipe_identifikasi } = useField<string>("tipe_identifikasi");
const { value: tipe_kepenulisan } = useField<string>("tipe_kepenulisan");
const { value: editor } = useField<string>("editor");
const { value: desainer } = useField<string>("desainer");
const { value: layouter } = useField<string>("layouter");
const { value: proofreader } = useField<string>("proofreader");
const { value: surat_pernyataan_keaslian } = useField<File | undefined | null>(
  "surat_pernyataan_keaslian"
);
const { value: penanggung_jawab } = useField<string>("penanggung_jawab");
const { value: nomor_penanggung_jawab } = useField<string>(
  "nomor_penanggung_jawab"
);
const { value: ukuran } = useField<string>("ukuran");
const { value: jumlah_halaman } = useField<string>("jumlah_halaman");
const { value: harga } = useField<string>("harga");

const getInput = (value: string) => {
  sinopsis.value = value;
};

const back = () => {
  clearValue();
  editClick.value = false;
};

const getCover = (event: Event) => {
  cover.value = getFile(event);
};

const getFile = (event: Event): File | undefined | null => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    return file;
  }
  return null;
};

const inputNominal = computed({
  get: () => harga.value,
  set: (value: any) => {
    harga.value = toIDR(value);
  },
});

const getSurat = (event: Event) => {
  surat_pernyataan_keaslian.value = getFile(event);
};

const { postResourceFormData, putResource, deleteResource, getResource } = useApi();

const onSave = async () => {
  let formData = false;
  const data: any = {
    judul: judul_buku.value,
    pengarang: pengarang.value,
    kategori_buku_id: kategori_buku.value,
    sinopsis: sinopsis.value,
    tipe_identifikasi: tipe_identifikasi.value,
    tipe_kepenulisan: tipe_kepenulisan.value,
  };

  if (cover.value) {
    formData = true;
    data.cover = cover.value;
  }

  if (editor.value) {
    data.editor = "external-" + editor.value;
  }

  if (desainer.value) {
    data.desainer = "external-" + desainer.value;
  }

  if (layouter.value) {
    data.layouter = "external-" + layouter.value;
  }

  if (proofreader.value) {
    data.proofreader = "external-" + proofreader.value;
  }

  if (penanggung_jawab.value) {
    data.penanggung_jawab = penanggung_jawab.value;
  }

  if (nomor_penanggung_jawab.value) {
    data.nomor_hp_penanggung_jawab = nomor_penanggung_jawab.value;
  }

  if (ukuran.value) {
    data.ukuran = ukuran.value;
  }

  if (jumlah_halaman.value) {
    data.jumlah_halaman = jumlah_halaman.value;
  }

  if (harga.value) {
    data.harga = convertToNumber(harga.value);
  }

  if (surat_pernyataan_keaslian.value) {
    formData = true;
    data.surat = surat_pernyataan_keaslian.value;
  }

  if (tipe_kepenulisan.value !== "naskah_pribadi") {
    if (!penanggung_jawab.value || !nomor_penanggung_jawab.value) {
      Notify.error("Penanggung Jawab dan Nomor Penanggung Jawab harus diisi");
      return;
    }
  }

  let response: any = null;
  if (!formData) {
    response = await putResource("/pengajuan/buku/" + idBuku.value, data);
  } else {
    response = await postResourceFormData(
      "/pengajuan/buku/" + idBuku.value,
      data,
      "PUT"
    );
  }
  if (response.data) {
    Notify.success("Naskah berhasil diupload");
  }
  clearValue();
  editClick.value = false;
  await fetchData();
};

const clearValue = () => {
  judul_buku.value = "";
  pengarang.value = "";
  kategori_buku.value = "";
  sinopsis.value = "";
  cover.value = null;
  tipe_identifikasi.value = "";
  tipe_kepenulisan.value = "";
  editor.value = "";
  desainer.value = "";
  layouter.value = "";
  proofreader.value = "";
  surat_pernyataan_keaslian.value = null;
  penanggung_jawab.value = "";
  nomor_penanggung_jawab.value = "";
  ukuran.value = "";
  jumlah_halaman.value = "";
  harga.value = "";
};

const idBuku = ref<any>(null);
const setEdit = (item: any) => {
  idBuku.value = item.id;
  if (item.PengajuanBuku[0].status_pengajuan !== "diproses") {
    Sweet.error(
      "Naskah tidak boleh diedit, karena sudah diterima atau ditolak oleh Administator UNIRA Press"
    );
    return;
  }
  editClick.value = true;
  judul_buku.value = item.judul;
  pengarang.value = item.pengarang;
  kategori_buku.value = item.kategori_buku_id;
  sinopsis.value = item.sinopsis;
  tipe_identifikasi.value = item.tipe_identifikasi;
  tipe_kepenulisan.value = item.tipe_kepenulisan;
  if (item.editor) {
    editor.value = item.editor.split("external-")[1];
  }
  if (item.desainer) {
    desainer.value = item.desainer.split("external-")[1];
  }
  if (item.layouter) {
    layouter.value = item.layouter.split("external-")[1];
  }
  if (item.proofreader) {
    proofreader.value = item.proofreader.split("external-")[1];
  }
  penanggung_jawab.value = item.penanggung_jawab;
  nomor_penanggung_jawab.value = item.nomor_hp_penanggung_jawab;
  ukuran.value = item.ukuran;
  jumlah_halaman.value = item.jumlah_halaman;
  harga.value = item.harga;
};

const hapus = (id: string) => {
  const status_pengajuan = result.value.find((item: any) => item.id === id)
    .PengajuanBuku[0].status_pengajuan;
  if (status_pengajuan !== "diproses") {
    Sweet.error(
      "Naskah tidak boleh dihapus, karena sudah diterima atau ditolak oleh Administator UNIRA Press"
    );
    return;
  }
  Sweet.confirm("Buku yang dihapus tidak dapat dikembalikan", async () => {
    enableLoader();
    const response = await deleteResource(`/pengajuan/buku/${id}`);
    if (response.data) {
      Notify.success(response.message);
      await fetchData();
    }
    disableLoader();
  });
};
</script>

<style>
.icon-circle {
  width: 50px;
  height: 50px;
}
</style>
