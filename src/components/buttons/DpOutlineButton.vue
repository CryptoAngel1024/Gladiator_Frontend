<template>
  <button
    class="bg-transparent bg-white font-medium py-2 px-4 border rounded-lg"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
}
</script>
