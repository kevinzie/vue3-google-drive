<script setup lang="ts">
import { useRoute } from 'vue-router';
import {useFileStore} from "@/stores/file";

const route = useRoute();
const fileStore = useFileStore();
const folderId = ref('');

const fetchFileList = async (id: string): Promise<void> => {
  await fileStore.getFilesByFolderId({ folderId: id, isMenu: false } );
}

const fetchFolder = async (id: string) => {
  await fileStore.getFolder({ folderId: id, isMenu: false})
}
onMounted(() => {
  folderId.value = route.params.id;
  fetchFolder(folderId.value)
  fetchFileList(folderId.value)

})
watch(() => route.params, (val) => {
  folderId.value = val?.id;
  fetchFolder(folderId.value)
  fetchFileList(folderId.value)
})
</script>
<template>
  <v-container>
    <FileList :folder-id="folderId" />
  </v-container>
</template>

