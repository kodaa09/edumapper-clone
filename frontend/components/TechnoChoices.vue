<script setup lang="ts">
import { useAdmissionStore } from "~/store/admission.js";

const props = defineProps({
  cardOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const choices = [
  {
    name: "STI2D",
    value: "sti2d",
  },
  {
    name: "STL",
    value: "stl",
  },
  {
    name: "STMG",
    value: "stmg",
  },
];

const admissionStore = useAdmissionStore();
const selectedChoices = ref("");

const onSubmit = () => {
  admissionStore.updateAdmission({
    bac: {
      type: selectedChoices.value,
    },
  });
  emit("close");
};
</script>

<template>
  <div class="mt-4" v-if="props.cardOpen">
    <p class="text-sm">Sélectionne ton type de bac</p>
    <p class="mb-2 text-xs text-gray-500">
      Choisis ton type de bac technologique.
    </p>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-wrap gap-2 mb-4">
        <label
          class="rounded-full p-2 text-base transition-colors cursor-pointer text-center bg-[#F7F3F0] w-5/12 sm:w-4/12 border border-[#F7F3F0]"
          :class="{
            'border border-black': selectedChoices.includes(choice.value),
          }"
          v-for="choice in choices"
          :key="choice.value"
        >
          <input
            class="hidden"
            type="radio"
            :value="choice.value"
            v-model="selectedChoices"
          />
          {{ choice.name }}
        </label>
      </div>
      <button
        class="button relative inline-flex items-center justify-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-200 text-base px-4 py-2 rounded-full border border-[#1E1C25] text-[#1E1C25] bg-transparent hover:bg-transparent active:bg-transparent h-[46px] w-full transition-opacity hover:opacity-75 cursor-pointer"
        type="submit"
        :disabled="selectedChoices === ''"
      >
        Confirmer
      </button>
    </form>
  </div>
  <div v-else>
    <p class="text-sm text-gray-500" v-if="selectedChoices !== ''">
      {{ selectedChoices.toUpperCase() }}
    </p>
    <p class="text-sm text-gray-500" v-else>Non renseigné</p>
  </div>
</template>
