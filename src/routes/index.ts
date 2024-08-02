import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Beranda',
    meta: {
      title: "Beranda"
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/berita',
    name: 'Berita',
    meta: {
      title: "Berita"
    },
    component: () => import('../views/News.vue')
  },
];


const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'mm-active',
  linkExactActiveClass: 'active'
});

export default router;

