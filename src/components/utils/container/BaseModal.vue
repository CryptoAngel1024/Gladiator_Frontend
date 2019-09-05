<template>
  <div
    class="fixed z-20 inset-0 overflow-y-auto"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
  >
    <div class="flex items-center justify-center min-h-screen">
      <div class="fixed inset-0 transition-opacity" aria-hidden="true">
        <div class="absolute inset-0 bg-gray-500 opacity-75" />
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="inline-block bg-white text-left shadow transform transition-all my-8 align-middle rounded-2xl w-1/6 min-w-min"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="postcss" scoped>
.modal-btn {
  @apply opacity-50 px-6 py-2 rounded-md sm:w-auto text-base sm:text-sm font-medium;
}
input {
  @apply mb-2;
}
</style>
