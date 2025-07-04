import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdmissionStore = defineStore("admission", () => {
  const admission = ref<Admission | null>(null);

  const updateAdmission = (updates: Partial<Admission>) => {
    if (!admission.value) {
      admission.value = {} as Admission;
    }
    admission.value = { ...admission.value, ...updates };
  };

  const resetAdmission = () => {
    admission.value = null;
  };

  return {
    admission,
    updateAdmission,
    resetAdmission,
  };
});

type Admission = {
  school: {
    name: string;
    city: string;
    type: string;
  };
  classes: {
    name: string;
    bac: string;
  };
  average: {
    rating: number;
    ranking: number;
  };
  bac: {
    rating: number;
  };
};
