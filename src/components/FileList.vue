<template>
  <v-container fluid>
    <!-- Header & Search -->
    <v-row class="align-center mb-4">
      <v-col
        cols="12"
        class="text-center"
      >
        <h2>Welcome to Drive</h2>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search in Drive"
          prepend-inner-icon="mdi-magnify"
          solo
          rounded
        />
      </v-col>
    </v-row>
    <!-- File List/Grid -->
    <v-row v-if="isGridView">
      <v-col
        v-for="file in files"
        :key="file.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <FileGrid
          :is-loading="isLoading"
          :file="{name: file?.name, extension: file?.extension }"
        />
      </v-col>
    </v-row>

    <v-table v-else>
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="file in files"
          :key="file.id"
        >
          <td>
            <v-icon>mdi-file</v-icon>
          </td>
          <td>{{ file.name }}</td>
          <td>{{ file.createdAt }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useFileStore} from "@/stores/file";

interface Props {
  folderId: string;
}

const props = defineProps<Props>();

const fileStore = useFileStore();


const isLoading = ref(false);
const search = ref('');
const files = ref(fileStore.fileList ?? []);
const isGridView = ref(true);

watch(() => fileStore.fileList, async (newVal) => {
  files.value = newVal;
}, {deep: true})

watch(() => fileStore.isLoading, async (newVal) => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = newVal;
  }, 2000)
})
</script>

<style lang="css" scoped>
.file-card {
  border-radius: 10px;
  border: 1px solid #eee;
}
</style>
