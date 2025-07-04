<script setup>
const isClassesOpen = ref(true);
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
  </div>
</template>
