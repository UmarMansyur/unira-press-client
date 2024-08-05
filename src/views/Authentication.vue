<template>
  <div class="d-flex h-100 w-100 gap-0" id="cover-pattern">
    <div class="bg-light w-50 d-none d-lg-inline-block">
      <div class="d-flex h-100 justify-content-center align-items-center">
        <img src="/assets/images/bg-auth.svg" alt="" style="width: 80%" />
      </div>
    </div>
    <div
      class="flex-grow-1 d-flex justify-content-start align-items-center"
      id="auth-pattern"
    >
      <div class="wrapper">
        <h3 class="fw-bold">Welcome Back!</h3>
        <p class="text-muted text-primary text-warning">
          Silahkan login untuk melanjutkan!
        </p>
        <div class="my-4">
          <label for="username" class="d-none">NIS/NPM</label>
          <div class="input-group">
            <span class="input-group-text border-end-0" id="basic-addon1"
              ><i class="bx bx-user"></i
            ></span>
            <input
              type="text"
              class="form-control"
              id="username"
              placeholder="NIS/NPM"
              v-model="username"
            />
          </div>
        </div>
        <div class="my-4">
          <label for="username" class="d-none">Anda Login sebagai: </label>
          <div class="input-group">
            <span class="input-group-text" id="user-addon"
              ><i class="bx bxs-user-account"></i>
            </span>
            <select
              class="form-select"
              id="role"
              placeholder="Pilih Role"
              v-model="role"
            >
              <option value="" disabled>Level Akses</option>
              <option value="admin">Administrator</option>
              <option value="client">Pengguna</option>
            </select>
          </div>
        </div>
        <div class="mt-3">
          <label for="password" class="d-none">Password</label>
          <div class="input-group">
            <span class="input-group-text" id="basic-addon2"
              ><i class="bx bx-lock"></i
            ></span>
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="password"
            />
            <button class="btn btn-light-outline border" type="button">
              <i class="mdi mdi-eye align-middle"></i>
            </button>
          </div>
        </div>

        <div class="my-2">
          <div class="my-3 d-flex justify-content-between">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input form-check-info"
                id="exampleCheck1"
              />
              <label
                class="form-check-label text-muted font-size-13"
                for="exampleCheck1"
                >Ingat saya</label
              >
            </div>
            <a
              href="https://simat.unira.ac.id/forgot-password"
              class="text-blue fw-medium font-size-14"
              >Forgot Password?</a
            >
          </div>
          <div class="d-grid">
            <button
              type="button"
              class="btn btn-blue rounded-3 font-size-13"
              @click="tryLogin"
              :disabled="!meta.valid"
            >
              <i class="bx bx-log-in"></i> Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import Notify from "../helpers/notify";
import useToken from "../composables/token";
import router from "../routes";

const { setToken } = useToken();


const schema = yup.object().shape({
  username: yup.string().required(),
  role: yup.string().required(),
  password: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
  initialValues: {
    username: "",
    role: "",
    password: "",
  },
});

const { value: username } = useField<string>("username");
const { value: role } = useField<string>("role");
const { value: password } = useField<string>("password");

const tryLogin = async () => {
  try {
    const data: any = {
      username: username.value,
      password: password.value,
    };
    if (role.value === "client") {
      data.client = "client";
    }
    const result = await fetch(import.meta.env.VITE_API + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const response = await result.json();
    if (response.data) {
      await setToken(response.data);
      router.push("/");
    }
    if (!result.ok) {
      throw new Error(response.message);
    }
  } catch (error: any) {
    Notify.error(error.message);
  }
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap");

* {
  font-family: "Open Sans", sans-serif;
}

.h-100 {
  height: 100vh !important;
}

.w-100 {
  width: 100vw !important;
}

.w-50 {
  width: 50vw !important;
}

.text-blue {
  color: #194ed3;
}

#auth-pattern {
  background-image: url(/assets/images/cover-pattern.png);
  background-size: cover;
  background-position: center;
  opacity: 1;
  background-color: transparent;
}

.bg-light {
  background-color: transparent !important;
}

.wrapper {
  width: 100%;
  max-width: 500px;
  margin: auto;
  padding: 20px;
}

.form-check-input:checked {
  background-color: #194ed3;
  border-color: #194ed3;
}
</style>
