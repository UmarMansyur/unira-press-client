<template>
  <template v-if="step == 1">
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">Indentitas Buku</h4>
            {{ title }} asdfsdf
            <p class="card-title-desc">
              Isi form berikut untuk menambahkan pengajuan buku baru
            </p>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Judul:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="title"
                    placeholder="Judul buku"
                  />
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="kepengarangan" class="form-label"
                    ><sup class="text-danger">*</sup>Kepengarangan:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="author"
                    id="kepengarangan"
                    name="kepengarangan"
                    placeholder="Kepengarangan"
                  />
                  <small
                    >Jika pengarang lebih dari 1 orang maka, pisahkan dengan
                    titik koma ";" Contoh: Fahrosi;Amelia Hasanah</small
                  >
                </div>
              </div>
              <div class="col-sm-2">
                <div class="mb-3">
                  <label for="edisi" class="form-label"
                    ><sup class="text-danger">*</sup>Edisi:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="edition"
                    name="edisi"
                    id="edisi"
                    placeholder="Edisi"
                  />
                </div>
              </div>
              <div class="col-sm-2">
                <div class="mb-3">
                  <label for="seri" class="form-label"
                    ><sup class="text-danger">*</sup>Seri:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="series"
                    id="seri"
                    name="seri"
                    placeholder="Seri"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="link" class="form-label">Link Buku:</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="link"
                    id="link"
                    name="link"
                    placeholder="Link Buku"
                  />
                </div>
              </div>
              <div class="col-sm-12">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Sinopsis:</label
                  >
                  <CKEditor @input="getInput" :value="sinopsis" />
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
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Jumlah Halaman:</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="page_count"
                    placeholder="Jumlah Halaman"
                  />
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Lebar Buku:</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="width"
                      placeholder="Lebar Buku"
                    />
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Tinggi Buku:</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="height"
                      placeholder="Tinggi Buku"
                    />
                    <span class="input-group-text">cm</span>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Berat Buku:</label
                  >
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      v-model="weight"
                      placeholder="Berat Buku"
                    />
                    <span class="input-group-text">gr</span>
                  </div>
                </div>
              </div>

              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="judul" class="form-label"
                    ><sup class="text-danger">*</sup>Kategori Pembaca</label
                  >
                  <select
                    class="form-select"
                    v-model="readerCategoryId"
                    id="kategori"
                  >
                    <option value="" disabled>Pilih Kategori</option>
                    <option
                      v-for="item in detail.kategori_pembaca"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label"
                    ><sup class="text-danger">*</sup>Jenis Pustaka</label
                  >
                  <select class="form-select" v-model="referenceTypeId">
                    <option value="" disabled>Pilih Jenis Pustaka</option>
                    <option
                      v-for="item in detail.jenis_pustaka"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label"
                    ><sup class="text-danger">*</sup>Kategori Jenis</label
                  >
                  <select class="form-select" v-model="typeCategoryId">
                    <option value="" disabled>Pilih Kategori Jenis</option>
                    <option
                      v-for="item in detail.kategori_jenis"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="mb-3">
                  <label for="jenis-pustaka" class="form-label"
                    ><sup class="text-danger">*</sup>Media</label
                  >
                  <select class="form-select" v-model="mediaId">
                    <option value="" disabled>Pilih Media</option>
                    <option v-for="item in detail.media" :value="item.id">
                      {{ item.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="col-12">
                <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-light" @click="step = 1">
                    <i class="bx bx-left-arrow-alt"></i> Kembali
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
import { computed, onMounted, ref, watch } from "vue";
import * as yup from "yup";
import useApi from "../composables/api";
import Notify from "../helpers/notify";
import { useSession } from "../stores/session";

const step = ref<number>(1);
const emits = defineEmits(["setClick", "ubahClick"]);

const backClick = () => {
  emits("ubahClick", false);
  emits("setClick", false);
};

const getInput = (value: string) => {
  sinopsis.value = value;
};

const file = ref<any>(null);

// watch(computedDatas, (value) => {
//   if (value) {

//   }
// });

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
  mediaId: yup.string().required(),
  width: yup.string().required(),
  weight: yup.string().required(),
});

useForm({
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
    mediaId: "",
    width: "",
    weight: "",
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
const { value: mediaId } = useField<string>("mediaId");
const { value: weight } = useField<string>("weight");
const { value: width } = useField<string>("width");

const session = useSession();

const { getResource, putResource } = useApi();

const detail = ref<any>(null);
const kategoris = async () => {
  const response = await getResource("/resource");
  detail.value = response;
};

const props = defineProps<{
  datas: any;
}>();

const propsComputed = computed(() => {
  title.value = props.datas.title;
  author.value = props.datas.author;
  sinopsis.value = props.datas.sinopsis;
  distribution.value = props.datas.distribution;
  link.value = props.datas.link;
  edition.value = props.datas.edition;
  series.value = props.datas.series;
  publish_year.value = props.datas.publish_year;
  page_count.value = props.datas.page_count;
  height.value = props.datas.height;
  readerCategoryId.value = props.datas.readerCategoryId;
  referenceTypeId.value = props.datas.referenceTypeId;
  typeCategoryId.value = props.datas.typeCategoryId;
  mediaId.value = props.datas.mediaId;
  width.value = props.datas.width;
  weight.value = props.datas.weight;
  return props.datas;
});

watch(propsComputed, (value) => {
  if (value) {
    title.value = value.title;
    author.value = value.author;
    sinopsis.value = value.sinopsis;
    distribution.value = value.distribution;
    link.value = value.link;
    edition.value = value.edition;
    series.value = value.series;
    publish_year.value = value.publish_year;
    page_count.value = value.page_count;
    height.value = value.height;
    readerCategoryId.value = value.readerCategoryId;
    referenceTypeId.value = value.referenceTypeId;
    typeCategoryId.value = value.typeCategoryId;
    mediaId.value = value.mediaId;
    width.value = value.width;
    weight.value = value.weight;
  }
});

onMounted(async () => {
  await kategoris();
});

const saveData = async () => {
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
    status_publish: "Menunggu",
    nomor_induk: session.getUser?.id,
    mediaId: mediaId.value,
    width: width.value,
    weight: weight.value,
  };

  const loadDetailData = async (id: string) => {
    const response = await fetch("https://api.unira.ac.id/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
        query {
          dokar(nis: "${id}") {
            nis
            nama
            email
            thumbnail

          }
        }
      `,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      return {
        value: {
          nis: data.data.dokar.nis,
          nama: data.data.dokar.nama,
          email: data.data.dokar.email,
          thumbnail: "https://api.unira.ac.id/" + data.data.dokar.thumbnail,
        },
      };
    }
  };

  const response = await putResource("/pengajuan/" + props.datas.id, data);
  if (response.data) {
    Notify.success("Data berhasil disimpan");
    const resp = await getResource("/pengajuan/" + props.datas.id);
    const value = await loadDetailData(resp.data.nomor_induk);
    resp.data = {
      ...resp.data,
      ...value!.value,
    };
    emits("ubahClick", {
      value: false,
      data: resp.data,
    });
    emits("setClick", false);
  }
};
</script>
