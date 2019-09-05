<template>
  <button
    class="py-3 px-4 rounded-xl flex items-center justify-center space-x-4 disabled:opacity-50"
    :disabled="disabled"
  >
    <div
      v-if="loading"
      class="animate-spin dp-button-loading ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6 pr-2 mr-2"
    />
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    loading: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
    disabled: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
}
</script>
<style>
.dp-button-loading {
  border-top-color: #3498db;
}
</style>
