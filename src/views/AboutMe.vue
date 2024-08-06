<template>
  <TheParent>
    <div class="row">
    <div class="col-12">
      <div class="mb-3">
        <label for="" class="col-form-label d-none">
          Deskripsi
        </label>
        <CKEditor @input="getInput" :value="aboutMe"/>
      </div>
      <div class="mb-3 text-center">
        <button class="btn btn-blue" @click="saveData">
          <i class="bx bx-save"></i> Simpan
        </button>
      </div>
    </div>
  </div>
  </TheParent>
</template> 

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import CKEditor from '../components/CKEditor.vue';
import TheParent from '../components/TheParent.vue';
import useApi from '../composables/api';

const aboutMe = ref<string>('');

const getInput = (value: string) => {
  aboutMe.value = value;
};

const { getResource, postResource } = useApi();

const loadData = async () => {
 const response = await getResource('/about-me');
  aboutMe.value = response.data.content;
};

const saveData = async () => {
  await postResource('/about-me', { content: aboutMe.value });
};

onMounted(async () => {
  await loadData();
});




</script>