<template>
  <TheParent>
    <template v-if="detail.id">
      <div class="row">
        <div class="col-lg-9">
          <div class="card">
            <div class="card-body">
              <div class="">
                <div class="text-center mb-3">
                  <h4>{{ detail.judul }}</h4>
                </div>
                <div class="mb-4" v-if="detail.file_cover">
                  <img
                    :src="detail.file_cover"
                    alt=""
                    class="img-thumbnail mx-auto d-block"
                  />
                </div>
                <div class="mb-4" v-else>
                  <img
                    src="https://via.placeholder.com/400"
                    alt=""
                    class="img-thumbnail mx-auto d-block"
                  />
                </div>

                <div class="text-center">
                  <div class="row">
                    <div class="col-sm-4">
                      <div>
                        <h6 class="mb-2">Kategori Buku</h6>
                        <p class="text-muted font-size-15">
                          {{ detail.kategori_buku?.name }}
                        </p>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mt-4 mt-sm-0">
                        <h6 class="mb-2">Tanggal Pengajuan</h6>
                        <p class="text-muted font-size-15">
                          {{ formatedDate(detail.tanggal_pengajuan) }}
                        </p>
                      </div>
                    </div>
                    <div class="col-sm-4">
                      <div class="mt-4 mt-sm-0">
                        <h6 class="mb-2">Pengarang</h6>
                        <p class="font-size-15 text-muted">
                          {{
                            detail.pengarang?.includes(",")
                              ? detail.pengarang.split(",")[0] + "dkk"
                              : detail.pengarang
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div class="mt-4">
                  <h5>Sinopsis:</h5>
                  <div class="text-muted font-size-12">
                    <div v-html="detail.sinopsis"></div>
                  </div>
                  <hr />
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <h5>File Naskah:</h5>
                    <button
                      type="button"
                      class="btn btn-blue"
                      @click="uploadClick"
                      v-if="
                        detail.PengajuanBuku[0].pengguna_id ===
                          session.getUser?.id &&
                        detail.PengajuanBuku[0].status_pengajuan ===
                          'diproses' &&
                        detail.FileNaskah.length < 1
                      "
                    >
                      <i class="bx bx-upload me-2"></i>Upload Naskah
                    </button>
                    <input
                      type="file"
                      id="file-naskah-buku"
                      class="d-none"
                      @change="getNaskah"
                    />
                  </div>
                  <hr />
                  <div class="mt-4">
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th>Keterangan</th>
                            <th>Tanggal Upload</th>
                            <th class="text-center">Aksi</th>
                          </tr>
                        </thead>
                        <tbody class="align-middle">
                          <tr
                            v-for="(file, index) in detail.FileNaskah"
                            :key="index"
                          >
                            <td>{{ file.keterangan }}</td>
                            <td>
                              {{ formatedDate(file.createdAt) }}
                            </td>
                            <td class="text-center">
                              <a
                                :href="baseUrl + '/' + file.file_naskah"
                                target="_blank"
                                class="btn btn-sm btn-blue"
                              >
                                <i class="bx bx-download"></i>
                              </a>
                              <button
                                class="btn btn-sm btn-red ms-1"
                                @click="deleteFile(file.id)"
                                v-if="
                                  detail.PengajuanBuku[0].pengguna_id ===
                                    session.getUser?.id &&
                                  detail.PengajuanBuku[0].status_pengajuan ===
                                    'diproses'
                                "
                              >
                                <i class="bx bx-trash"></i>
                              </button>
                            </td>
                          </tr>
                          <tr v-if="detail.FileNaskah.length === 0">
                            <td colspan="3" class="text-center">
                              Belum ada file naskah
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div
                  class="mt-4"
                  v-if="detail.PengajuanBuku[0].status_pengajuan === 'ditolak'"
                >
                  <h5>Alasan Penolakan:</h5>
                  <p>{{ detail.PengajuanBuku[0].alasan_penolakan }}</p>
                </div>
                <hr />
                <div class="mt-4">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <h5 class="mb-3">
                      <i class="bx bx-credit-card"></i> Informasi Tagihan
                    </h5>
                    <div class="text-end">
                      <div class="text-end">
                      <button type="button" class="btn btn-blue" data-bs-toggle="modal" data-bs-target="#modal-tagihan" v-if="detail.PengajuanBuku[0].status_pengajuan !== 'diterbitkan' && session.getUser?.role === 'Pengguna' && detail.PengajuanBuku[0].status_pengajuan !== 'ditolak'">
                        <i class="bx bx-plus"></i> Tambah Tagihan
                      </button>
                    </div>
                    </div>
                  </div>
                  <div>
                    <Modal
                      modal-class="modal-md"
                      modal-id="modal-tagihan"
                      title="Tambah/Edit Tagihan"
                    >
                      <div class="modal-body">
                        <div class="mb-3">
                          <label for="nominal" class="form-label"
                            >Nominal:
                          </label>
                          <div class="input-group">
                            <div class="input-group-text">Rp</div>
                            <input
                              type="text"
                              name="nominal"
                              id="nominal"
                              class="form-control"
                              v-model="inputNominal"
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="keterangan" class="form-label"
                            >Keterangan:
                          </label>
                          <textarea
                            name="keterangan"
                            id="keterangan"
                            class="form-control"
                            rows="5"
                            v-model="keterangan"
                          ></textarea>
                        </div>
                        <div class="mb-1 d-flex justify-content-between">
                          <button
                            type="button"
                            class="btn btn-light"
                            data-bs-dismiss="modal"
                          >
                            <i class="bx bx-x"></i> Batal
                          </button>
                          <button
                            type="button"
                            class="btn btn-blue"
                            @click="saveInvoice"
                            data-bs-dismiss="modal"
                          >
                            <i class="bx bx-save"></i> Simpan
                          </button>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div class="table-responsive mt-3">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>Keterangan</th>
                          <th>Nominal</th>
                          <th>Status</th>
                          <th class="text-center" v-if="session.getUser?.role !== 'Pengguna'">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(tagihan, index) in detail.Invoice"
                          :key="index"
                        >
                          <td>{{ tagihan.keterangan }}</td>
                          <td>
                            {{
                              new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                              }).format(tagihan.total_pembayaran)
                            }}
                          </td>
                          <td>
                            <span
                              class="badge bg-info rounded-pill font-size-12"
                              v-if="tagihan.status === 'belum_dibayar'"
                            >
                              Belum Dibayar
                            </span>
                            <span
                              class="badge bg-success rounded-pill font-size-12"
                              v-else
                            >
                              Lunas
                            </span>
                          </td>
                          <td class="text-center">
                            <button
                              v-if="
                                tagihan.keterangan?.includes(
                                  session.getUser?.role
                                )
                              "
                              class="btn btn-sm btn-blue me-2"
                              @click="
                                invoiceId = tagihan.id;
                                inputNominal = tagihan.total_pembayaran;
                                keterangan = tagihan.keterangan;
                              "
                              data-bs-target="#modal-tagihan"
                              data-bs-toggle="modal"
                            >
                              <i class="bx bx-pencil"></i>
                            </button>
                            <button
                              v-if="
                                tagihan.keterangan?.includes(
                                  session.getUser?.role
                                )
                              "
                              class="btn btn-sm btn-red"
                              @click="deleteInvoice(tagihan.id)"
                            >
                              <i class="bx bx-trash"></i>
                            </button>
                            <button
                              class="btn btn-sm btn-blue ms-2"
                              @click="bayarInvoice(tagihan.id)"
                              v-if="
                                tagihan.status === 'belum_dibayar' && session.getUser?.role === 'Administrator'"
                            >
                              <i class="bx bx-credit-card"></i> Bayar
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <Modal
                    modal-class=""
                    modal-id="modal-tolak-pengajuan"
                    title="Tolak Pengajuan"
                  >
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="alasan" class="form-label"
                          >Alasan Tolak:</label
                        >
                        <textarea
                          class="form-control"
                          id="alasan"
                          rows="5"
                          v-model="alasanTolak"
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <button
                          type="button"
                          class="btn btn-red w-100"
                          @click="tolakPengajuan"
                          data-bs-dismiss="modal"
                        >
                          <i class="bx bx-x me-2"></i>Tolak Pengajuan
                        </button>
                      </div>
                    </div>
                  </Modal>
                  <Modal
                    modal-class=""
                    modal-id="modal-setujui-pengajuan"
                    title="Setujui Pengajuan"
                  >
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="alasan" class="form-label"
                          >Persetujuan:</label
                        >
                        <select
                          class="form-select"
                          id="persetujuan"
                          v-model="statusPersetujuan"
                        >
                          <option value="" disabled>Pilih Persetujuan</option>
                          <option value="diterima_untuk_ditinjau">
                            Diterima untuk ditinjau
                          </option>
                          <option value="revisi">Revisi</option>
                          <option value="diterbitkan">Diterbitkan</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <button
                          type="button"
                          class="btn btn-blue w-100"
                          @click="savePersetujuan"
                          data-bs-dismiss="modal"
                        >
                          <i class="bx bx-check me-2"></i>Setujui Pengajuan
                        </button>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div
                  class="mt-4"
                  v-if="
                    session.getUser?.role === 'Administrator' &&
                    detail.PengajuanBuku[0].status_pengajuan === 'diproses'
                  "
                >
                  <!-- Persetujuan Publish -->
                  <div class="d-flex gap-2">
                    <button
                      type="button"
                      class="btn btn-red w-50"
                      data-bs-target="#modal-tolak-pengajuan"
                      data-bs-toggle="modal"
                    >
                      <i class="bx bx-x me-2"></i>Tolak
                    </button>
                    <button
                      type="button"
                      class="btn btn-blue w-50"
                      data-bs-target="#modal-setujui-pengajuan"
                      data-bs-toggle="modal"
                    >
                      <i class="bx bx-check me-2"></i>Setujui
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <!-- end card body -->
          </div>
          <!-- end card -->
        </div>
        <div class="col-lg-3">
          <div class="row">
            <div class="card">
              <div class="card-body">
                <div class="search-box">
                  <h5 class="mb-3">
                    <i class="bx bx-edit-alt me-2"></i>Tipe Identifikasi
                  </h5>
                  <!-- detail.tipe_identifikasi -->
                  <span
                    class="badge bg-info rounded-pill font-size-12"
                    v-if="detail.tipe_identifikasi === 'hanya_publish'"
                    >Publish Website</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-12"
                    v-if="detail.tipe_identifikasi === 'hanya_cetak'"
                    >Hanya Cetak</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-12"
                    v-if="detail.tipe_identifikasi === 'ISBN'"
                    >Pengajuan ISBN</span
                  >
                  <span
                    class="badge bg-info rounded-pill font-size-12"
                    v-if="detail.tipe_identifikasi === 'QRCBN'"
                    >QRCBN</span
                  >
                </div>
                <div class="mt-3">
                  <h5 class="mb-3">
                    <i class="bx bx-pencil me-2"></i>Tipe Kepenulisan
                  </h5>
                  <span
                    class="badge bg-success rounded-pill font-size-12"
                    v-if="detail.tipe_kepenulisan === 'naskah_pribadi'"
                    >Naskah Pribadi</span
                  >
                  <span
                    class="badge bg-success rounded-pill font-size-12"
                    v-if="detail.tipe_kepenulisan === 'lebih_dari_satu'"
                    >Lebih dari 1 Penulis</span
                  >
                  <span
                    class="badge bg-success rounded-pill font-size-12"
                    v-if="detail.tipe_kepenulisan === 'naskah_komunitas'"
                    >Naskah Komunitas</span
                  >
                </div>
                <div class="mt-3">
                  <h5 class="mb-3">
                    <i class="bx bx-time me-2"></i>
                    Monitoring Pengajuan
                  </h5>
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'diproses'
                    "
                    class="badge bg-info text-white font-size-12 rounded-pill mb-3"
                    >Diproses</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'ditolak'
                    "
                    class="badge bg-danger text-white font-size-12 rounded-pill mb-3"
                    >Ditolak</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan ===
                      'diterima_untuk_ditinjau'
                    "
                    class="badge bg-blue text-white font-size-12 rounded-pill mb-3"
                    >Diterima untuk Ditinjau</span
                  >
                  <span
                    v-if="detail.PengajuanBuku[0].status_pengajuan === 'revisi'"
                    class="badge bg-warning text-white font-size-12 rounded-pill mb-3"
                    >Direvisi</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan ===
                      'proses_cetak'
                    "
                    class="badge bg-info text-white font-size-12 rounded-pill mb-3"
                    >Proses Cetak</span
                  >
                  <span
                    v-if="
                      detail.PengajuanBuku[0].status_pengajuan === 'diterbitkan'
                    "
                    class="badge bg-success text-white font-size-12 rounded-pill mb-3"
                    >Diterbitkan</span
                  >
                  <ul class="list-unstyled">
                    <li>
                      {{ formatedDate(detail.tanggal_pengajuan) }} - Naskah di
                      Ajukan
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_ditolak">
                      {{
                        formatedDate(detail.PengajuanBuku[0].tanggal_ditolak)
                      }}
                      - Naskah di Tolak
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_diterima">
                      {{
                        formatedDate(detail.PengajuanBuku[0].tanggal_diterima)
                      }}
                      - Naskah di Terima untuk di Tinjau
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_revisi">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_revisi) }}
                      - Naskah di Direvisi
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_cetak">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_cetak) }}
                      - Naskah dalam Proses Cetak
                    </li>
                    <li v-if="detail.PengajuanBuku[0].tanggal_terbit">
                      {{ formatedDate(detail.PengajuanBuku[0].tanggal_terbit) }}
                      - Naskah diterbitkan
                    </li>
                  </ul>
                  <h5 class="mb-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                    <i class="bx bx-grid-alt me-2"></i>Status Pengajuan ISBN
                  </h5>
                  <span
                    class="badge bg-warning rounded-pill font-size-12"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'proses'
                    "
                  >
                    Proses
                  </span>
                  <span
                    class="badge bg-success rounded-pill font-size-12"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'permohonan_revisi'
                    "
                  >
                    Permohonan Revisi
                  </span>
                  <span
                    class="badge bg-danger rounded-pill font-size-12"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'ditolak'
                    "
                  >
                    Ditolak
                  </span>
                  <span
                    class="badge bg-info rounded-pill font-size-12"
                    v-if="
                      detail.PengajuanISBN.length > 0 &&
                      detail.PengajuanISBN[0].status === 'isbn_diterbitkan'
                    "
                  >
                    Diterima
                  </span>
                  <h5 class="my-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                    <i class="bx bx-barcode me-2"></i>ISBN
                  </h5>
                  <span>
                    {{ detail.isbn === null ? "Belum ada ISBN" : detail.isbn }}
                  </span>
                </div>
                <hr />
                <div
                  class="mt-3"
                  v-if="
                    session.getUser?.role === 'Administrator' &&
                    detail.PengajuanBuku[0].status_pengajuan ===
                      'diterima_untuk_ditinjau'
                  "
                >
                  <div class="mb-3" v-show="!detail.editor">
                    <label for="editor" class="form-label">Editor: </label>
                    <select
                      class="form-select"
                      id="editor"
                      v-model="detailEditor"
                    >
                      <option value="">Pilih Editor</option>
                      <option
                        v-for="editor in detail.editor_person"
                        :key="editor.id"
                        :value="editor.id"
                      >
                        {{ editor.nama }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3" v-show="!detail.layouter">
                    <label for="layouter" class="form-label">Layouter: </label>
                    <select
                      class="form-select"
                      id="layouter"
                      v-model="detailLayouter"
                    >
                      <option value="">Pilih Layouter</option>
                      <option
                        v-for="layouter in detail.layouter_person"
                        :key="layouter.id"
                        :value="layouter.id"
                      >
                        {{ layouter.nama }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3" v-show="!detail.desainer">
                    <label for="desainer" class="form-label">Desainer: </label>
                    <select
                      class="form-select"
                      id="desainer"
                      v-model="detailDesainer"
                    >
                      <option value="">Pilih Desainer</option>
                      <option
                        v-for="desainer in detail.desainer_person"
                        :key="desainer.id"
                        :value="desainer.id"
                      >
                        {{ desainer.nama }}
                      </option>
                    </select>
                  </div>
                  <div class="mb-3" v-show="!detail.proofreader">
                    <label for="proofreader" class="form-label"
                      >Proofreader:
                    </label>
                    <select
                      class="form-select"
                      id="proofreader"
                      v-model="detailProofreader"
                    >
                      <option value="">Pilih Proofreader</option>
                      <option
                        v-for="proofreader in detail.proofreader_person"
                        :key="proofreader.id"
                        :value="proofreader.id"
                      >
                        {{ proofreader.nama }}
                      </option>
                    </select>
                  </div>
                  <div
                    class="mb-3"
                    v-if="
                      !detail.editor ||
                      !detail.layouter ||
                      !detail.desainer ||
                      !detail.proofreader
                    "
                  >
                    <button
                      type="button"
                      class="btn btn-blue w-100"
                      @click="saveEditor"
                    >
                      <i class="bx bx-save me-2"></i>SIMPAN
                    </button>
                  </div>
                  <div class="mb-3" v-else>
                    <button
                      type="button"
                      class="btn btn-blue w-100"
                      data-bs-toggle="modal"
                      data-bs-target="#modal-editor"
                      v-if="
                        (!detail.editor?.includes('external-') ||
                          !detail.layouter?.includes('external-') ||
                          !detail.desainer?.includes('external-') ||
                          !detail.proofreader?.includes('external-')) &&
                        detail.PengajuanBuku[0].status_pengajuan ===
                          'diterima_untuk_ditinjau'
                      "
                    >
                      <i class="bx bx-pencil me-2"></i>UBAH
                    </button>
                    <Modal
                      modal-class=""
                      modal-id="modal-editor"
                      title="Set Editor Buku"
                    >
                      <div class="modal-body">
                        <div class="row">
                          <div class="col-12">
                            <div class="mb-3">
                              <label for="editor" class="form-label"
                                >Editor</label
                              >
                              <select
                                class="form-select"
                                id="editor"
                                v-model="detailEditor"
                              >
                                <option value="">Pilih Editor</option>
                                <option
                                  v-for="editor in detail.editor_person"
                                  :key="editor.id"
                                  :value="editor.id"
                                >
                                  {{ editor.nama }}
                                </option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label for="layouter" class="form-label"
                                >Layouter</label
                              >
                              <select
                                class="form-select"
                                id="layouter"
                                v-model="detailLayouter"
                              >
                                <option value="">Pilih Layouter</option>
                                <option
                                  v-for="layouter in detail.layouter_person"
                                  :key="layouter.id"
                                  :value="layouter.id"
                                >
                                  {{ layouter.nama }}
                                </option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label for="desainer" class="form-label"
                                >Desainer</label
                              >
                              <select
                                class="form-select"
                                id="desainer"
                                v-model="detailDesainer"
                              >
                                <option value="">Pilih Desainer</option>
                                <option
                                  v-for="desainer in detail.desainer_person"
                                  :key="desainer.id"
                                  :value="desainer.id"
                                >
                                  {{ desainer.nama }}
                                </option>
                              </select>
                            </div>
                            <div class="mb-3">
                              <label for="proofreader" class="form-label"
                                >Proofreader</label
                              >
                              <select
                                class="form-select"
                                id="proofreader"
                                v-model="detailProofreader"
                              >
                                <option value="">Pilih Proofreader</option>
                                <option
                                  v-for="proofreader in detail.proofreader_person"
                                  :key="proofreader.id"
                                  :value="proofreader.id"
                                >
                                  {{ proofreader.nama }}
                                </option>
                              </select>
                            </div>
                            <div class="mb-">
                              <button
                                type="button"
                                class="btn btn-blue w-100"
                                @click="saveEditor"
                              >
                                <i class="bx bx-save me-2"></i>SIMPAN
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                </div>
                <div
                  class="mt-3"
                  v-if="
                    detail.editor ||
                    detail.layouter ||
                    detail.desainer ||
                    detail.proofreader
                  "
                >
                  <h5 class="mb-3">
                    <i class="bx bx-user me-2"></i>List Editor:
                  </h5>
                  <ul class="list-unstyled">
                    <li v-if="detail.editor">
                      {{
                        detail.editor?.includes("external-")
                          ? detail.editor.split("-")[1]
                          : detail.editor_person.find(
                              (editor: any) => editor.id == detail.editor
                            )?.nama
                      }}
                      - Editor
                    </li>
                    <li v-if="detail.layouter">
                      {{
                        detail.layouter?.includes("external-")
                          ? detail.layouter.split("-")[1]
                          : detail.layouter_person.find(
                              (layouter: any) => layouter.id == detail.layouter
                            )?.nama
                      }}
                      - Layouter
                    </li>
                    <li v-if="detail.desainer">
                      {{
                        detail.desainer?.includes("external-")
                          ? detail.desainer.split("-")[1]
                          : detail.desainer_person.find(
                              (desainer: any) => desainer.id == detail.desainer
                            )?.nama
                      }}
                      - Desainer
                    </li>
                    <li v-if="detail.proofreader">
                      {{
                        detail.proofreader?.includes("external-")
                          ? detail.proofreader.split("-")[1]
                          : detail.proofreader_person.find(
                              (proofreader: any) =>
                                proofreader.id == detail.proofreader
                            )?.nama
                      }}
                      - Proofreader
                    </li>
                    <li v-if="!detail.editor">
                      <span class="text-muted">Belum ada Editor</span>
                    </li>
                    <li v-if="!detail.layouter">
                      <span class="text-muted">Belum ada Layouter</span>
                    </li>
                    <li v-if="!detail.desainer">
                      <span class="text-muted">Belum ada Desainer</span>
                    </li>
                    <li v-if="!detail.proofreader">
                      <span class="text-muted">Belum ada Proofreader</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-3" v-if="detail.Invoice.length > 0">
                  <h5 class="mb-3">
                    <i class="bx bx-credit-card"></i> Informasi Tagihan:
                  </h5>

                  <div v-for="(tagihan, index) in detail.Invoice" :key="index">
                    <div
                      class="d-flex justify-content-between align-items-center mb-0"
                    >
                      <p class="text-muted mb-0">{{ tagihan.keterangan }}</p>
                      <p class="text-muted mb-0">
                        {{
                          new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                            .format(tagihan.total_pembayaran)
                            .slice(0, -3)
                        }}
                      </p>
                    </div>
                    <hr />
                  </div>
                  <h5 class="text-end">
                    Total:
                    {{
                      new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                        .format(
                          detail.Invoice.reduce(
                            (acc: any, curr: any) =>
                              acc + curr.total_pembayaran,
                            0
                          )
                        )
                        .slice(0, -3)
                    }}
                  </h5>
                </div>
                <h5><i class="bx bx-info-circle"></i>Informasi Buku</h5>
                <div class="mt-3">
                  <label for="status_pengajuan" class="form-label"
                    >Status Pengajuan:
                  </label>
                  <select
                    class="form-select"
                    id="status_pengajuan"
                    v-model="statusPersetujuan"
                  >
                    <option value="" disabled>Pilih Status Pengajuan</option>
                    <option value="revisi">Revisi</option>
                    <option value="proses_cetak">Proses Cetak</option>
                    <option value="diterbitkan">Diterbitkan</option>
                  </select>
                </div>
                <div class="mt-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                  <label for="status_isbn" class="form-label">
                    Status Pengajuan ISBN:
                  </label>
                  <select
                    class="form-select"
                    id="status_isbn"
                    v-model="statusPengajuanISBN"
                    v-if="detail.tipe_identifikasi === 'ISBN'"
                  >
                    <option value="" disabled>Pilih Status Pengajuan ISBN</option>
                    <option value="proses">Proses</option>
                    <option value="permohonan_revisi">Permohonan Revisi</option>
                    <option value="ditolak">Ditolak</option>
                    <option value="isbn_diterbitkan">Diterima</option>
                  </select>
                </div>
                <div class="mt-3">
                  <label for="ukuran" class="form-label">Ukuran: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="ukuran"
                    v-model="detail.ukuran"
                  />
                </div>
                <div class="mt-3">
                  <label for="jumlah_halaman" class="form-label"
                    >Jumlah Halaman:
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="jumlah_halaman"
                    v-model="detail.jumlah_halaman"
                  />
                </div>
                <div class="mt-3">
                  <label for="harga" class="form-label">Harga: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="harga"
                    v-model="detail.harga"
                  />
                </div>
                <div class="mt-3" v-if="detail.tipe_identifikasi === 'ISBN'">
                  <label for="isbn" class="form-label">ISBN: </label>
                  <input
                    type="text"
                    class="form-control"
                    id="isbn"
                    v-model="detail.isbn"
                  />
                </div>
                <div class="mt-3">
                  <button
                    type="button"
                    class="btn btn-blue w-100"
                    @click="saveInformasi"
                  >
                    <i class="bx bx-save me-2"></i>SIMPAN
                  </button>
                </div>
              </div>
            </div>
            <!-- end card -->
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <!-- spinner -->
      <div
        class="d-flex justify-content-center align-items-center"
        style="height: 50vh"
      >
        <div class="spinner-border m-auto" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </template>
  </TheParent>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import TheParent from "../components/TheParent.vue";
import useApi from "../composables/api";
import { decrypt } from "../helpers/crypto";
import {
  convertToNumber,
  disableLoader,
  enableLoader,
  formatedDate,
  toIDR,
} from "../helpers/event";
import { useRoute } from "vue-router";
import Notify from "../helpers/notify";
import { useSession } from "../stores/session";
import Sweet from "../helpers/sweetalert2";
import Modal from "../components/Modal.vue";

const detail = ref<any>({});
const {
  getResource,
  putResource,
  postResourceFormData,
  baseUrl,
  deleteResource,
  postResource,
} = useApi();

const route = useRoute();
const loadData = async () => {
  const id = route.params.id;
  const response = await getResource(
    "/pengajuan/buku/" + decrypt(id.toString())
  );
  detail.value = response.data;
};

const detailEditor = ref<string>("");
const detailLayouter = ref<string>("");
const detailDesainer = ref<string>("");
const detailProofreader = ref<string>("");

const saveEditor = async () => {
  const data: any = {};
  if (detailEditor.value) {
    data.editor = detailEditor.value.toString();
  }
  if (detailLayouter.value) {
    data.layouter = detailLayouter.value.toString();
  }
  if (detailDesainer.value) {
    data.desainer = detailDesainer.value.toString();
  }
  if (detailProofreader.value) {
    data.proofreader = detailProofreader.value.toString();
  }
  const response = await putResource(
    "/pengajuan/buku/" + detail.value.id,
    data
  );
  if (response.data) {
    Notify.success("Berhasil menyimpan data editor");
    await loadData();
  }
};

const uploadClick = (e: any) => {
  const fileNaskah = document.getElementById("file-naskah-buku");
  fileNaskah?.click();
};

const session = useSession();

const getNaskah = async (e: any) => {
  const file = e.target.files[0];
  const data = {
    buku_id: detail.value.id,
    file_naskah: file,
    keterangan:
      detail.value.PengajuanBuku[0].pengguna_id === session.getUser?.id
        ? "Naskah Pengguna"
        : "",
  };
  const response = await postResourceFormData("/pengajuan/file-naskah", data);
  if (response.data) {
    Notify.success("Berhasil mengupload naskah");
    await loadData();
  }
};

const deleteFile = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus file naskah?", async () => {
    const response = await deleteResource(`/pengajuan/file-naskah/${id}`);
    if (response.data) {
      Notify.success("Berhasil menghapus file naskah");
      await loadData();
    }
  });
};

