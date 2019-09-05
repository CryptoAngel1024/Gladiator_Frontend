<template>
  <section class="flex flex-col items-center my-auto w-full min-w-81">
    <header class="font-medium text-2xl">Log In to Gladiator</header>

    <button
      class="flex items-center justify-center p-2 mt-16 bg-gray-820"
      @click="redirect"
    >
      <SvgIcon class="w-5" name="helmet" width="20" height="20" />
      <h1 class="font-medium text-sm px-2 text-gray-40">|</h1>
      <h1 class="font-medium text-sm text-white">Log in with PingID</h1>
    </button>

    <router-link
      to="support"
      class="font-semibold text-sm text-gray-500 mt-4 mx-auto"
    >
      Contact Admin
    </router-link>
  </section>
</template>
<script>
import { redirect } from '../../api/pingIdAuth'

export default {
  setup() {
    return {
      redirect,
    }
  },
}
</script>
