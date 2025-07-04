<script setup lang="ts">
import { useAdmissionStore } from "~/store/admission";

const isOpen = ref(false);
const schools = ref<School[]>([]);
const searchText = ref("");
const blurTimeout = ref<NodeJS.Timeout | null>(null);

const handleBlur = () => {
  blurTimeout.value = setTimeout(() => {
    isOpen.value = false;
  }, 150);
};

const handleFocus = () => {
  if (blurTimeout.value) {
    clearTimeout(blurTimeout.value);
  }
  isOpen.value = true;
};

const filteredSchools = computed(() => {
  if (!searchText.value.trim()) {
    return schools.value;
  }

  const searchLower = searchText.value.toLowerCase();
  return schools.value.filter(
    (school) =>
      school.name.toLowerCase().includes(searchLower) ||
      school.city.toLowerCase().includes(searchLower)
  );
});

onMounted(async () => {
  const response = await useSchool().index();

  if (response?.status === "success") {
    schools.value = response.data;
  } else {
    console.error(response?.message);
  }
});

const handleAdmission = (school: School) => {
  useAdmissionStore().updateAdmission({
    school: {
      name: school.name,
      city: school.city,
      type: school.type,
    },
  });
  navigateTo(`/admission/${school.id}`);
};
</script>

<template>
  <div>
    <h1
      class="mx-auto mb-6 mt-8 max-w-3xl text-center text-[32px] font-bold leading-[40px] tracking-[-0.64px] text-second-color md:mb-8 md:mt-0 md:text-[40px] md:leading-[48px] md:tracking-[-0.8px]"
    >
      Réponds à quelques questions pour voir tes chances d'admission
    </h1>
  </div>
  <div class="mx-auto max-w-[560px]">
    <div
      class="transition-max-width h-full items-center overflow-hidden transition-all duration-300 ease-in-out rounded-full bg-white p-1 focus-within:border-black"
    >
      <input
        v-model="searchText"
        type="text"
        class="w-full bg-transparent outline-none rounded-full px-4 py-2 pl-5"
        placeholder="Trouve et sélectionne ton lycée..."
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </div>
    <div
      class="relative z-50 max-h-[400px] overflow-y-auto rounded-xl border border-gray-200 bg-white p-4 pt-0 shadow-md mt-4"
      v-if="isOpen"
    >
      <p class="text-sm text-gray-500 sticky top-0 left-0 bg-white p-4 pl-0">
        {{ filteredSchools.length }} Lycées disponibles
      </p>
      <div class="flex flex-col gap-2">
        <button
          v-for="school in filteredSchools"
          :key="school.id"
          class="text-left cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-text-input focus:bg-text-input focus:outline-none py-3"
          @click="handleAdmission(school)"
        >
          <p class="text-sm font-bold">{{ school.name }}</p>
          <p class="text-xs text-gray-500">{{ school.city }}</p>
        </button>
      </div>
    </div>
  </div>
</template>
