<script lang="ts">
declare const ClassicEditor: any;
</script>
<script setup lang="ts">
import { onMounted } from "vue";

onMounted(() => {
  ClassicEditor.create(document.querySelector("#ckeditor")).then((editor: any) => {
    editor.setData("Hello, World!");
  });
});
</script>

<template>
  <div id="ckeditor"></div>
</template>
