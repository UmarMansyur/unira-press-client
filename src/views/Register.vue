<template>
  <div
    class="row justify-content-center align-items-center h-100"
    id="cover-pattern"
  >
    <div class="col-md-5">
      <div class="card mt-4 card-bg-fill">
        <div class="card-body p-4">
          <div class="text-center mt-2">
            <h5 class="text-blue text-uppercase">Daftar Akun Baru</h5>
            <p class="text-muted">
              Silahkan daftar akun baru untuk melanjutkan!
            </p>
          </div>
          <div class="p-2 mt-4">
            <form class="needs-validation" action="index.html">
              <div class="mb-3">
                <label for="useremail" class="form-label"
                  ><sup class="text-danger">*</sup>Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="useremail"
                  placeholder="Masukkan Email"
                  v-model="email"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="nama-lengkap"
                  ><sup class="text-danger">*</sup>Nama Lengkap</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="nama-lengkap"
                  placeholder="Masukkan nama lengkap"
                  v-model="fullname"
                />
              </div>
              <div class="mb-3">
                <label for="username" class="form-label"
                  ><sup class="text-danger">*</sup>Username</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Masukkan username"
                  v-model="username"
                />
              </div>
              <div class="mb-3">
                <label class="form-label" for="phone-input"
                  ><sup class="text-danger">*</sup>No. Hp</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="phone-input"
                  placeholder="Masukkan No. Hp"
                  v-model="phone"
                />
              </div>

              <div class="mb-3">
                <label class="form-label" for="password-input"
                  ><sup class="text-danger">*</sup>Password</label
                >
                <div class="position-relative auth-pass-inputgroup">
                  <input
                    type="password"
                    class="form-control pe-5 password-input"
                    onpaste="return false"
                    placeholder="Masukkan password"
                    id="password-input"
                    v-model="password"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label" for="password-input"
                  ><sup class="text-danger">*</sup>Konfirmasi Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  placeholder="Masukkan konfirmasi password"
                  v-model="confirmPassword"
                />
              </div>

              <div class="mb-3">
                <button class="btn btn-blue w-100" type="button" :disabled="!meta.valid" @click="register">
                  <i class="bx bx-send me-2"></i>Register
                </button>
              </div>

              <div class="mt-4 text-center">
                Sudah memiliki akun?
                <RouterLink to="/login" class="text-muted fw-semibold">
                  Login</RouterLink
                >
              </div>
            </form>
          </div>
        </div>
        <!-- end card body -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Notify from "../helpers/notify";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fullname: yup.string().required(),
  username: yup.string().required(),
  phone: yup.string().required(),
  password: yup.string().required(),
  confirmPassword: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    email: "",
    fullname: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  },
});

const { value: email } = useField<string>("email");
const { value: fullname } = useField<string>("fullname");
const { value: username } = useField<string>("username");
const { value: phone } = useField<string>("phone");
const { value: password } = useField<string>("password");
const { value: confirmPassword } = useField<string>("confirmPassword");

const register = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      Notify.error("Password dan konfirmasi password tidak sama!");
      return;
    }
    const response = await fetch(import.meta.env.VITE_API + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        nama: fullname.value,
        username: username.value,
        phone: phone.value,
        password: password.value,
        is_simat: false,
      }),
    });
    const result = await response.json();
    if(!response.ok) {
      throw new Error(result.message);
    }
    Notify.success("Registrasi berhasil, silahkan cek email anda!");
  } catch (error: any) {
    Notify.error(error.message);
  }
};

</script>

<style scoped lang="css">
#cover-pattern {
  background: url(../assets/images/bg-auth.svg) center center/cover no-repeat;
  background-size: cover;
}
.h-100 {
  max-height: 100vh !important;
  max-width: 100vw !important;
  height: 100vh !important;
  width: 100vw !important;
}
body {
  margin: 0;
  padding: 0;
}
</style>
