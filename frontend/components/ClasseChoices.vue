<script setup>
import { useForm } from "vee-validate";
import { useAdmissionStore } from "~/store/admission";

const props = defineProps({
  cardOpen: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const { handleSubmit } = useForm();
const admissionStore = useAdmissionStore();
const classValue = ref("seconde");
const bacValue = ref("general");

onMounted(() => {
  setClasses();
});

const onSubmit = handleSubmit(() => {
  setClasses();
  emit("close");
});

const setClasses = () => {
  admissionStore.updateAdmission({
    classes: {
      name: classValue.value,
      bac: bacValue.value,
    },
  });

  admissionStore.deleteBac();
  admissionStore.deleteSpecialities();
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
</script>

<template>
  <div>
    <form class="mt-6" @submit="onSubmit" v-if="props.cardOpen">
      <div class="button-box flex gap-3 flex-wrap sm:flex-nowrap">
        <label
          for="seconde"
          :class="[
            'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
            classValue === 'seconde'
              ? 'bg-[#F7F3F0] border-0'
              : 'bg-white-medium',
          ]"
        >
          <input
            class="hidden"
            type="radio"
            id="seconde"
            name="class"
            value="seconde"
            v-model="classValue"
          />
          Seconde
        </label>
        <label
          for="premiere"
          :class="[
            'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
            classValue === 'premiere'
              ? 'bg-[#F7F3F0] border-0'
              : 'bg-white-medium',
          ]"
        >
          <input
            class="hidden"
            type="radio"
            id="premiere"
            name="class"
            value="premiere"
            v-model="classValue"
          />
          Première
        </label>
        <label
          for="terminale"
          :class="[
            'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
            classValue === 'terminale'
              ? 'bg-[#F7F3F0] border-0'
              : 'bg-white-medium',
          ]"
        >
          <input
            class="hidden"
            type="radio"
            id="terminale"
            name="class"
            value="terminale"
            v-model="classValue"
          />
          Terminale
        </label>
      </div>
      <hr data-v-5468dd47="" class="my-6 border-[#E7E8F0]" />
      <div class="mb-6">
        <h2 class="text-sm font-bold mb-6">Type de bac</h2>
        <div>
          <div class="button-box flex gap-3 flex-wrap sm:flex-nowrap">
            <label
              for="general"
              :class="[
                'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
                bacValue === 'general'
                  ? 'bg-[#F7F3F0] border-0'
                  : 'bg-white-medium',
              ]"
            >
              <input
                class="hidden"
                type="radio"
                id="general"
                name="bac"
                value="general"
                v-model="bacValue"
              />
              Général
            </label>
            <label
              for="technologique"
              :class="[
                'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
                bacValue === 'technologique'
                  ? 'bg-[#F7F3F0] border-0'
                  : 'bg-white-medium',
              ]"
            >
              <input
                class="hidden"
                type="radio"
                id="technologique"
                name="bac"
                value="technologique"
                v-model="bacValue"
              />
              Technologique
            </label>
            <label
              for="professionnel"
              :class="[
                'rounded-full p-2 text-base transition-colors sm:px-6 w-5/12 sm:w-4/12 border border-black cursor-pointer text-center',
                bacValue === 'professionnel'
                  ? 'bg-[#F7F3F0] border-0'
                  : 'bg-white-medium',
              ]"
            >
              <input
                class="hidden"
                type="radio"
                id="professionnel"
                name="bac"
                value="professionnel"
                v-model="bacValue"
              />
              Professionnel
            </label>
          </div>
        </div>
      </div>
      <button
        type="submit"
        class="button relative inline-flex items-center justify-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-200 text-base px-4 py-2 rounded-full border border-[#1E1C25] text-[#1E1C25] bg-transparent hover:bg-transparent active:bg-transparent h-[46px] w-full transition-opacity hover:opacity-75 cursor-pointer"
      >
        Confirmer
      </button>
    </form>
    <div v-else>
      <p
        class="text-sm text-gray-500"
        v-if="admissionStore?.admission?.classes"
      >
        En {{ capitalizeFirstLetter(admissionStore?.admission?.classes?.name) }}
        -
        {{ capitalizeFirstLetter(admissionStore?.admission?.classes?.bac) }}
      </p>
      <p class="text-sm text-gray-500" v-else>Aucune classe sélectionnée</p>
    </div>
  </div>
</template>
