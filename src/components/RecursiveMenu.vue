<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface MenuItem {
  id: string;
  name: string;
  subFolders?: MenuItem[]; // Nested children
}

const router = useRouter();
const props = defineProps<{ items: MenuItem[] }>();

const navigate = (event: Event, id: string) => {
  event.stopPropagation(); // Prevents the expand action from triggering navigation
  router.push(`/dir/${id}`);
};
</script>

<template>
  <template v-for="item in items" :key="item.id">
    <v-list-group v-if="item.subFolders && item.subFolders.length">
      <template v-slot:activator="{ props }">
        <!-- Prevent navigation when clicking expand icon -->
        <v-list-item v-bind="props">
          <v-list-item-title @click="navigate($event, item.id)">
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <!-- Recursively render child folders -->
      <RecursiveMenu :items="item.subFolders" />
    </v-list-group>

    <!-- Items without subfolders -->
    <v-list-item v-else @click="navigate($event, item.id)">
      <v-list-item-title>{{ item.name }}</v-list-item-title>
    </v-list-item>
  </template>
</template>
