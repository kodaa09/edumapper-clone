<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
const isLoading = ref(false);
const errorMessage = ref("");
const endpoint = useRuntimeConfig().public.apiBase;

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      fullName: z
        .string({ required_error: "Le nom complet est obligatoire" })
        .min(3, { message: "Le nom complet est obligatoire" }),
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

const [fullName, fullNameAttrs] = defineField("fullName");
const [email, emailAttrs] = defineField("email");
const [password, passwordAttrs] = defineField("password");

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  const { status, error } = await useFetch(`${endpoint}/auth/signup`, {
    method: "POST",
    body: {
      ...values,
    },
    credentials: "include",
  });

  isLoading.value = false;

  if (status.value === "success") {
    await authStore.authenticate(values);
    resetForm();
    navigateTo("/");
  } else {
    console.log(error.value);
    errorMessage.value = error.value?.data.message;
  }
});

const resetForm = () => {
  fullName.value = "";
  email.value = "";
  password.value = "";
};
</script>

<template>
  <form>
    <div class="flex flex-col gap-2 mb-4">
      <label for="email">Nom complet</label>
      <input
        class="w-full rounded-full border-text-input bg-text-input py-2 pl-5 pr-4 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        placeholder="John Doe"
        type="text"
        v-model="fullName"
        v-bind="fullNameAttrs"
      />
      <p class="text-red-500">{{ errors.fullName }}</p>
    </div>
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
      class="w-full rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700"
    >
      Inscrivez-vous
    </button>
  </form>
</template>
