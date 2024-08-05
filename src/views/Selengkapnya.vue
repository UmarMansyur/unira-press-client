<template>
  <div class="card-body">
    <div class="d-flex align-items-center mb-4">
      <div class="flex-shrink-0 me-3">
        <img
          class="rounded-circle avatar-sm"
          :src="datas.thumbnail"
          alt="Generic placeholder image"
        />
      </div>
      <div class="flex-grow-1">
        <h5 class="font-size-14 mb-0">
          {{ datas.nama }}
        </h5>
        <small class="text-muted">
          {{ datas.email }}
        </small>
      </div>
      <div class="ms-auto flex-shrink-0">
        <button
          type="button"
          class="btn btn-red me-2"
          @click="cancelSubmission(datas.id)"
        >
          <i class="bx bx-x me-1"></i> Batalkan Pengajuan
        </button>
        <button type="button" class="btn btn-info-2 me-2" @click="ubahClick">
          <i class="bx bx-pencil me-1"></i> Edit
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          @click="$emit('close', false)"
        >
          <i class="bx bx-arrow-back me-1"></i> Kembali
        </button>
      </div>
    </div>

    <h4 class="font-size-16 mb-0">
      {{ datas.title }}
    </h4>
    <p class="text-muted mb-0">
      {{
        new Date(datas.createdAt).toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      }}
    </p>
    <div class="d-flex gap-1 mb-3">
      <span class="badge bg-info">
        <i class="mdi mdi-book-open-variant"></i> {{ datas.media?.name }}
      </span>
      <span class="badge bg-primary">
        {{ datas.category_reader?.name }}
      </span>
      <span class="badge bg-success">
        {{ datas.category_type?.name }}
      </span>
      <span class="badge bg-warning">
        {{ datas.publication?.name }}
      </span>
      <span class="badge bg-danger">
        {{ datas.type_reference?.name }}
      </span>
    </div>
    <hr />
    <div class="text-center">
      <div class="card d-inline-flex">
        <div class="card-body">
          <img
            :src="datas.cover"
            alt=""
            class="img-fluid"
            style="max-height: 400px"
          />
        </div>
        <div class="card-footer d-flex justify-content-center gap-2">
          <button class="btn btn-info btn-sm" @click="download2(datas.cover)">
            <i class="bx bx-download me-2"></i>Download
          </button>
          <button class="btn btn-warning-2 btn-sm" @click="changeImage">
            <i class="bx bx-pencil me-2"></i> Ganti
          </button>
          <input
            type="file"
            class="d-none"
            id="cover-file"
            @change="changeCover"
          />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <h5 class="font-size-15">Pengarang:</h5>
        <p>
          {{ datas.author }}
        </p>
      </div>
      <div class="col-sm-3">
        <h5 class="font-size-15">Edisi:</h5>
        <p>
          {{ datas.edition }}
        </p>
      </div>
      <div class="col-sm-3">
        <h5 class="font-size-15">Seri:</h5>
        <p>
          {{ datas.series }}
        </p>
      </div>
      <div class="col-sm-3">
        <h5 class="font-size-15">Jumlah Halaman:</h5>
        <p>
          {{ datas.page_count === 0 ? "-" : datas.page_count }} Halaman
        </p>
      </div>
      <div class="col-sm-3">
        <h5 class="font-size-15">Ukuran Buku:</h5>
        <p>
          {{ datas.width }} x {{ datas.height }} cm ({{ datas.weight }} gram)
        </p>
      </div>
      <div class="col-sm-6">
        <h5 class="font-size-15">Link Buku:</h5>
        <p>
          {{ datas.link }}
        </p>
      </div>
    </div>

    <!-- Render html -->
    <div v-html="datas.sinopsis"></div>
    <hr />
    <!-- End renderer -->
    <div class="row">
      <div class="col-xl-6">
        <h5 class="font-size-15">File:</h5>
      </div>
      <div class="col-xl-6">
        <button class="btn btn-blue btn-sm float-end" @click="uploadFileRevisi">
          <i class="bx bx-upload me-2"></i>Upload File
        </button>
        <input
          type="file"
          class="d-none"
          id="file-upload"
          @change="getFileRevisi2"
        />
      </div>
      <div class="col-xl-auto mt-4" v-for="file in datas.FileRevisi">
        <div class="card">
          <div class="card-body p-3">
            <div class="dropdown float-end">
              <a
                class="text-muted dropdown-toggle font-size-16"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
              >
                <i class="bx bx-dots-vertical-rounded font-size-20"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="javascript:void()" @click="updateFileRevisi2(file.id)">Edit</a>
                <a
                  class="dropdown-item"
                  href="javascript:void()"
                  @click="deleteFile(file.id)"
                  >Hapus</a
                >
              </div>
            </div>
            <div class="d-flex align-items-center overflow-hidden">
              <div class="flex-shrink-0 me-3">
                <div class="avatar align-self-center">
                  <div
                    class="avatar-title rounded p-1 px-2 bg-danger-subtle text-danger font-size-24"
                  >
                    <i class="mdi mdi-file"></i>
                  </div>
                </div>
              </div>

              <div class="flex-grow-1">
                <h5 class="font-size-15 mb-1 text-truncate">
                  <a
                    href="javascript:void()"
                    class="text-dark"
                    @click="download(file.file)"
                    >{{ file.file }}</a
                  >
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="col-xl-12"
        v-if="datas.FileRevisi && datas.FileRevisi.length === 0"
      >
        <div class="text-center">
          <img
            src="/assets/images/404.png"
            alt=""
            class="img-fluid"
            width="300"
          />
          <h6 class="text-muted font-size-16">Tidak ada file yang di unggah</h6>
          <button type="button" class="btn btn-blue" @click="uploadFileRevisi">
            <i class="bx bx-upload me-2"></i>Upload File
          </button>
          <input
            type="file"
            class="d-none"
            id="file-upload"
            @change="getFileRevisi2"
          />
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <h5 class="font-size-15">
        <div class="col-12">
          <i class="bx bx-message-dots text-muted align-middle me-1"></i>
          Komentar:
        </div>
      </h5>
      <div class="col-12" style="max-height: 400px; overflow-y: auto">
        <div class="mt-3">
          <div v-for="comment in datas.Comment">
            <div class="d-flex">
              <div class="flex-shrink-0 me-3">
                <div class="avatar-xs">
                  <div
                    class="avatar-title rounded-circle bg-light text-primary"
                  >
                    <img :src="comment.isClient === true ? session.getUser?.thumbnail : 'https://api.unira.ac.id/' + datas.thumbnail" alt="" class="rounded-circle avatar-sm" />
                  </div>
                </div>
              </div>
              
              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">
                  {{ comment.isClient === true ? session.getUser?.username : "Reviewer" }}
                  <small class="text-muted float-end">
                    {{ new Date(comment.createdAt).toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) }}
                  </small>
                  <a href="javascript:void()" class="text-muted float-end me-2" @click="hapusKomentar(comment.id)">
                    <i class="bx bx-trash"></i>
                  </a>
                  <a href="javascript:void()" class="text-muted float-end me-2" @click="editKomentar(comment.id)">
                    <i class="bx bx-pencil"></i>
                  </a>
                </h5>
                <p class="text-muted">
                  {{ comment.comment }}
                </p>
              </div>
            </div>
          </div>
          <div v-if="datas.Comment && datas.Comment.length === 0">
            <div class="text-center">
              <h6 class="text-muted font-size-16">Belum ada komentar</h6>
            </div>

          </div>
        </div>
      </div>
      <div>
        <textarea
          class="form-control"
          rows="5"
          placeholder="Tulis komentar"
          v-model="comment"
          @keydown.enter="sendComment"
        ></textarea>
        <button class="btn btn-blue mt-3" type="button" @click="sendComment">
          <i class="bx bx-send"></i> Kirim
        </button>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import useApi from "../composables/api";