const alasanTolak = ref<string>("");
const tolakPengajuan = async () => {
  if (!alasanTolak.value) {
    Notify.error("Alasan tolak tidak boleh kosong");
    return;
  }
  const response = await putResource("/pengajuan/" + detail.value.id, {
    status_pengajuan: "ditolak",
    alasan_penolakan: alasanTolak.value,
    tanggal_ditolak: new Date().toISOString(),
  });
  alasanTolak.value = "";
  if (response.data) {
    Notify.success("Berhasil menolak pengajuan");
    await loadData();
  }
};

const statusPersetujuan = ref<string>("");
const savePersetujuan = async () => {
  if (!statusPersetujuan.value) {
    Notify.error("Persetujuan tidak boleh kosong");
    return;
  }
  const response = await putResource("/pengajuan/" + detail.value.id, {
    status_pengajuan: statusPersetujuan.value,
  });
  if (response.data) {
    Notify.success("Berhasil menyimpan persetujuan");
    await loadData();
  }
};

const statusPengajuanISBN = ref<string>("");

const saveInformasi = async () => {
  const data = {
    ukuran: detail.value.ukuran,
    jumlah_halaman: detail.value.jumlah_halaman,
    harga: detail.value.harga,
    isbn: detail.value.isbn,
  };
  if (statusPersetujuan.value !== "") {
    const dataStatus: any = {
      status_pengajuan: statusPersetujuan.value,
      tanggal_revisi: new Date().toISOString(),
    };
    if (statusPersetujuan.value === "proses_cetak") {
      dataStatus.tanggal_cetak = new Date().toISOString();
    }
    if (statusPersetujuan.value === "revisi") {
      dataStatus.tanggal_revisi = new Date().toISOString();
    }
    if (statusPersetujuan.value === "diterbitkan") {
      dataStatus.tanggal_terbit = new Date().toISOString();
    }
    await putResource("/pengajuan/" + detail.value.id, dataStatus);
  }
  if(statusPengajuanISBN.value !== ""){
    await putResource("/pengajuan/isbn/" + detail.value.PengajuanISBN[0].id, {
      status: statusPengajuanISBN.value,
    });
  }
  const response = await putResource(
    "/pengajuan/buku/" + detail.value.id,
    data
  );
  if (response.data) {
    Notify.success("Berhasil menyimpan informasi buku");
    await loadData();
  }
};

