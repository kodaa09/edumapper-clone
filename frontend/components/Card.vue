<script setup lang="ts">
const props = defineProps<{
  title: string;
  titleOpen?: string;
  isOpen?: boolean;
}>();

const emit = defineEmits<{
  "update:isOpen": [value: boolean];
}>();

const isOpen = computed(() => props.isOpen ?? true);

const toggleOpen = () => {
  emit("update:isOpen", !props.isOpen);
};
</script>

<template>
  <div class="mb-4 cursor-pointer rounded-2xl bg-white p-6">
    <div class="flex justify-between items-center">
      <h1>{{ isOpen ? titleOpen : title }}</h1>
      <button @click="toggleOpen" class="cursor-pointer">
        <Icon v-if="!isOpen" name="mdi:pencil" class="w-6 h-6" />
        <Icon v-else name="mdi:close" class="w-6 h-6" />
      </button>
    </div>
    <slot />
  </div>
</template>
