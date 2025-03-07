<template>
  <v-container>
    <FileList folder-id=""/>
  </v-container>
</template>

<script setup lang="ts">
import {useFileStore} from "@/stores/file";
const fileStore = useFileStore();

const fetchFileList = async (): Promise<void> => {
  await fileStore.getFilesByFolderId({folderId: ""} );
}

onMounted(() => {
  fetchFileList()
})
</script>
