<template>
  <div class="mx-auto max-w-md">
    <h1 class="mb-7 text-left text-2xl font-bold">Connecte-toi à ton compte</h1>
    <div class="mb-6 space-y-4 rounded-3xl bg-white p-4">
      <h2 class="mb-0 font-bold">J'ai déjà un compte</h2>
      <p class="mt-0 text-sm text-gray-700">Connecte-toi pour continuer</p>
      <Login />
      <div class="relative py-2">
        <div class="absolute inset-0 flex items-center" aria-hidden="true">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="bg-white px-2 text-gray-500">Ou</span>
        </div>
      </div>
      <Signin />
    </div>
  </div>
</template>
