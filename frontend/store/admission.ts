import { defineStore } from "pinia";
import { ref } from "vue";

export const useAdmissionStore = defineStore("admission", () => {
  const admission = ref<Admission | null>(null);

  const updateAdmission = (updates: Partial<Admission>) => {
    if (!admission.value) {
      admission.value = {} as Admission;
    }
    admission.value = { ...admission.value, ...updates };
    localStorage.setItem("admission", JSON.stringify(admission.value));
  };

  const resetAdmission = () => {
    admission.value = null;
    localStorage.removeItem("admission");
  };

  const deleteBac = () => {
    if (admission.value) {
      const { bac, specialities, ...rest } = admission.value;
      admission.value = { ...rest } as Admission;
      localStorage.setItem("admission", JSON.stringify(admission.value));
    }
  };

  const deleteSpecialities = () => {
    if (admission.value) {
      const { specialities, ...rest } = admission.value;
      admission.value = { ...rest } as Admission;
      localStorage.setItem("admission", JSON.stringify(admission.value));
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
