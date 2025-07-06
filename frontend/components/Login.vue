<script setup lang="ts">
import { z } from "zod";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      email: z
        .string({ required_error: "L'email est obligatoire" })
        .email("Email invalide"),
      password: z
        .string({ required_error: "Le mot de passe est obligatoire" })
        .min(4, {
          message: "Le mot de passe doit contenir au moins 4 caractères",
        }),
    })
  ),
});
const isLoading = ref(false);

const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    await authStore.authenticate(values);
    const redirect = sessionStorage.getItem("redirectAfterLogin");
    if (redirect) {
      navigateTo(redirect);
      sessionStorage.removeItem("redirectAfterLogin");
    } else {
      navigateTo("/");
    }
  } catch (error) {
    console.log(error);
  }

  isLoading.value = false;
});
</script>
<template>
  <form>
    <div class="flex flex-col gap-2 mb-4">
      <label for="email">Email</label>
      <input
        class="w-full rounded-full border-text-input bg-text-input py-2 pl-5 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder="demo@demo.com"
        type="email"
        v-model="email"
        v-bind="emailAttrs"
      />
      <p class="text-red-500">{{ errors.email }}</p>
    </div>
    <div class="flex flex-col gap-2 mb-4">
      <label for="password">Mot de passe</label>
      <input
        class="w-full rounded-full border-text-input bg-text-input py-2 pl-5 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder="********"
        type="password"
        v-model="password"
        v-bind="passwordAttrs"
      />
      <p class="text-red-500">{{ errors.password }}</p>
    </div>
    <button
      type="submit"
      @click="onSubmit"
      class="w-full rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 cursor-pointer"
    >
      <Icon name="mdi:loading" v-if="isLoading" />
      Connexion
    </button>
  </form>
</template>
