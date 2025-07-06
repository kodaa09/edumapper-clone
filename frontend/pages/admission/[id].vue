<script setup>
import ClasseChoices from "~/components/ClasseChoices.vue";
import { useAdmissionStore } from "~/store/admission";

const admissionStore = useAdmissionStore();
const isClassesOpen = ref(true);
const isGeneralChoicesOpen = ref(true);
const isTechnoChoicesOpen = ref(true);

const title = computed(() => {
  if (admissionStore?.admission?.classes?.bac === "technologique") {
    return "Sélectionne ton type de bac";
  }
  return "Sélectionne tes spécialités";
});

const showResult = () => {
  navigateTo("/admission/result");
};
</script>

<template>
  <div class="mx-auto max-w-[560px]">
    <SchoolResume />
    <Card
      title="Ta classe"
      title-open="En quelles classes es-tu ?"
      :is-open="isClassesOpen"
      @update:isOpen="isClassesOpen = $event"
    >
      <ClasseChoices
        @close="isClassesOpen = false"
        :card-open="isClassesOpen"
      />
    </Card>
    <Card
      :title="title"
      :title-open="title"
      :is-open="
        admissionStore?.admission?.classes?.bac === 'general'
          ? isGeneralChoicesOpen
          : isTechnoChoicesOpen
      "
      @update:isOpen="
        admissionStore?.admission?.classes?.bac === 'general'
          ? (isGeneralChoicesOpen = $event)
          : (isTechnoChoicesOpen = $event)
      "
      v-if="admissionStore?.admission?.classes?.bac !== 'professionnel'"
    >
      <GeneralChoices
        v-if="admissionStore?.admission?.classes?.bac === 'general'"
        @close="isGeneralChoicesOpen = false"
        :card-open="isGeneralChoicesOpen"
      />
      <TechnoChoices
        v-else
        @close="isTechnoChoicesOpen = false"
        :card-open="isTechnoChoicesOpen"
      />
    </Card>
    <button
      class="button relative inline-flex items-center justify-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-200 text-base px-4 py-2 rounded-full border border-black bg-black text-white h-[46px] w-full cursor-pointer"
      @click="showResult"
      v-if="
        admissionStore?.admission?.bac?.type ||
        admissionStore?.admission?.specialities ||
        admissionStore?.admission?.classes?.bac === 'professionnel'
      "
    >
      Afficher le resultat
    </button>
  </div>
</template>
