<template>
  <TheParent>
    <template v-if="detail.id">
      <div class="row">
        <div class="col-lg-9">
          <div class="card">
            <div class="card-body">
              <div class="">
                <div class="text-center mb-3">
                  <h4>{{ detail.judul }}</h4>
                </div>
                <div class="mb-1" v-if="detail.file_cover">
                  <img
                    :src="detail.file_cover"
                    alt=""
                    class="img-thumbnail mx-auto d-block"
                  />
                </div>
                <div class="mb-1" v-else>
                  <img
                    src="https://via.placeholder.com/400"
                    alt=""
                    class="img-thumbnail mx-auto d-block"
                  />
                </div>
                <div
                  class="text-center my-3 d-flex gap-2 justify-content-center align-items-center"
                >
                  <button type="button" class="btn btn-info" @click="uploadCover" v-if="detail.PengajuanBuku[0].pengguna_id === session.getUser?.id || (detail.PengajuanBuku[0].status_pengajuan !== 'diproses') && session.getUser?.role === 'Desainer'">
                    <i class="bx bx-upload"></i> Upload Cover
                  </button>
                  <input type="file" id="file-cover-buku" class="d-none" @change="saveUploadCover" />
                  <a
                    :href="detail.file_cover"
                    target="_blank"
                    class="btn btn-success"
                  >
                    <i class="bx bx-download"></i> Download Cover
                  </a>
                </div>

                <div class="text-center">
                  <div class="row">
                    <div class="col-sm-4">
                      <div>
                        <h6 class="mb-2">Kategori Buku</h6>
                        <p class="text-muted font-size-15">
                          {{ detail.kategori_buku?.name }}
                        </p>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mt-4 mt-sm-0">
                        <h6 class="mb-2">Tanggal Pengajuan</h6>
                        <p class="text-muted font-size-15">
                          {{ formatedDate(detail.tanggal_pengajuan) }}
                        </p>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mt-4 mt-sm-0">
                        <h6 class="mb-2">Pengarang</h6>
                        <p class="font-size-15 text-muted">
                          {{
                            detail.pengarang?.includes(",")
                              ? detail.pengarang.split(",")[0] + "dkk"
                              : detail.pengarang
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mt-4">
                  <div class="text-muted font-size-14">
                    <div v-html="detail.sinopsis"></div>
                  </div>
                  <hr />
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5>File Naskah:</h5>
                    <button
                      type="button"
                      class="btn btn-blue"
                      @click="uploadClick"
                      v-if="
                        (detail.PengajuanBuku[0].status_pengajuan === 'revisi' || detail.PengajuanBuku[0].status_pengajuan === 'diterima_untuk_ditinjau') && session.getUser?.role !== 'Desainer'"
                    >
                      <i class="bx bx-upload me-2"></i>Upload Naskah
                    </button>
                    <input
                      type="file"
                      id="file-naskah-buku"
                      class="d-none"
                      @change="getNaskah"
                    />
                  </div>
                  <hr />
                  <div class="mt-4">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Keterangan</th>
                            <th>Tanggal Upload</th>
                            <th class="text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody class="align-middle">
                          <tr
                            v-for="(file, index) in detail.FileNaskah"
                            :key="index"
                          >
                            <td>{{ file.keterangan }}</td>
                            <td>
                              {{ formatedDate(file.createdAt) }}
                            </td>
                            <td class="text-center">
                              <a
                                :href="baseUrl + '/' + file.file_naskah"
                                target="_blank"
                                class="btn btn-sm btn-blue"
                              >
                                <i class="bx bx-download"></i>
                              </a>
                              <button
                                class="btn btn-sm btn-red ms-1"
                                @click="deleteFile(file.id)"
                                v-if="
                                 (detail.PengajuanBuku[0].status_pengajuan === 'revisi' || detail.PengajuanBuku[0].status_pengajuan === 'diterima_untuk_ditinjau') && session.getUser?.role !== 'Desainer' && file.keterangan !== 'Naskah Pengguna' && file.keterangan !== 'Naskah Buku'
                                "
                              >
                                <i class="bx bx-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr v-if="detail.FileNaskah.length === 0">
                            <td colspan="3" class="text-center">
                              Belum ada file naskah
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mt-4">
                  <div class="d-flex align-items-center justify-content-between ">
                    <h5 class="mb-3">
                      <i class="bx bx-credit-card"></i> Informasi Tagihan
                    </h5>
                    <div class="text-end">
                      <button type="button" class="btn btn-blue" data-bs-toggle="modal" data-bs-target="#modal-tagihan" v-if="detail.PengajuanBuku[0].status_pengajuan !== 'diterbitkan' && session.getUser?.role !== 'Pengguna' && detail.PengajuanBuku[0].status_pengajuan !== 'ditolak'">
                        <i class="bx bx-plus"></i> Tambah Tagihan
                      </button>
                    </div>
                  </div>
                  <div>
                    <Modal
                      modal-class="modal-md"
                      modal-id="modal-tagihan"
                      title="Tambah/Edit Tagihan"
                    >
                      <div class="modal-body">
                        <div class="mb-3">
                          <label for="nominal" class="form-label">Nominal: </label>
                          <div class="input-group">
                            <div class="input-group-text">Rp</div>
                            <input
                              type="text"
                              name="nominal"
                              id="nominal"
                              class="form-control"
                              v-model="inputNominal"
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="keterangan" class="form-label">Keterangan: </label>
                          <textarea name="keterangan" id="keterangan" class="form-control" rows="5" v-model="keterangan"></textarea>
                        </div>
                        <div class="mb-1 d-flex justify-content-between">
                          <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                            <i class="bx bx-x"></i> Batal
                          </button>
                          <button type="button" class="btn btn-blue" @click="saveInvoice" data-bs-dismiss="modal">
                            <i class="bx bx-save"></i> Simpan
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div class="table-responsive mt-3">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Keterangan</th>
                          <th>Nominal</th>
                          <th class="text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(tagihan, index) in detail.Invoice" :key="index">
                          <td v-if="tagihan.keterangan?.includes(session.getUser?.role)">{{ tagihan.keterangan }}</td>
                          <td v-if="tagihan.keterangan?.includes(session.getUser?.role)">
                            {{
                              new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(tagihan.total_pembayaran)
                            }}
                          </td>
                          <td v-if="tagihan.keterangan?.includes(session.getUser?.role)" class="text-center">
                            <button
                              class="btn btn-sm btn-blue me-2"
                              @click="
                                invoiceId = tagihan.id;
                                inputNominal = tagihan.total_pembayaran;
                                keterangan = tagihan.keterangan;
                              "
                              data-bs-target="#modal-tagihan"
                              data-bs-toggle="modal"
                            >
                              <i class="bx bx-pencil"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-red"
                              @click="deleteInvoice(tagihan.id)"
                            >
                              <i class="bx bx-trash"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <div class="col-lg-3">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <div class="search-box">
                  <h5 class="mb-3">
                    <i class="bx bx-edit-alt me-2"></i>Tipe Identifikasi
                  </h5>
                  <!-- detail.tipe_identifikasi -->
                  <span
                    class="badge bg-info rounded-pill font-size-14"
                    v-if="detail.tipe_identifikasi === 'hanya_publish'"
                    >Publish Website</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-14"
                    v-if="detail.tipe_identifikasi === 'hanya_cetak'"
                    >Hanya Cetak</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-14"
                    v-if="detail.tipe_identifikasi === 'ISBN'"
                    >Pengajuan ISBN</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-14"
                    v-if="detail.tipe_identifikasi === 'QRCBN'"
                    >QRCBN</span
                  >
                </div>
                <div class="mt-3">
                  <h5 class="mb-3">
                    <i class="bx bx-pencil me-2"></i>Tipe Kepenulisan
                  </h5>
                  <span
                    class="badge bg-success rounded-pill font-size-14"
                    v-if="detail.tipe_kepenulisan === 'naskah_pribadi'"
                    >Naskah Pribadi</span
                  >
                  <span
                    class="badge bg-success rounded-pill font-size-14"
                    v-if="detail.tipe_kepenulisan === 'lebih_dari_satu'"
                    >Lebih dari 1 Penulis</span
                  >
                  <span
                    class="badge bg-success rounded-pill font-size-14"
                    v-if="detail.tipe_kepenulisan === 'naskah_komunitas'"
                    >Naskah Komunitas</span
                  >
                </div>
                <div class="mt-3">
                  <h5 class="mb-3">
                    <i class="bx bx-time me-2"></i>
                    Monitoring Pengajuan
                  </h5>
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'diproses'
                    "
                    class="badge bg-info text-white font-size-14 text-uppercase mb-3"
                    >Diproses</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'ditolak'
                    "
                    class="badge bg-danger text-white font-size-14 text-uppercase mb-3"
                    >Ditolak</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan ===
                      'diterima_untuk_ditinjau'
                    "
                    class="badge bg-primary text-white font-size-14 text-uppercase mb-3"
                    >Diterima untuk Ditinjau</span
                  >
                  <span
                    v-if="detail.PengajuanBuku[0].status_pengajuan === 'revisi'"
                    class="badge bg-warning text-white font-size-14 text-uppercase mb-3"
                    >Direvisi</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan ===
                      'proses_cetak'
                    "
                    class="badge bg-info text-white font-size-14 text-uppercase mb-3"
                    >Proses Cetak</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'diterbitkan'
                    "
                    class="badge bg-success text-white font-size-14 text-uppercase mb-3"
                    >Diterbitkan</span
                  >
                  <ul class="list-unstyled">
                    <li>
                      {{ formatedDate(detail.tanggal_pengajuan) }} - Naskah di
                      Ajukan
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_ditolak">
                      {{
                        formatedDate(detail.PengajuanBuku[0].tanggal_ditolak)
                      }}
                      - Naskah di Tolak
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_diterima">
                      {{
                        formatedDate(detail.PengajuanBuku[0].tanggal_diterima)
                      }}
                      - Naskah di Terima untuk di Tinjau
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_revisi">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_revisi) }}
                      - Naskah di Direvisi
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_cetak">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_cetak) }}
                      - Naskah dalam Proses Cetak
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_terbit">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_terbit) }}
                      - Naskah diterbitkan
                    </li>
                  </ul>
                  <h5 class="mb-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                    <i class="bx bx-grid-alt me-2"></i>Status Pengajuan ISBN
                  </h5>
                  <span
                    class="badge bg-warning rounded-pill font-size-14"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'proses'
                    "
                  >
                    Proses
                  </span>
                  <span
                    class="badge bg-success rounded-pill font-size-14"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'permohonan_revisi'
                    "
                  >
                    Permohonan Revisi
                  </span>
                  <span
                    class="badge bg-danger rounded-pill font-size-14"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'ditolak'
                    "
                  >
                    Ditolak
                  </span>
                  <span
                    class="badge bg-info rounded-pill font-size-14"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'isbn_diterbitkan'
                    "
                  >
                    Diterima
                  </span>
                  <h5 class="my-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                    <i class="bx bx-barcode me-2"></i>ISBN
                  </h5>
                  <span>
                    {{ detail.isbn === null ? "Belum ada ISBN" : detail.isbn }}
                  </span>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- spinner -->
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 50vh"
      >
        <div class="spinner-border m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import useApi from "../composables/api";
import { decrypt } from "../helpers/crypto";
import { convertToNumber, disableLoader, enableLoader, formatedDate, toIDR } from "../helpers/event";
import { useRoute } from "vue-router";
import Notify from "../helpers/notify";
import { useSession } from "../stores/session";
import Sweet from "../helpers/sweetalert2";
import Modal from "../components/Modal.vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";

const detail = ref<any>({});
const {
  getResource,
  putResource,
  postResource,
  postResourceFormData,
  baseUrl,
  deleteResource,
} = useApi();

const route = useRoute();
const loadData = async () => {
  const id = route.params.id;
  const response = await getResource(
    "/pengajuan/buku/" + decrypt(id.toString())
  );
  detail.value = response.data;
  if (!response.data.editor?.includes("external-")) {
    console.log(response.data.editor);
    detailEditor.value = response.data.editor_person?.find(
      (editor: any) => editor.nama == response.data.editor
    )?.id;
  }
  if (!response.data.layouter?.includes("external-")) {
    detailLayouter.value = response.data.layouter_person?.find(
      (layouter: any) => layouter.nama == response.data.layouter
    )?.id;
  }
  if (!response.data.desainer?.includes("external-")) {
    detailDesainer.value = response.data.desainer_person?.find(
      (desainer: any) => desainer.nama == response.data.desainer
    )?.id;
  }
  if (!response.data.proofreader?.includes("external-")) {
    detailProofreader.value = response.data.proofreader_person?.find(
      (proofreader: any) => proofreader.nama == response.data.proofreader
    )?.id;
  }
};

const detailEditor = ref<string>("");
const detailLayouter = ref<string>("");
const detailDesainer = ref<string>("");
const detailProofreader = ref<string>("");



const uploadClick = (e: any) => {
  const fileNaskah = document.getElementById("file-naskah-buku");
  fileNaskah?.click();
};

const session = useSession();

const getNaskah = async (e: any) => {
  const file = e.target.files[0];
  const data = {
    buku_id: detail.value.id,
    file_naskah: file,
    keterangan: "Naskah " + session.getUser?.role,
  };
  const response = await postResourceFormData("/pengajuan/file-naskah", data);
  if (response.data) {
    Notify.success("Berhasil mengupload naskah");
    await loadData();
  }
};

const deleteFile = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus file naskah?", async () => {
    const response = await deleteResource(`/pengajuan/file-naskah/${id}`);
    if (response.data) {
      Notify.success("Berhasil menghapus file naskah");
      await loadData();
    }
  });
};

