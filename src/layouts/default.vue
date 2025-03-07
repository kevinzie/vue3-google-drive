<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>My Dashboard</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <RecursiveMenu :items="fileStore.folderListMenu"/>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import {useFileStore} from "@/stores/file";

const drawer = ref(true);
const authStore = useAuthStore();
const fileStore = useFileStore();
const router = useRouter();
onMounted(() => {
  fileStore.getFolder({folderId: "", isMenu: true})
})

const logout = () => {
  authStore.logout();
  router.push('/auth/login'); // Redirect to login after logout
};
</script>
