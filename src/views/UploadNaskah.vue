<template>
  <TheParent>
    <div class="row">
      <div class="mb-3 col-md-12">
        <label for="judul" class="form-label"><sup class="text-danger">*</sup>Judul: </label>
        <input type="text" id="judul" class="form-control" placeholder="Judul Naskah" />
      </div>
      <div class="mb-3 col-md-6">
        <label for="pengarang" class="form-label"><sup class="text-danger">*</sup>Pengarang: </label>
        <input type="text" id="pengarang" class="form-control" placeholder="Nama Pengarang" />
      </div>
      <div class="mb-3 col-md-6">
        <label for="kategori-buku" class="form-label"><sup class="text-danger">*</sup>Kategori Buku: </label>
        <select id="kategori-buku" class="form-select">
          <option value="">Pilih Kategori</option>
          <option value="1">Novel</option>
          <option value="2">Komik</option>
          <option value="3">Ensiklopedia</option>
        </select>
      </div>
      <div class="col-md-12 mb-3">
        <label for="sinopsis" class="form-label"><sup class="text-danger">*</sup>Sinopsis: </label>
        <CKEditor />
      </div>
      <div class="col-md-6 mb-3">
        <label for="cover" class="form-label"><sup class="text-danger">*</sup>Cover: </label>
        <input type="file" id="cover" class="form-control" />
        <small class="text-danger"><i class="bx bx-error"></i> Ukuran file maksimal 2MB. Format file: JPG, JPEG, PNG. Kosongkan jika belum ada cover</small>
      </div>
      <div class="col-md-6 mb-3">
        <label for="naskah" class="form-label"><sup class="text-danger">*</sup>File Naskah: </label>
        <input type="file" id="naskah" class="form-control" /> <small class="text-danger"><i class="bx bx-error"></i> Ukuran file maksimal 10MB. Format file: Word. Kosongkan jika belum ada file naskah</small>
      </div>
      <div class="col-md-6 mb-3">
        <label for="cover" class="form-label"><sup class="text-danger">*</sup>Tipe Identifikasi: </label>
        <select id="cover" class="form-select">
          <option value="1">ISBN</option>
          <option value="2">QRCBN</option>
          <option value="3">Hanya Cetak</option>
        </select>
      </div>
      <div class="col-md-6 mb-3">
        <label for="cover" class="form-label"><sup class="text-danger">*</sup>Tipe Kepenulisan: </label>
        <select id="cover" class="form-select">
          <option value="1">Naskah Pribadi</option>
          <option value="2">Lebih dari 1 Penulis</option>
          <option value="2">Naskah Komunitas</option>
        </select>
      </div>
      <div class="col-md-3 mb-3">
        <label for="editor" class="form-label">Editor: </label>
        <input type="text" id="editor" class="form-control" placeholder="Nama Editor" />
        <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada editor</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="desain" class="form-label">Desainer: </label>
        <input type="text" id="desain" class="form-control" placeholder="Nama Desainer" /> <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada desainer</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="layouter" class="form-label">Layouter: </label>
        <input type="text" id="layouter" class="form-control" placeholder="Nama Layouter"/> <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada layouter</small>
      </div>
      <div class="col-md-3 mb-3">
        <label for="proofreader" class="form-label">Proofreader: </label>
        <input type="text" id="proofreader" class="form-control" placeholder="Nama Proofreader"/> <small class="text-danger"><i class="bx bx-error"></i> Kosongkan jika belum ada proofreader</small>
      </div>
      <div class="col-md-12 mb-3">
        <label for="surat" class="form-label"><sup class="text-danger">*</sup>Surat Pernyataan Keaslian: </label>
        <input type="file" id="surat" class="form-control" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="penanggung_jawab" class="form-label"><sup class="text-danger">*</sup>Penanggung Jawab: </label>
        <input type="text" id="penanggung_jawab" class="form-control" placeholder="Nama Penanggung Jawab" />
      </div>
      <div class="col-md-6 mb-3">
        <label for="nomor_penanggung_jawab" class="form-label"><sup class="text-danger">*</sup>Nomor Penanggung Jawab: </label>
        <input type="text" id="nomor_penanggung_jawab" class="form-control" placeholder="Nomor Penanggung Jawab" />
      </div>
      <div class="col-md-12 mt-3 d-grid">
        <button class="btn btn-blue rounded-pill btn-lg font-size-14"><i class="bx bx-upload"></i> Kirim Naskah</button>
      </div>
    </div>

  </TheParent>
</template>

<script setup lang="ts">
import TheParent from "../components/TheParent.vue";
import CKEditor from "../components/CKEditor.vue";
</script>
