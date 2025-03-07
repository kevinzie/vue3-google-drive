<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script lang="ts" setup>
  //
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();
  authStore.checkAuth();
</script>
