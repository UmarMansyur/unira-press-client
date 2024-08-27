<template>
  <TheParent>
    <div class="row">
      <div class="mb-3 col-md-12">
        <label for="judul" class="form-label"><sup class="text-danger">*</sup>Judul:
        </label>
        <input type="text" id="judul" class="form-control" placeholder="Judul Naskah" v-model="judul_buku" />
      </div>
      <div class="mb-3 col-md-6">
        <label for="pengarang" class="form-label"><sup class="text-danger">*</sup>Pengarang:
        </label>
        <input type="text" id="pengarang" class="form-control" placeholder="Nama Pengarang" v-model="pengarang" />
      </div>
      <div class="mb-3 col-md-6">
        <label for="kategori-buku" class="form-label"><sup class="text-danger">*</sup>Kategori Buku:
        </label>
        <select id="kategori-buku" class="form-select" v-model="kategori_buku">
          <option value="" disabled>Pilih Kategori</option>
          <option value="1">Novel</option>
          <option value="2">Komik</option>
          <option value="3">Ensiklopedia</option>
        </select>
      </div>
      <div class="mb-3 col-md-4">
        <label for="ukuran" class="form-label">Ukuran:
        </label>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Ukuran Buku" v-model="ukuran" />
          <span class="input-group-text">Cm.</span>
        </div>
        <small class="text-danger">
          <i class="bx bx-info-circle"></i> Kosongkan jika belum mengetahui ukuran buku
        </small>
      </div>
      <div class="mb-3 col-md-4">
        <label for="jumlah_halaman" class="form-label">Jumlah Halaman:
        </label>
        <input type="text" class="form-control" id="jumlah_halaman" placeholder="Jumlah Halaman" v-model="jumlah_halaman" />
        <small class="text-danger"><i class="bx bx-info-circle"></i> Kosongkan jika belum mengetahui jumlah halaman</small>
      </div>
      <div class="mb-3 col-md-4">
        <label for="harga" class="form-label">Harga:
        </label>
        <div class="input-group">
          <span class="input-group-text">Rp.</span>
          <input type="text" class="form-control" id="harga" placeholder="Harga Buku" v-model="inputNominal" />
        </div>
        <small class="text-danger"><i class="bx bx-info-circle"></i> Kosongkan jika belum mengetahui harga</small>
      </div>
      <div class="col-md-12 mb-3">
        <label for="sinopsis" class="form-label"><sup class="text-danger">*</sup>Sinopsis:
        </label>
        <CKEditor @input="getInput" :value="sinopsis"/>
      </div>
      <div class="col-md-6 mb-3">
        <label for="cover" class="form-label">Cover:
        </label>
        <input type="file" id="cover" class="form-control" @change="getCover" />
        <small class="text-danger"><i class="bx bx-error"></i> Ukuran file maksimal 2MB. Format file:
          JPG, JPEG, PNG. Kosongkan jika belum ada cover</small>
      </div>
      <div class="col-md-6 mb-3">
        <label for="naskah" class="form-label">File Naskah:
        </label>
        <input type="file" id="naskah" class="form-control" @change="getNaskah" />
        <small class="text-danger"><i class="bx bx-error"></i> Ukuran file maksimal 10MB. Format file:
          Word. Kosongkan jika belum ada file naskah</small>
      </div>
      <div class="col-md-6 mb-3">
        <label for="cover" class="form-label"><sup class="text-danger">*</sup>Tipe Identifikasi:
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
        <label for="cover" class="form-label"><sup class="text-danger">*</sup>Tipe Kepenulisan:
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
        <input type="text" id="editor" class="form-control" placeholder="Nama Editor" v-model="editor" />
        <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada editor</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="desain" class="form-label">Desainer: </label>
        <input type="text" id="desain" class="form-control" placeholder="Nama Desainer" v-model="desainer" />
        <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada desainer</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="layouter" class="form-label">Layouter: </label>
        <input type="text" id="layouter" class="form-control" placeholder="Nama Layouter" v-model="layouter" />
        <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada layouter</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="proofreader" class="form-label">Proofreader: </label>
        <input type="text" id="proofreader" class="form-control" placeholder="Nama Proofreader" v-model="proofreader" />
        <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada
          proofreader</small>
      </div>
      <div class="col-md-10 mb-3" v-if="tipe_identifikasi === 'ISBN'">
        <label for="surat" class="form-label"><sup class="text-danger">*</sup>Surat Pernyataan Keaslian:
        </label>
        <input type="file" id="surat" class="form-control" @change="getSurat" />
        <small class="text-danger"><i class="bx bx-error"></i> Ukuran file maksimal 2MB. Format file:
          PDF.</small>
      </div>
      <div class="col-md-2 mb-2 d-flex" v-if="tipe_identifikasi === 'ISBN'">
        <!-- <label for="surat" class="form-label text-white">Preview</label> -->
        <button class="btn btn-blue font-size-14 my-auto" data-bs-toggle="modal" data-bs-target="#modal-template">
          <i class="bx bx-upload"></i> Download Template
        </button>
      </div>
      <div class="col-12">
        <Modal modal-class="" modal-id="modal-template" title="Download Template Surat Pernyataan Keaslian">
          <div class="modal-body">
            <p>
              Untuk melanjutkan pendaftaran dengan nomor identifikasi ISBN, PERPUSNAS mewajibkan anda mengisi SURAT
              PERNYATAAN KEASLIAN KARYA, Silahkan download surat pernyataan dengan menekan tombol dibawah ini.
            </p>
            <p class="text-danger">
              Jika anda mendaftar ISBN anda harus melampirkan surat pernyataan ini!
            </p>
            <a href="https://isbn.perpusnas.go.id/docsurat/Surat%20Keaslian%20-%2020220813.docx"
              class="btn btn-blue rounded-pill btn-lg font-size-14 d-block" download>
              <i class="bx bx-download"></i> Download Template
            </a>
          </div>
        </Modal>
      </div>
      <div class="col-md-6 mb-3" v-if="tipe_kepenulisan !== 'naskah_pribadi' && tipe_kepenulisan !== ''">
        <label for="penanggung_jawab" class="form-label"><sup class="text-danger">*</sup>Penanggung Jawab:
        </label>
        <input type="text" id="penanggung_jawab" class="form-control" placeholder="Penanggung Jawab" v-model="penanggung_jawab" />
      </div>
      <div class="col-md-6 mb-3" v-if="tipe_kepenulisan !== 'naskah_pribadi' && tipe_kepenulisan !== ''">
        <label for="nomor_penanggung_jawab" class="form-label"><sup class="text-danger">*</sup>Nomor Penanggung Jawab:
        </label>
        <input type="text" id="nomor_penanggung_jawab" class="form-control" placeholder="Nomor Penanggung Jawab" v-model="nomor_penanggung_jawab" />
      </div>
      <div class="col-md-12 mt-3 d-grid">
        <button type="button" class="btn btn-blue rounded-pill btn-lg font-size-14" :disabled="!meta.valid" @click="onSave">
          <i class="bx bx-upload"></i> Kirim Naskah
        </button>
      </div>
    </div>
  </TheParent>
