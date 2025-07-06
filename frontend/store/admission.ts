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

  const deleteBac = () => {
    if (admission.value) {
      const { bac, specialities, ...rest } = admission.value;
      admission.value = { ...rest } as Admission;
    }
  };

  const deleteSpecialities = () => {
    if (admission.value) {
      const { specialities, ...rest } = admission.value;
      admission.value = { ...rest } as Admission;
    }
  };

  return {
    admission,
    updateAdmission,
    resetAdmission,
    deleteBac,
    deleteSpecialities,
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
  bac: {
    type: string;
  };
  specialities: string[];
};
