<script setup>
import { useAdmissionStore } from "~/store/admission";

const admissionStore = useAdmissionStore();

definePageMeta({
  middleware: "auth",
});

onMounted(() => {
  if (!admissionStore.admission) {
    const admission = localStorage.getItem("admission");
    if (admission) {
      admissionStore.admission = JSON.parse(admission);
    } else {
      navigateTo("/");
    }
  }
});

const capitalizeFirstLetter = (str) => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div class="max-w-xl mx-auto">
    <div class="bg-white p-4 rounded-lg">
      <h1 class="font-bold mb-6">Ton profil étudiant</h1>
      <div class="mb-6">
        <p class="text-sm font-bold mb-2">
          <span class="text-gray-500 font-normal">Lycée</span>
          {{ capitalizeFirstLetter(admissionStore?.admission?.school?.name) }}
        </p>
        <p class="text-sm font-bold mb-2">
          <span class="text-gray-500 font-normal">Ville</span>
          {{ capitalizeFirstLetter(admissionStore?.admission?.school?.city) }}
        </p>
        <p class="text-sm font-bold">
          <span class="text-gray-500 font-normal">Type</span>
          {{ capitalizeFirstLetter(admissionStore?.admission?.school?.type) }}
        </p>
      </div>
      <div>
        <p class="text-sm font-bold mb-2">
          <span class="text-gray-500 font-normal">Bac</span>
          {{ capitalizeFirstLetter(admissionStore?.admission?.classes?.bac) }}
        </p>
        <p class="text-sm font-bold mb-6">
          <span class="text-gray-500 font-normal">Classe</span>
          {{ capitalizeFirstLetter(admissionStore?.admission?.classes?.name) }}
        </p>
      </div>
      <div
        v-if="admissionStore?.admission?.specialities"
        class="text-sm font-bold mt-6"
      >
        <p class="text-md mb-2">Spécialités</p>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="speciality in admissionStore?.admission?.specialities"
            :key="speciality"
          >
            <p
              class="flex items-center justify-center gap-1 rounded-full border bg-white-medium p-2 text-sm font-medium leading-none transition-colors"
            >
              {{ capitalizeFirstLetter(speciality) }}
            </p>
          </div>
        </div>
      </div>
      <p
        v-if="admissionStore?.admission?.bac?.type"
        class="text-sm font-bold mb-2 mt-6"
      >
        <span class="text-gray-500 font-normal">Bac</span>
        {{ admissionStore?.admission?.bac?.type.toUpperCase() }}
      </p>
    </div>
  </div>
</template>
