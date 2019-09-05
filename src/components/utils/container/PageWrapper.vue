<template>
  <div class="flex flex-col px-10 py-4 space-y-5">
    <h1 class="text-header-jnj" data-test="page-wrapper-header">
      {{ title }}
    </h1>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
  },
}
</script>