const schema = yup.object().shape({
  nominal: yup.string().required("Nominal harus diisi"),
  keterangan: yup.string().required("Keterangan harus diisi"),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    nominal: "",
    keterangan: "",
  },
});

const { value: nominal } = useField<string>("nominal");
const { value: keterangan } = useField<string>("keterangan");

const inputNominal = computed({
  get: () => nominal.value,
  set: (value: any) => {
    nominal.value = toIDR(value);
  },
});

const invoiceId = ref<string>("");

const saveInvoice = async() => {
  const data = {
    total_pembayaran: convertToNumber(nominal.value),
    keterangan: session.getUser?.role + " - " + keterangan.value,
    buku_id: detail.value.id,
    pengguna_id: Number(detail.value.PengajuanBuku[0].pengguna_id)
  };
  let response: any;
  if(invoiceId.value !== '') {
    response = await putResource(`/pengajuan/invoice/${invoiceId.value}`, data);
  } else {
    response = await postResource("/pengajuan/invoice", data);
  }
  if (response.data) {
    Notify.success(response.message);
    await loadData();
  }
}

const deleteInvoice = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus tagihan?", async () => {
    const response = await deleteResource(`/pengajuan/invoice/${id}`);
    if (response.data) {
      Notify.success("Berhasil menghapus tagihan");
      await loadData();
    }
  });
};

const uploadCover = (e: any) => {
  const fileCover = document.getElementById("file-cover-buku");
  fileCover?.click();
};

const saveUploadCover = async (e: any) => {
  // jika invoicenya belum di set tampilkan error
  if (detail.value.Invoice.length < 1) {
    Notify.error("Tagihan belum di set");
    return;
  }
  const detailInvoice = detail.value.Invoice.find(
    (invoice: any) => invoice.keterangan.includes(session.getUser?.role)
  );
  if (!detailInvoice) {
    Notify.error("Tagihan belum di set");
    return;
  }
  const file = e.target.files[0];
  const data = {
    file_cover: file,
    buku_id: detail.value.id,
  };
  const response = await postResourceFormData(
    "/pengajuan/file-cover/",
    data
  );
  if (response.data) {
    Notify.success("Berhasil mengupload cover");
    await loadData();
  }
};


onMounted(async () => {
  enableLoader();
  await loadData();
  disableLoader();
});
</script>

<style scoped>
.jumbotron {
  height: 30vh;
  width: 80vw;
}
</style>
