<script setup lang="ts">
import { useAdmissionStore } from "~/store/admission";

const admissionSchool = useAdmissionStore().admission?.school;

const onUpdateSchool = () => {
  navigateTo("/");
  useAdmissionStore().resetAdmission();
};
</script>

<template>
  <div
    class="mx-auto mb-4 mt-10 flex w-full max-w-[560px] flex-col items-start rounded-3xl bg-white p-6 text-second-color md:mt-0"
  >
    <h1 class="text-xl font-bold">{{ admissionSchool?.name }}</h1>
    <div class="flex w-full flex-row flex-wrap gap-2">
      <p class="mt-2 text-sm leading-[16px]">{{ admissionSchool?.city }}</p>
      <p class="mt-2 text-sm leading-[16px]">
        {{ admissionSchool?.type === "public" ? "Public" : "Privé" }}
      </p>
    </div>
    <div class="mt-6 flex items-center"></div>
    <button
      class="button relative inline-flex items-center justify-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 text-sm px-4 py-2 rounded-full border border-[#1E1C25] text-[#1E1C25] bg-transparent hover:bg-transparent active:bg-transparent cursor-pointer"
      @click="onUpdateSchool"
    >
      Modifier
    </button>
  </div>
</template>
