<template>
  <v-icon :class="iconColor" size="32">
    {{ fileIcon }}
  </v-icon>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  filename: string;
}

const props = defineProps<Props>();

// Define file extensions and corresponding Vuetify Material Design Icons
const fileIcons: Record<string, string> = {
  pdf: "mdi-file-pdf-box",
  doc: "mdi-file-word-box",
  docx: "mdi-file-word-box",
  xls: "mdi-file-excel-box",
  xlsx: "mdi-file-excel-box",
  ppt: "mdi-file-powerpoint-box",
  pptx: "mdi-file-powerpoint-box",
  zip: "mdi-folder-zip",
  rar: "mdi-folder-zip",
  jpg: "mdi-file-image",
  jpeg: "mdi-file-image",
  png: "mdi-file-image",
  gif: "mdi-file-image",
  mp4: "mdi-file-video",
  mov: "mdi-file-video",
  avi: "mdi-file-video",
  mp3: "mdi-file-music",
  wav: "mdi-file-music",
  txt: "mdi-file-document-outline",
  json: "mdi-code-json",
  html: "mdi-language-html5",
  css: "mdi-language-css3",
  js: "mdi-nodejs",
  ts: "mdi-language-typescript",
  vue: "mdi-vuejs",
  default: "mdi-file-outline",
};

// Compute the correct icon based on the file extension
const fileIcon = computed(() => {
  const ext = props.filename.split(".").pop()?.toLowerCase() || "";
  return fileIcons[ext] || fileIcons.default;
});

// Define colors based on file type
const iconColors: Record<string, string> = {
  pdf: "text-red",
  doc: "text-blue",
  docx: "text-blue",
  xls: "text-green",
  xlsx: "text-green",
  ppt: "text-orange",
  pptx: "text-orange",
  zip: "text-brown",
  rar: "text-brown",
  jpg: "text-deep-orange",
  jpeg: "text-deep-orange",
  png: "text-deep-orange",
  gif: "text-deep-orange",
  mp4: "text-purple",
  mov: "text-purple",
  avi: "text-purple",
  mp3: "text-blue",
  wav: "text-blue",
  txt: "text-grey",
  json: "text-green",
  html: "text-orange",
  css: "text-blue",
  js: "text-yellow",
  ts: "text-blue",
  vue: "text-green",
  default: "text-grey",
};

// Compute color based on file type
const iconColor = computed(() => {
  const ext = props.filename.split(".").pop()?.toLowerCase() || "";
  return iconColors[ext] || iconColors.default;
});
</script>

<style scoped>
.text-red {
  color: #f44336;
}
.text-blue {
  color: #2196f3;
}
.text-green {
  color: #4caf50;
}
.text-orange {
  color: #ff9800;
}
.text-brown {
  color: #795548;
}
.text-deep-orange {
  color: #ff5722;
}
.text-purple {
  color: #9c27b0;
}
.text-grey {
  color: #757575;
}
.text-yellow {
  color: #ffeb3b;
}
</style>
