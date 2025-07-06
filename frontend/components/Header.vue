<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <div class="px-10 py-3 flex justify-between items-center">
    <div class="flex items-center gap-4">
      <h1 class="p-6 px-5">
        <NuxtLink to="/">
          <NuxtImg
            class="object-contain w-[146px]"
            src="/logo.png"
            alt="logo"
          />
        </NuxtLink>
      </h1>
    </div>
    <div v-if="!authStore.user">
      <NuxtLink
        to="/auth"
        class="bg-primary text-black border rounded-full border-gray-300 px-6 py-3 text-md hover:brightness-90 transition-colors duration-200"
      >
        Connexion
      </NuxtLink>
    </div>
    <div class="flex items-center gap-4" v-else>
      <p>
        {{ authStore.user?.fullName }}
      </p>
      <button
        class="bg-primary text-md text-black border rounded-full border-gray-300 px-6 py-3 hover:brightness-90 transition-colors duration-200 cursor-pointer"
        @click="authStore.logout"
      >
        Déconnexion
      </button>
    </div>
  </div>
</template>
