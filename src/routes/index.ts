import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Beranda",
    meta: {
      title: "Beranda",
    },
    component: () => import("../views/Home.vue"),
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
    path: "/pengajuan",
    name: "Submission",
    meta: {
      title: "Pengajuan",
    },
    component: () => import("../views/Submission.vue"),
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

router.beforeEach((to, _, next) => {
  document.title = to.meta.title as string;
  if (to.name !== "Login" && sessionStorage.getItem("token") === null) {
    return next({ name: "Login" });
  }
  if (to.name === "Login" && sessionStorage.getItem("token") !== null) {
    return next({ name: "Home" });
  }
  if (to.name === "Login" && sessionStorage.getItem("token") === null) {
    return next();
  }
  next();
});

export default router;