</template>

<script setup lang="ts">
import TheParent from "../components/TheParent.vue";
import CKEditor from "../components/CKEditor.vue";
import Modal from "../components/Modal.vue";
import * as yup from "yup";
import { useField, useForm } from "vee-validate";
import { computed } from "vue";
import { convertToNumber, toIDR } from "../helpers/event";
import useApi from "../composables/api";
import Notify from "../helpers/notify";


const schema = yup.object().shape({
  judul_buku: yup.string().required(),
  pengarang: yup.string().required(),
  kategori_buku: yup.string().required(),
  sinopsis: yup.string().required(),
  cover: yup.mixed(),
  naskah: yup.mixed(),
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

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    judul_buku: "",
    pengarang: "",
    kategori_buku: "",
    sinopsis: "",
    cover: "",
    naskah: "",
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
  }
});

const { value: judul_buku } = useField<string>("judul_buku");
const { value: pengarang } = useField<string>("pengarang");
const { value: kategori_buku } = useField<string>("kategori_buku");
const { value: sinopsis } = useField<string>("sinopsis");
const { value: cover } = useField<File | undefined>("cover");
const { value: naskah } = useField<File | undefined>("naskah");
const { value: tipe_identifikasi } = useField<string>("tipe_identifikasi");
const { value: tipe_kepenulisan } = useField<string>("tipe_kepenulisan");
const { value: editor } = useField<string>("editor");
const { value: desainer } = useField<string>("desainer");
const { value: layouter } = useField<string>("layouter");
const { value: proofreader } = useField<string>("proofreader");
const { value: surat_pernyataan_keaslian } = useField<File | undefined>("surat_pernyataan_keaslian");
const { value: penanggung_jawab } = useField<string>("penanggung_jawab");
const { value: nomor_penanggung_jawab } = useField<string>("nomor_penanggung_jawab");
const { value: ukuran } = useField<string>("ukuran");
const { value: jumlah_halaman } = useField<string>("jumlah_halaman");
const { value: harga } = useField<string>("harga");

