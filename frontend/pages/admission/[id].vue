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
    {{ admissionStore?.admission }}
  </div>
</template>
