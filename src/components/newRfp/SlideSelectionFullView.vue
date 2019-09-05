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
        class="transform text-left my-8 align-middle rounded-2xl w-3/5 min-w-min transition-all flex flex-col"
      >
        <button
          class="ml-auto bg-white flex w-28 items-center rounded-xl p-3 pr-2 mb-8 button-close"
          @click="closeDialog"
        >
          <span class="text-primary">Close</span>
          <img
            class="w-7 h-7 icon ml-3"
            src="@/assets/generalIcons/close_red.png"
            alt="close"
          />
        </button>
        <img class="p-6 bg-white shadow" :src="slide.fullImgSrc" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    slide: { type: Object, required: true },
    closeDialog: {
      type: Function,
      required: true,
    },
  },
}
</script>

<style lang="postcss" scoped>
.modal-btn {
  @apply opacity-50 px-6 py-2 rounded-md sm:w-auto text-base sm:text-sm font-medium;
}
input {
  @apply mb-2;
}
.button-close {
  margin-right: -70px !important;
}
</style>
