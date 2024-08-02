<template>
  <ul class="metismenu list-unstyled" id="side-menu">
    <li>
      <div class="text-center mt-4 mb-5" id="wrapper-sidebar-img">
        <div class="p-1 d-inline-flex bg-light rounded-circle">
          <img
            src="https://api.unira.ac.id/img/profil/mhs/8e35dc4c9c4b61b341800d1ef1f10eba.jpg"
            alt="img-thumbnail"
            id="sidebar-img"
            class="rounded-circle avatar-xl"
          />
        </div>
        <h5 class="font-size-16 mt-3 mb-1 text-white" id="sidebar-name">
          Khana Zulfana Imam
        </h5>
      </div>
    </li>
    <li>
      <RouterLink to="/" class="waves-effect">
        <i data-feather="home"></i>
        <span data-key="t-horizontal">Beranda</span>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/berita" class="waves-effect">
        <i data-feather="file-text"></i>
        <span data-key="t-horizontal">Berita</span>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/" class="waves-effect">
        <i data-feather="check-circle"></i>
        <span data-key="t-horizontal">Pengajuan Penerbitan</span>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/" class="waves-effect">
        <i data-feather="book-open"></i>
        <span data-key="t-horizontal">Katalog</span>
      </RouterLink>
    </li>
    <li>
      <RouterLink to="/" class="waves-effect">
        <i data-feather="shopping-bag"></i>
        <span data-key="t-horizontal">Pemesanan</span>
      </RouterLink>
    </li>
    <li class="">
      <a href="javascript: void(0);" class="has-arrow waves-effect">
        <i data-feather="settings"></i>
        <span data-key="t-apps">Pengaturan</span>
      </a>
      <ul
        class="sub-menu mm-collapse"
        aria-expanded="false"
        style="height: 0px"
      >
        <li>
          <a href="apps-calendar.html">
            <span data-key="t-calendar">Tentang Kami</span>
          </a>
        </li>

        <li>
          <a href="apps-chat.html">
            <span data-key="t-chat">Testimoni</span>
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>
<style scoped>
li a {
  font-size: 13px !important;
}
</style>