import { disableLoader, enableLoader } from "../helpers/event";
import Sweet from "../helpers/sweetalert2";
import Notify from "../helpers/notify";
import { useSession } from "../stores/session";

const session = useSession();

const props = defineProps<{
  data: any;
}>();

const computedProps = computed(() => props.data);
const datas = ref<any>(computedProps.value);
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
    props.data.nis = data.data.dokar.nis;
    props.data.nama = data.data.dokar.nama;
    props.data.email = data.data.dokar.email;
    props.data.thumbnail =
      "https://api.unira.ac.id/" + data.data.dokar.thumbnail;
    datas.value.nis = data.data.dokar.nis;
    datas.value.nama = data.data.dokar.nama;
    datas.value.email = data.data.dokar.email;
    datas.value.thumbnail =
      "https://api.unira.ac.id/" + data.data.dokar.thumbnail;
  }
};

watch(computedProps, async (value) => {
  if (value) {
    await loadDetailData(value.nomor_induk);
    datas.value = value;
  }
});

const { deleteResource, postResourceFormData, getResource, postResource, putResource } = useApi();

const emits = defineEmits(["close", 'ubahClick']);

const download = (path: string) => {
  window.open(import.meta.env.VITE_API + "/uploads/" + path, "_blank");
};

const download2 = (path: string) => {
  window.open(path, "_blank");
};

