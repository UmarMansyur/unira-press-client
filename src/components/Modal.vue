<template>
  <div
    :id="props.modalId"
    class="modal fade"
    :class="props.modalClass"
    tabindex="-1"
    aria-labelledby="myModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ props.title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <slot></slot>
      </div>
      <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modalId: string;
  modalClass: string;
  title: string;
}>();
</script>