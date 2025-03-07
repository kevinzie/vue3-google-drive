<template>
  <v-card-item>
    <div class="text-center">
      <div
        class="text-overline mb-1"
        v-text="heading.appName"
      />
      <div
        class="text-h6 mb-1"
        v-text="heading.title"
      />
      <div
        class="text-caption"
        v-text="heading.description"
      />
    </div>
  </v-card-item>
  <v-card-text>
    <v-form @submit.prevent="handleLogin">
      <v-text-field
        v-model="username"
        label="Username"
      />
      <v-text-field
        v-model="password"
        label="Password"
        type="password"
      />
      <v-btn
        color="primary"
        size="large"
        class="mt-2"
        type="submit"
        block
      >
        Login
      </v-btn>
    </v-form>
  </v-card-text>
</template>
<script setup lang="ts">
import {useAuthStore} from "@/stores/auth";

const authStore = useAuthStore();
const router = useRouter();
const username = defineModel<string>('username', { default: ''});
const password = defineModel<string>('password', { default: ''});
const errorMessage = ref('');
const heading = {
  title: 'Welcome Back',
  appName: 'File Manager',
  description: 'Please log in to access your account and manage your dashboard'
}

;

const handleLogin = async () => {
  console.log(username.value)
  const response = await authStore.login({ username: username.value, password: password.value });

  if (response.success) {
    console.log(response)
    router.push('/'); // Redirect after login
  } else {
    errorMessage.value = response.message;
  }
};


</script>
