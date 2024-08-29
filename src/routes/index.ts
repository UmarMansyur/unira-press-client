import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {useSession} from "../stores/session";
import useToken from "../composables/token";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/beranda",
    name: "Beranda",
    meta: {
      title: "Beranda",
    },
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/berita",
    name: "Berita",
    meta: {
      title: "Berita",
    },
    component: () => import("../views/News.vue"),
  },
  {
    path: "/",
    name: "Landing Page",
    meta: {
      title: "Welcome Unira Press",
      isAuth: false,
    },
    component: () => import("../views/Index.vue"),
  },
  {
    path: "/about-me",
    name: "About Me Landing",
    meta: {
      title: "Tentang kami",
      isAuth: false,
    },
    component: () => import("../views/TentangKami.vue"),
  },
  {
    path: "/katalog",
    name: "Katalog",
    meta: {
      title: "Katalog",
      isAuth: false,
    },
    component: () => import("../views/Katalog.vue"),
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Login",
    },
    component: () => import("../views/Authentication.vue"),
  },
  {
    path: "/berita",
    name: "Berita",
    meta: {
      title: "Berita",
    },
    component: () => import("../views/News.vue"),
  },
  {
    path: '/upload-naskah',
    name: 'Upload Naskah',
    meta: {
      title: "Upload Naskah",
    },
    component: () => import("../views/UploadNaskah.vue")
  },
  {
    path: "/naskah",
    name: "Naskah",
    meta: {
      title: "Naskah",
    },
    component: () => import("../views/Submission.vue"),
  },
  {
    path: "/naskah/:id",
    name: "Naskah Detail",
    meta: {
      title: "Naskah",
    },
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/naskah-saya",
    name: "Naskah Saya",
    meta: {
      title: "Naskah Saya",
    },
    component: () => import("../views/NaskahSaya.vue"),
  },
  {
    path: "/pengajuan-naskah",
    name: "Pengajuan Naskah",
    meta: {
      title: "Pengajuan Naskah",
    },
    component: () => import("../views/PengajuanNaskah.vue"),
  },
  {
    path: "/pengajuan-naskah/:id",
    name: "Pengajuan Naskah Detail",
    meta: {
      title: "Pengajuan Naskah",
    },
    component: () => import("../views/DetailNaskah.vue"),
  },
  {
    path: "/naskah-saya/:id",
    name: "Naskah Saya Detail",
    meta: {
      title: "Naskah Saya",
    },
    component: () => import("../views/Detail.vue"),
  },
  {
    path: "/hak-akses-pengguna",
    name: "Hak Akses Pengguna",
    meta: {
      title: "Hak Akses Pengguna",
    },
    component: () => import("../views/UserPrivillege.vue"),
  },
  {
    path: "/pengajuan-isbn",
    name: "Pengajuan ISBN",
    meta: {
      title: "Pengajuan Buku Baru",
    },
    component: () => import("../views/SubmissionISBN.vue"),
  },
  {
    path: "/kategori-buku",
    name: "Kategori buku",
    meta: {
      title: "Kategori Buku",
    },
    component: () => import("../views/KategoriBuku.vue"),
  },
  {
    path: "/register",
    name: "Register",
    meta: {
      title: "Register",
      isAuth: false,
    },
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    meta: {
      title: "Profile",
      isAuth: false,
    },
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/manajemen-role",
    name: "Manajemen Role",
    meta: {
      title: "Manajemen Role",
    },
    component: () => import("../views/Role.vue"),
  },
  {
    path: "/tentang-kami",
    name: "aboutme",
    meta: {
      title: "Tentang Kami",
    },
    component: () => import("../views/AboutMe.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "mm-active",
  linkExactActiveClass: "active",
});

router.beforeEach(async (to, _, next) => {
  document.title = to.meta.title as string;
  const session = useSession();
  const { decodeToken } = useToken();
  if (to.meta.isAuth === false) {
    return next();
  }
  if (to.name !== "Login" && sessionStorage.getItem("token") === null) {
    return next({ name: "Login" });
  }
  if (to.name === "Login" && sessionStorage.getItem("token") !== null) {
    return next({ name: "Beranda" });
  }
  if (to.name === "Login" && sessionStorage.getItem("token") === null) {
    return next();
  }
  if (to.name !== "Login" && sessionStorage.getItem("token") !== null) {
    if(session.user === null) {
      const user = await decodeToken();
      if(user) {
        const role = user.UserPrivillege.map((item: any) => item.role.name);
        delete user.UserPrivillege;
        user.roles = role;
        sessionStorage.setItem("role", role[0]);
        session.setUser(user);
        session.setRole(sessionStorage.getItem("role"));
      } else {
        sessionStorage.clear();
        return next({ name: "Login" });
      }
    }
    return next();
  }
});

export default router;
