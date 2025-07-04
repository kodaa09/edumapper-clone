<script setup lang="ts">
import { useAdmissionStore } from "~/store/admission";
import { useSchool } from "~/composables/school";

const route = useRoute();

onMounted(async () => {
  if (!useAdmissionStore().admission?.school) {
    const response = await useSchool().show(Number(route.params.id));

    if (response?.status === "success" && response.data) {
      useAdmissionStore().updateAdmission({
        school: response.data,
      });
    }
  }
});

const onUpdateSchool = () => {
  navigateTo("/");
  useAdmissionStore().resetAdmission();
};
</script>

<template>
  <div
    class="mx-auto mb-4 mt-10 flex w-full max-w-[560px] flex-col items-start rounded-3xl bg-white p-6 text-second-color md:mt-0"
  >
    <div v-if="useAdmissionStore().admission?.school">
      <h1 class="text-xl font-bold">
        {{ useAdmissionStore().admission?.school?.name }}
      </h1>
      <div class="flex w-full flex-row flex-wrap gap-2">
        <p class="mt-2 text-sm leading-[16px]">
          {{ useAdmissionStore().admission?.school?.city }}
        </p>
        <p class="mt-2 text-sm leading-[16px]">
          {{
            useAdmissionStore().admission?.school?.type === "public"
              ? "Public"
              : "Privé"
          }}
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
    <div v-else>
      <Icon name="mdi:loading" class="animate-spin" />
    </div>
  </div>
</template>