const keterangan = ref<string>("");
const nominal = ref<string>("");

const inputNominal = computed({
  get: () => nominal.value,
  set: (value: any) => {
    nominal.value = toIDR(value);
  },
});

const invoiceId = ref<string>("");

const saveInvoice = async () => {
  const data = {
    total_pembayaran: convertToNumber(nominal.value),
    keterangan: session.getUser?.role + " - " + keterangan.value,
    buku_id: detail.value.id,
    pengguna_id: Number(detail.value.PengajuanBuku[0].pengguna_id),
  };
  let response: any;
  if (invoiceId.value !== "") {
    response = await putResource(`/pengajuan/invoice/${invoiceId.value}`, data);
  } else {
    response = await postResource("/pengajuan/invoice", data);
  }
  if (response.data) {
    Notify.success(response.message);
    await loadData();
  }
};

const deleteInvoice = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin menghapus tagihan?", async () => {
    const response = await deleteResource(`/pengajuan/invoice/${id}`);
    if (response.data) {
      Notify.success("Berhasil menghapus tagihan");
      await loadData();
    }
  });
};

const bayarInvoice = async (id: string) => {
  Sweet.confirm("Apakah anda yakin ingin membayar tagihan?", async () => {
    const response = await putResource(`/pengajuan/invoice/${id}`, {
      status: "sudah_dibayar",
    });
    if (response.data) {
      Notify.success("Berhasil membayar tagihan");
      await loadData();
    }
  });
};

onMounted(async () => {
  enableLoader();
  await loadData();
  disableLoader();
});
</script>

<style scoped>
.jumbotron {
  height: 30vh;
  width: 80vw;
}
</style>
