<script setup lang="ts">
import {ref, defineProps} from 'vue';

const expanded = ref(false);

const props = defineProps<{
  file: {
    name: string;
    extension: string;
  };
  isLoading: boolean;
}>();

const renameFile = () => {
  console.log(`Renaming file: ${props.file.name}`);
};

const deleteFile = () => {
  console.log(`Deleting file: ${props.file.name}`);
};
</script>

<template>
  <div v-if="isLoading">
    <v-skeleton-loader type="card" />
  </div>
  <v-card
    v-else
    class="file-card"
    rounded
    theme="outlined"
    elevation="0"
  >
    <!-- Card Header with Title & Menu -->
    <v-card-title class="text-sm-body-2 p-0 text-truncate d-flex text-truncate align-center justify-space-between">
      <span class="flex text-truncate text-grey-darken-2 text-sm-body-2">{{ file.name }}</span>

      <div class="d-flex align-center">
        <!-- Menu -->
        <v-menu outlined>
          <template #activator="{ props }">
            <v-btn
              icon
              size="xsmall"
              variant="text"
              v-bind="props"
              :style="{ padding: '5px' }"
            >
              <v-icon color="#ccc">
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-list
            density="compact"
            elevation="0"
            :style="{ background: '#ffffff90', backdropFilter: 'blur(10px)', border: '1px solid #dddddd' }"
          >
            <v-list-item @click="renameFile">
              <v-list-item-title :style="{fontSize: '13px', fontWeight: '500', color: '#3c3c3c'}">
                Download
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="deleteFile">
              <v-list-item-title :style="{fontSize: '13px', fontWeight: '500', color: '#3c3c3c'}">
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card-title>

    <!-- File Preview -->
    <v-card-item
      :style="{
        backgroundColor: '#eee',
        height: '200px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }"
    >
      <FileIcon :filename="file.extension" />
    </v-card-item>
  </v-card>
</template>

<style scoped>
.file-card {
  transition: background-color .2s;
}

.file-card:hover {
  background-color: #2196f3 !important;
  color: white !important;
}

.file-card:hover .v-card-title > span:first-child {
  background-color: #2196f3 !important;
  color: white !important;
}
</style>