const getInput = (value: string) => {
  sinopsis.value = value;
};

const getCover = (event: Event) => {
  cover.value = getFile(event);
};

const getNaskah = (event: Event) => {
  naskah.value = getFile(event);
}

const getFile = (event: Event): File | undefined => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  return file;
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

const { postResourceFormData, postResource } = useApi();

const onSave = async() => {
  let formData = false;
  const data: any = {
    judul: judul_buku.value,
    pengarang: pengarang.value,
    kategori_buku_id: kategori_buku.value,
    sinopsis: sinopsis.value,
    tipe_identifikasi: tipe_identifikasi.value,
    tipe_kepenulisan: tipe_kepenulisan.value,
  }

  if(cover.value) {
    formData = true;
    data.cover = cover.value;
  }

  if(naskah.value) {
    formData = true;
    data.naskah = naskah.value;
  }

  if(editor.value) {
    data.editor = "external-" + editor.value;
  }

  if(desainer.value) {
    data.desainer = "external-" + desainer.value;
  }

  if(layouter.value) {
    data.layouter = "external-" + layouter.value;
  }

  if(proofreader.value) {
    data.proofreader = "external-" + proofreader.value;
  }

  if(penanggung_jawab.value) {
    data.penanggung_jawab = penanggung_jawab.value;
  }

  if(nomor_penanggung_jawab.value) {
    data.nomor_hp_penanggung_jawab = nomor_penanggung_jawab.value;
  }

  if(ukuran.value) {
    data.ukuran = ukuran.value;
  }

  if(jumlah_halaman.value) {
    data.jumlah_halaman = jumlah_halaman.value;
  }

  if(harga.value) {
    data.harga = convertToNumber(harga.value);
  }

  if(surat_pernyataan_keaslian.value) {
    formData = true;
    data.surat = surat_pernyataan_keaslian.value;
  }

  if(tipe_identifikasi.value === "ISBN") {
    if(!surat_pernyataan_keaslian.value) {
      Notify.error("Surat pernyataan keaslian harus diisi");
      return;
    }
  }

  if(tipe_kepenulisan.value !== 'naskah_pribadi') {
    if(!penanggung_jawab.value || !nomor_penanggung_jawab.value) {
      Notify.error("Penanggung Jawab dan Nomor Penanggung Jawab harus diisi");
      return;
    }
  }


  let response: any = null;
  if(!formData) {
    response = await postResource("/pengajuan", data);
  } else {
    response = await postResourceFormData("/pengajuan", data);
  }
  if(response.data) {
    Notify.success("Naskah berhasil diupload");
  }
  clearValue();
}

const clearValue = () => {
  judul_buku.value = "";
  pengarang.value = "";
  kategori_buku.value = "";
  sinopsis.value = "";
  cover.value = undefined;
  naskah.value = undefined;
  tipe_identifikasi.value = "";
  tipe_kepenulisan.value = "";
  editor.value = "";
  desainer.value = "";
  layouter.value = "";
  proofreader.value = "";
  surat_pernyataan_keaslian.value = undefined;
  penanggung_jawab.value = "";
  nomor_penanggung_jawab.value = "";
  ukuran.value = "";
  jumlah_halaman.value = "";
  harga.value = "";
}


</script>
