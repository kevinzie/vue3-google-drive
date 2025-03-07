/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { routes } from 'vue-router/auto-routes'
import {useAuthStore} from "@/stores/auth";
const customRoutes = routes.map(route => {
  if (route.path.startsWith('/auth')) {
    return { ...route, meta: { layout: 'auth' } };
  } else if (route.path.startsWith('/')) {
    return { ...route, meta: { layout: 'default', requiresAuth: true } }; // ✅ Protect dashboard
  }
  return { ...route, meta: { layout: 'default' } };
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(customRoutes)
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  authStore.checkAuth(); // Ensure authentication state is loaded

  console.log(to.meta.requiresAuth, "requires auth")
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login'); // 🚀 Redirect if not logged in
  } else if (to.path === '/auth/login' && authStore.isAuthenticated) {
    next('/'); // 🚀 Redirect logged-in users away from login page
  } else {
    next(); // ✅ Allow navigation
  }
});
// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
