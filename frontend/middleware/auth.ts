import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const me = await authStore.me();

  if (!me) {
    if (to.path === "/admission/result") {
      sessionStorage.setItem("redirectAfterLogin", "/admission/result");
    }
    return navigateTo("/auth");
  }
});
