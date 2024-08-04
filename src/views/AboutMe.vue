<template>
  <TheParent>
    <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <label for="" class="col-form-label d-none">
          Deskripsi
        </label>
        <CKEditor/>
      </div>
    </div>
  </div>
  </TheParent>
</template> 

<script setup lang="ts">
import CKEditor from '../components/CKEditor.vue';
import TheParent from '../components/TheParent.vue';
</script>