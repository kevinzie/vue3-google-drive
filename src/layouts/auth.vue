<template>
  <v-app class="auth-bg">
    <v-container class="fill-height d-flex align-center justify-center">
      <v-card class="card-login pa-4" width="400">
        <router-view />
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
.auth-bg {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.auth-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/assets/image/bg-1.jpg") no-repeat center center;
  background-size: cover;
  filter: blur(20px); /* Apply Blur Effect */
  z-index: -1;
}
.card-login {
  border-radius: 2rem !important;
  backdrop-filter: blur(10px); /* Blurred effect inside card */
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 0, 0, 0.3);
}
</style>
