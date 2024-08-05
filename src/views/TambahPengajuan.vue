<template>
  <template v-if="step == 1">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Indentitas Buku</h4>
            <p class="card-title-desc">
              Isi form berikut untuk menambahkan pengajuan buku baru
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="judul" class="form-label">Judul</label>
                  <input type="text" class="form-control" v-model="title" placeholder="Judul buku"/>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="kepengarangan" class="form-label"
                    >Kepengarangan</label
                  >
                  <input type="text" class="form-control" v-model="author" id="kepengarangan" name="kepengarangan" placeholder="Kepengarangan"/>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="edisi" class="form-label">Edisi</label>
                  <input type="text" class="form-control" v-model="edition" name="edisi" id="edisi" placeholder="Edisi"/>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="seri" class="form-label">Seri</label>
                  <input type="text" class="form-control" v-model="series" id="seri" name="seri" placeholder="Seri"/>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="link" class="form-label">Link Buku</label>
                  <input type="text" class="form-control" v-model="link" id="link" name="link" placeholder="Link Buku"/>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="judul" class="form-label">Deskripsi</label>
                  <CKEditor @input="getInput" :value="sinopsis"/>
                </div>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <button
                    type="button"
                    class="btn btn-light"
                    @click="backClick"
                  >
                    <i class="bx bx-left-arrow-alt me"></i> Kembali
                  </button>
                  <button type="button" class="btn btn-blue" @click="step = 2">
                    Selanjutnya <i class="bx bx-right-arrow-alt"></i> 
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-if="step == 2">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Informasi Publikasi & Detail Fisik</h4>
            <p class="card-title-desc">
              Isi form berikut untuk menambahkan pengajuan buku baru
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="distributor" class="form-label"
                    >Distributor</label
                  >
                  <input type="text" class="form-control" v-model="distribution" placeholder="Distributor"/>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="tahun-terbit" class="form-label"
                    >Tahun Terbit</label
                  >
                  <input type="text" class="form-control" v-model="publish_year" placeholder="Tahun Terbit"/>
                </div>
              </div>
              
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    >Jumlah Halaman</label
                  >
                  <input type="text" class="form-control" v-model="page_count" placeholder="Jumlah Halaman" />
                </div>
              </div>
              <div class="col-sm-4">
                <div class="mb-3">
                  <label for="judul" class="form-label">Tinggi Buku</label>
                  <input type="text" class="form-control" v-model="height" placeholder="Tinggi Buku"/>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="terbitan" class="form-label">Terbitan</label>
                  <select class="form-select" v-model="publicationId">
                    <option value="" disabled>Pilih Terbitan</option>
                    <option v-for="item in detail.terbitan" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label">Kategori Pembaca</label>
                  <select class="form-select" v-model="readerCategoryId" id="kategori">
                    <option value="" disabled>Pilih Kategori</option>
                    <option v-for="item in detail.kategori_pembaca" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label">Jenis Pustaka</label>
                  <select class="form-select" v-model="referenceTypeId">
                    <option value="" disabled>Jenis Pustaka</option>
                    <option v-for="item in detail.jenis_pustaka" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label">Kategori Jenis</label>
                  <select class="form-select" v-model="typeCategoryId">
                    <option value="" disabled>Kategori Jenis</option>
                    <option v-for="item in detail.kategori_jenis" :value="item.id">{{ item.name }}</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="file" class="form-label">File: </label>
                  <input type="file" class="form-control" @change="getFile"/>
                </div>
              </div>

              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-light" @click="step = 1">
                    <i class="bx bx-left-arrow-alt "></i> Kembali
                  </button>
                  <button type="button" class="btn btn-blue" @click="saveData">
                    <i class="bx bx-save me"></i> Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import CKEditor from "../components/CKEditor.vue";
import { onMounted, ref } from "vue";
import * as yup from "yup";
import useApi from "../composables/api";
import Notify from "../helpers/notify";
import { useSession } from "../stores/session";

const step = ref<number>(1);
const emits = defineEmits(["setClick"]);

const backClick = () => {
  emits("setClick", false);
};

const getInput = (value: string) => {
  sinopsis.value = value;
};

const file = ref<any>(null);

const getFile = (e: any) => {
  file.value = e.target.files[0];
};

const schema = yup.object().shape({
  title: yup.string().required(),
  author: yup.string().required(),
  sinopsis: yup.string().required(),
  distribution: yup.string().required(),
  link: yup.string().required(),
  edition: yup.string().required(),
  series: yup.string().required(),
  publish_year: yup.string().required(),
  page_count: yup.string().required(),
  height: yup.string().required(),
  readerCategoryId: yup.string().required(),
  referenceTypeId: yup.string().required(),
  typeCategoryId: yup.string().required(),
  publicationId: yup.string().required(),
  mediaId: yup.string().required(),
});


const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    title: "",
    author: "",
    sinopsis: "",
    distribution: "",
    link: "",
    edition: "",
    series: "",
    publish_year: "",
    page_count: "",
    height: "",
    readerCategoryId: "",
    referenceTypeId: "",
    typeCategoryId: "",
    publicationId: ""
  },
});

const { value: title } = useField<string>("title");
const { value: author } = useField<string>("author");
const { value: sinopsis } = useField<string>("sinopsis");
const { value: distribution } = useField<string>("distribution");
const { value: link } = useField<string>("link");
const { value: edition } = useField<string>("edition");
const { value: series } = useField<string>("series");
const { value: publish_year } = useField<string>("publish_year");
const { value: page_count } = useField<string>("page_count");
const { value: height } = useField<string>("height");
const { value: readerCategoryId } = useField<string>("readerCategoryId");
const { value: referenceTypeId } = useField<string>("referenceTypeId");
const { value: typeCategoryId } = useField<string>("typeCategoryId");
const { value: publicationId } = useField<string>("publicationId");

const session = useSession();

const { getResource, postResourceFormData } = useApi();

const detail = ref<any>(null);
const kategoris = async () => {
  const response = await getResource('/resource');
  detail.value = response;
}

onMounted(async () => {
  await kategoris();
});

const saveData = async() => {
  const data: any = {
    title: title.value,
    author: author.value,
    sinopsis: sinopsis.value,
    distribution: distribution.value,
    link: link.value,
    edition: edition.value,
    series: series.value,
    publish_year: publish_year.value,
    page_count: page_count.value,
    height: height.value,
    readerCategoryId: readerCategoryId.value,
    referenceTypeId: referenceTypeId.value,
    typeCategoryId: typeCategoryId.value,
    publicationId: publicationId.value,
    status_publish: 'Menunggu',
    nomor_induk: session.getUser?.id
  }
  if (file.value) {
    data.file = file.value;
  }
  const response = await postResourceFormData('/pengajuan', data);
  if(response.data) {
    Notify.success('Data berhasil disimpan');
    emits("setClick", false);
  }
}



</script>
