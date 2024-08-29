<template>
  <TheParent>
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-sm">
                <div class="d-flex align-items-start mt-3 mb-3 mt-sm-0">
                  <div class="flex-shrink-0">
                    <div class="avatar-xl me-3">
                      <img
                        :src="session.getUser?.thumbnail"
                        alt="profil"
                        class="img-fluid rounded-circle d-block"
                      /><label for="file-profile" style="cursor: pointer"
                        ><!----></label
                      ><input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        name="profile"
                        id="file-profile"
                        class="d-none"
                      />
                    </div>
                  </div>
                  <div class="flex-grow-1">
                    <div>
                      <h5 class="font-size-16 mb-2">
                        {{ session.getUser?.nama }}
                      </h5>
                      <div class="text-muted font-size-13">
                        <div>
                          <i
                            class="mdi mdi-circle-medium me-1 text-success align-middle"
                          ></i
                          >{{ session.getUser?.username }}
                        </div>
                        <div>
                          <i
                            class="mdi mdi-circle-medium me-1 text-success align-middle"
                          ></i
                          >{{ session.getUser?.email }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-auto">
                <div
                  class="d-flex align-items-start justify-content-center gap-2"
                >
                  <button
                    type="button"
                    class="btn btn-danger waves-effect waves-light"
                    data-bs-toggle="modal"
                    data-bs-target="#pin-modal"
                  >
                    <i class="bx bx-key font-size-20 align-top me-1"></i>
                    Ubah Akun
                  </button>
                </div>
              </div>
              <div class="col-12">
                <Modal modal-class="" modal-id="pin-modal" title="Ubah Akun">
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="username" class="form-label">Username: </label>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        v-model="username"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="password" class="form-label">Password: </label>
                      <input
                        type="password"
                        class="form-control"
                        id="password"
                        v-model="password"
                      />
                      </div>
                      <div class="mb-3">
                        <label for="password_confirmation" class="form-label">Konfirmasi Password: </label>
                        <input
                          type="password"
                          class="form-control"
                          id="password_confirmation"
                          v-model="password_confirmation"
                        />
                      </div>
                      <div class="mb-3">
                        <button
                          type="button"
                          class="btn btn-blue waves-effect waves-light"
                          @click="saveAkun"
                          data-bs-dismiss="modal"
                          :disabled="!meta.valid"
                        >
                          <i class="bx bx-send"></i> Simpan Akun
                        </button>

                      </div>
                  </div>
                </Modal>
              </div>
            </div>
            <!---->
          </div>
        </div>
        <form role="form" aria-label="form edit profil">
          <div class="tab-content">
            <div class="tab-pane active" id="identitas-tab" role="tabpanel">
              <div class="card">
                <div class="card-header">
                  <h5 class="card-title mb-0">Identitas Pengguna</h5>
                </div>
                <div class="card-body">
                  <div class="row mb-3">
                    <div class="col-md-2">
                      <label for="nama" class="col-form-label"
                        >Nama Lengkap:</label
                      >
                    </div>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        id="nama"
                        v-model="nama"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-2">
                      <label for="email" class="col-form-label">Email:</label>
                    </div>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        id="email"
                        v-model="email"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-2">
                      <label for="phone" class="col-form-label">No. Hp:</label>
                    </div>
                    <div class="col-md-6">
                      <input
                        type="text"
                        class="form-control"
                        id="phone"
                        v-model="no_hp"
                      />
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-2">
                      <label for="thumbnail" class="col-form-label"
                        >Thumbnail:</label
                      >
                    </div>
                    <div class="col-md-6">
                      <input
                        type="file"
                        class="form-control"
                        id="thumbnail"
                        @change="getFile"
                      />
                    </div>
                  </div>
                </div>
                <div class="card-footer pt-2 pb-3">
                  <button
                    type="button"
                    class="btn btn-blue waves-effect waves-light"
                    @click="onSave"
                    :disabled="!meta.valid"
                  >
                    <i class="bx bx-send"></i> Simpan Identitas
                  </button>
                </div>
              </div>
            </div>
            <!---->
          </div>
        </form>
      </div>
    </div>
  </TheParent>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import TheParent from "../components/TheParent.vue";
import { useSession } from "../stores/session";
import * as yup from "yup";
import useApi from "../composables/api";
import Notify from "../helpers/notify";
import useToken from "../composables/token";
import Modal from "../components/Modal.vue";

const session = useSession();
const { decodeToken } = useToken();

const schema = yup.object().shape({
  nama: yup.string().required("Nama harus diisi"),
  email: yup.string().email("Email tidak valid").required("Email harus diisi"),
  no_hp: yup.string().required("No. Hp harus diisi"),
  thumbnail: yup.mixed(),
  username: yup.string().required("Username harus diisi"),
  password: yup.string(),
  password_confirmation: yup.string()
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    id: session.getUser?.id,
    nama: session.getUser?.nama,
    email: session.getUser?.email,
    no_hp: session.getUser?.phone,
    thumbnail: "",
    username: session.getUser?.username,
    password: "",
    password_confirmation: ""
  },
});

const { value: nama } = useField<string>("nama");
const { value: email } = useField<string>("email");
const { value: no_hp } = useField<string>("no_hp");
const { value: thumbnail } = useField<File | null | undefined>("thumbnail");
const { value: username } = useField<string>("username");
const { value: password } = useField<string>("password");
const { value: password_confirmation } = useField<string>("password_confirmation");

const { postResourceFormData, putResource } = useApi();

const onSave = async () => {
  const data: any = {
    nama: nama.value,
    email: email.value,
    phone: no_hp.value,
  };
  if (thumbnail.value) {
    data.thumbnail = thumbnail.value;
  }
  const response = await postResourceFormData(
    "/pengguna/" + session.getUser?.id,
    data,
    "PUT"
  );
  if (response.data) {
    Notify.success("Berhasil menyimpan data");
    const user = await decodeToken();
    if (user) {
      const role = user.UserPrivillege.map((item: any) => item.role.name);
      delete user.UserPrivillege;
      user.roles = role;
      sessionStorage.setItem("role", role[0]);
      session.setUser(user);
      session.setRole(sessionStorage.getItem("role"));
    }
  }
};

const saveAkun = async() => {
  if(password.value !== password_confirmation.value) {
    Notify.error("Password tidak sama");
    return;
  }
  const data: any = {
    username: username.value,
    password: password.value,
  };
  const response = await putResource("/pengguna/" + session.getUser?.id + '/akun', data);
  if(response.data) {
    Notify.success("Berhasil menyimpan data");
  }
}


const getFile = (e: any) => {
  thumbnail.value = e.target.files[0];
};
</script>