const cancelSubmission = async (id: string) => {
  Sweet.confirm("Apakah Anda yakin ingin menghapus data ini?", async () => {
    enableLoader();
    await deleteResource(`/pengajuan/${id}`);
    Notify.success("Data berhasil dihapus");
    emits("close", false);
    disableLoader();
  });
};

const deleteFile = async (id: string) => {
  Sweet.confirm("Apakah Anda yakin ingin menghapus file ini?", async () => {
    enableLoader();
    await deleteResource(`/file-revisi/${id}`);
    Notify.success("File berhasil dihapus");
    await refreshData(props.data.id);
    disableLoader();
  });
};

const changeImage = () => {
  document.getElementById("cover-file")?.click();
};

const changeCover = async (e: any) => {
  if (!e.target.files[0]) {
    return;
  }
  const file = e.target.files[0];
  const response = await postResourceFormData(
    "/pengajuan/cover/" + props.data.id,
    {
      file: file,
    }
  );
  if (response) {
    await refreshData(props.data.id);
    Notify.success("Cover berhasil diubah");
  }
};

const uploadFileRevisi = () => {
  document.getElementById("file-upload")?.click();
};

const getFileRevisi2 = async (e: any) => {
  if (!e.target.files[0]) {
    return;
  }
  const file = e.target.files[0];
  const path = editFileId.value ? "/file-revisi/" + editFileId.value : "/file-revisi";
  const response = await postResourceFormData(path, {
    pengajuan_id: props.data.id,
    file: file,
  });
  if (response) {
    await refreshData(props.data.id);
    Notify.success("File berhasil diunggah");
  }
};

const editFileId = ref<string>("");

const refreshData = async (id: string) => {
  const response = await getResource("/pengajuan/" + id);
  if (response) {
    datas.value = response.data;
  }
  await loadDetailData(response.data.nomor_induk);
};

const comment = ref<string>("");
const commentId = ref<string>("");

const editKomentar = (id: string) => {
  commentId.value = id;
  const commentData = datas.value.Comment.find((item: any) => item.id === id);
  comment.value = commentData.comment;
};

const hapusKomentar = async (id: string) => {
  enableLoader();
  await deleteResource(`/comment/${id}`);
  await refreshData(props.data.id);
  disableLoader();
};


const sendComment = async () => {
  if (!comment.value) {
    Notify.error("Komentar tidak boleh kosong");
    return;
  }


  if (commentId.value) {
    const response = await putResource("/comment/" + commentId.value, {
      comment: comment.value,
    });
    if (response) {
      Notify.success("Komentar berhasil diubah");
      await refreshData(props.data.id);
      comment.value = "";
      commentId.value = "";
    }
    return;
  }



  const response = await postResource("/comment", {
    nomor_induk: datas.value.nomor_induk,
    isClient: session.getUser?.role === "client",
    pengajuan_id: props.data.id,
    comment: comment.value,
  });
  if (response) {
    Notify.success("Komentar berhasil dikirim");
    await refreshData(props.data.id);
    comment.value = "";
  }
};

const updateFileRevisi2 = async (id: string) => {
  editFileId.value = id;
  document.getElementById("file-upload")?.click();
};



const ubahClick = () => {
  emits("ubahClick", {
    value: true,
    data: datas.value,
  });
};

</script>
