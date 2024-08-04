<template>
  <div class="card-body">
    <div class="d-flex align-items-center mb-4">
      <div class="flex-shrink-0 me-3">
        <img
          class="rounded-circle avatar-sm"
          src="/assets/images/users/avatar-2.jpg"
          alt="Generic placeholder image"
        />
      </div>
      <div class="flex-grow-1">
        <h5 class="font-size-14 mb-0">Ubaidi</h5>
        <small class="text-muted">ubaidi@unira.ac.id</small>
      </div>
      <div class="ms-auto flex-shrink-0">
        <button class="btn btn-red me-2">
          <i class="bx bx-x me-1"></i> Batalkan Pengajuan
        </button>
        <button class="btn btn-info-2 me-2">
          <i class="bx bx-pencil me-1"></i> Edit
        </button>
        <button type="button" class="btn btn-secondary" @click="$emit('close', false)">
          <i class="bx bx-arrow-back me-1"></i> Kembali
        </button>
      </div>
    </div>

    <h4 class="font-size-16 mb-0">Algoritma Pemrograman Dasar</h4>
    <p class="text-muted mb-0">2021-08-01</p>
    <div class="d-flex gap-1">
      <span class="badge bg-info">Buku Fiksi</span>
      <span class="badge bg-primary">Anak Anak</span>
      <span class="badge bg-success">Pendidikan</span>
    </div>
    <p class="mt-3">
      Algoritma Pemrograman Dasar adalah mata kuliah yang membahas tentang
      dasar-dasar pemrograman. Mata kuliah ini wajib diikuti oleh mahasiswa
      semester 1. Namun sering kali mahasiswa semester 1 tidak memahami materi
      yang diajarkan. Oleh karena itu, saya membuat buku ini agar mahasiswa
      semester 1 dapat memahami materi yang diajarkan.
    </p>
    <hr />
    <div class="row">
      <div class="col-xl-2 col-6">
        <div class="card">
          <img
            class="card-img-top img-fluid"
            src="/assets/images/small/img-3.jpg"
            alt="Card image cap"
          />
          <div class="py-2 text-center">
            <a
              download="img-3.jpg"
              href="/assets/images/small/img-3.jpg"
              class="fw-medium"
              >Download</a
            >
          </div>
        </div>
      </div>
      <div class="col-xl-2 col-6">
        <div class="card">
          <img
            class="card-img-top img-fluid"
            src="/assets/images/small/img-4.jpg"
            alt="Card image cap"
          />
          <div class="py-2 text-center">
            <a
              download="img-4.jpg"
              href="/assets/images/small/img-4.jpg"
              class="fw-medium"
              >Download</a
            >
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class="row justify-content-center">
      <div class="col-12">
        <div class="mt-5">
          <h5 class="font-size-15">
            <i class="bx bx-message-dots text-muted align-middle me-1"></i>
            Comments :
          </h5>

          <div>
            <div class="d-flex py-3">
              <div class="flex-shrink-0 me-3">
                <div class="avatar-xs">
                  <div
                    class="avatar-title rounded-circle bg-light text-primary"
                  >
                    <i class="bx bxs-user"></i>
                  </div>
                </div>
              </div>
              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">
                  Delores Williams
                  <small class="text-muted float-end">1 hr Ago</small>
                </h5>
                <p class="text-muted">
                  If several languages coalesce, the grammar of the resulting
                  language is more simple and regular than that of the
                  individual
                </p>
                <div>
                  <a href="javascript: void(0);" class="text-success"
                    ><i class="mdi mdi-reply"></i> Reply</a
                  >
                </div>
              </div>
            </div>
            <div class="d-flex py-3 border-top">
              <div class="flex-shrink-0 me-3">
                <div class="avatar-xs">
                  <img
                    src="/assets/images/users/avatar-2.jpg"
                    alt=""
                    class="img-fluid d-block rounded-circle"
                  />
                </div>
              </div>

              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">
                  Clarence Smith
                  <small class="text-muted float-end">2 hrs Ago</small>
                </h5>
                <p class="text-muted">
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit
                  amet
                </p>
                <div>
                  <a href="javascript: void(0);" class="text-success"
                    ><i class="mdi mdi-reply"></i> Reply</a
                  >
                </div>

                <div class="d-flex pt-3">
                  <div class="flex-shrink-0 me-3">
                    <div class="avatar-xs">
                      <div
                        class="avatar-title rounded-circle bg-light text-primary"
                      >
                        <i class="bx bxs-user"></i>
                      </div>
                    </div>
                  </div>

                  <div class="flex-grow-1">
                    <h5 class="font-size-14 mb-1">
                      Silvia Martinez
                      <small class="text-muted float-end">2 hrs Ago</small>
                    </h5>
                    <p class="text-muted">
                      To take a trivial example, which of us ever undertakes
                      laborious physical exercise
                    </p>
                    <div>
                      <a href="javascript: void(0);" class="text-success"
                        ><i class="mdi mdi-reply"></i> Reply</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="d-flex py-3 border-top">
              <div class="flex-shrink-0 me-3">
                <div class="avatar-xs">
                  <div
                    class="avatar-title rounded-circle bg-light text-primary"
                  >
                    <i class="bx bxs-user"></i>
                  </div>
                </div>
              </div>

              <div class="flex-grow-1">
                <h5 class="font-size-14 mb-1">
                  Keith McCoy
                  <small class="text-muted float-end">12 Aug</small>
                </h5>
                <p class="text-muted">
                  Donec posuere vulputate arcu. phasellus accumsan cursus velit
                </p>
                <div>
                  <a href="javascript: void(0);" class="text-success"
                    ><i class="mdi mdi-reply"></i> Reply</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <a href="javascript: void(0);" class="btn btn-secondary waves-effect mt-4"
      ><i class="mdi mdi-reply me-1"></i> Reply</a
    >
  </div>
</template>
