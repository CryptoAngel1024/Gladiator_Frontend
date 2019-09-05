<template>
  <router-link
    :to="{ name: 'dashboard' }"
    class="h-16 border-b flex items-center justify-center space-x-3 min-w-64"
  >
    <SvgIcon class="w-5" name="helmet" />
    <h1 class="font-medium text-sm">+</h1>
    <img class="w-32" src="@/assets/logo/logo_rgb.png" alt="logo" />
  </router-link>
</template>
