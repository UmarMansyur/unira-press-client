<script lang="ts">
declare const ClassicEditor: any;
</script>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, shallowRef, watch } from "vue";
import UploadAdapter from "../helpers/UploadAdapter";

function CustomUploadAdapterPlugin(editor: any) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
    return new UploadAdapter(loader);
  };
}

const editorElement = ref<HTMLElement | null>(null);
const editorInstance = shallowRef<any>(null);
const editorContent = ref("");
const emits = defineEmits(["input"]);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

 watch(
  () => props.value,
  (newValue) => {
    if (newValue !== editorContent.value) {
      editorContent.value = newValue;
      editorInstance.value.setData(newValue);
    }
  }
);

const datas = ref<any>({});


onMounted(async () => {
  if (editorElement.value) {
    try {
      datas.value = props.value;
      const editor = await ClassicEditor.create(editorElement.value, {
        extraPlugins: [CustomUploadAdapterPlugin],
      });

      editorInstance.value = editor;

      if (props.value) {
        editor.setData(datas.value);
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
