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
    name: "Arts",
    value: "arts",
  },
  {
    name: "Biologie-écologie",
    value: "biologie-ecologie",
  },
  {
    name: "HGGSP",
    value: "hggsp",
  },
  {
    name: "HLP",
    value: "hlp",
  },
  {
    name: "LCA",
    value: "lca",
  },
];

const admissionStore = useAdmissionStore();
const selectedChoices = ref<string[]>([]);
const canSelectMore = computed(() => selectedChoices.value.length < 2);

const toggleChoice = (value: string) => {
  const index = selectedChoices.value.indexOf(value);
  if (index > -1) {
    selectedChoices.value.splice(index, 1);
  } else if (canSelectMore.value) {
    selectedChoices.value.push(value);
  }
};

const onSubmit = () => {
  admissionStore.updateAdmission({
    specialities: selectedChoices.value,
  });
  emit("close");
};
</script>

<template>
  <div class="mt-4" v-if="props.cardOpen">
    <p class="text-md">Spécialités de terminale</p>
    <p class="mb-2 text-xs text-gray-500">
      Choisis 2 spécialités. Pour en désélectionner une, clique dessus.
    </p>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-wrap gap-2 mb-4">
        <label
          class="rounded-full p-2 text-base transition-colors cursor-pointer text-center bg-[#F7F3F0] w-5/12 sm:w-4/12 border border-[#F7F3F0]"
          :class="{
            'border border-black bg-white': selectedChoices.includes(
              choice.value
            ),
          }"
          v-for="choice in choices"
          :key="choice.value"
        >
          <input
            class="hidden"
            type="checkbox"
            :value="choice.value"
            :checked="selectedChoices.includes(choice.value)"
            @click="toggleChoice(choice.value)"
          />
          {{ choice.name }}
        </label>
      </div>
      <button
        class="button relative inline-flex items-center justify-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-200 text-base px-4 py-2 rounded-full border border-[#1E1C25] text-[#1E1C25] bg-transparent hover:bg-transparent active:bg-transparent h-[46px] w-full transition-opacity hover:opacity-75 cursor-pointer"
        type="submit"
        :disabled="selectedChoices.length !== 2"
      >
        Confirmer
      </button>
    </form>
  </div>
  <div v-else>
    <p class="text-sm text-gray-500" v-if="selectedChoices.length > 0">
      Spécialités :
      {{
        selectedChoices
          .map(
            (choiceValue) =>
              choices.find((c) => c.value === choiceValue)?.name || choiceValue
          )
          .join(", ")
      }}
    </p>
    <p class="text-sm text-gray-500" v-else>Aucune spécialité sélectionnée</p>
  </div>
</template>
