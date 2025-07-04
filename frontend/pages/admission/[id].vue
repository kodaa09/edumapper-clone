<script setup>
import { useAdmissionStore } from "~/store/admission";
const isClassesOpen = ref(true);

const title = computed(() => {
  if (useAdmissionStore().admission?.classes?.bac === "technologique") {
    return "Sélectionne ton type de bac";
  }
  return "Sélectionne tes spécialités";
});

const onSubmit = () => {
  console.log("submit");
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
      <ClassForm @close="isClassesOpen = false" :card-open="isClassesOpen" />
    </Card>
    <Card
      :title="title"
      :title-open="title"
      v-if="useAdmissionStore().admission?.classes?.bac !== 'professionnel'"
    >
      <div v-if="useAdmissionStore().admission?.classes?.bac === 'general'">
        <p>Spécialités de terminale</p>
        <p>Choisis 2 spécialités. Pour en désélectionner une, clique dessus.</p>
        <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
          <p>Arts</p>
          <p>Sciences</p>
          <p>Sciences Economiques et Sociales</p>
          <button type="submit">Confirmer</button>
        </form>
      </div>
      <div v-else>
        <p>Sélectionne tes spécialités zz</p>
      </div>
    </Card>
  </div>
</template>
