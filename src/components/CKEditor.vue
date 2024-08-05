<script lang="ts">
declare const ClassicEditor: any;
</script>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, shallowRef } from "vue";

const editorElement = ref<HTMLElement | null>(null);
const editorInstance = shallowRef<any>(null);
const editorContent = ref("");
const emits = defineEmits(["input"]);
const props = defineProps({
  value: {
    type: String,
    default: ""
  }
});

onMounted(async () => {
  if (editorElement.value) {
    try {
      const editor = await ClassicEditor.create(editorElement.value, {
        plugins: ClassicEditor.builtinPlugins,
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'outdent',
          'indent',
          '|',
          'blockQuote',
          'insertTable',
          'undo',
          'redo'
        ],
        language: 'id',
        // Konfigurasi untuk selalu menggunakan Markdown
        removePlugins: ['htmlwriter'],
        outputFormat: { output: 'markdown' }
      });
      
      editorInstance.value = editor;

      if (props.value) {
        editor.setData(props.value);
      }

      editor.model.document.on("change:data", () => {
        editorContent.value = editor.getData();
        emits("input", editorContent.value);
      });
    } catch (error) {
      console.error("Error initializing CKEditor:", error);
    }
  }
});



onBeforeUnmount(() => {
  if (editorInstance.value) {
    editorInstance.value.destroy();
  }
});
</script>

<template>
  <div ref="editorElement"></div>
</template>
