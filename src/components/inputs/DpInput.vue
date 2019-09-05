<template>
  <div class="flex flex-col">
    <label
      v-if="label"
      class="flex text-grey-darker text-sm font-bold mb-2"
      :for="id"
      >{{ label }}</label
    >
    <input
      :id="id"
      class="shadow appearance-none border rounded w-full py-3 px-3 text-grey-darker"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: null,
    },
    id: { type: String, required: true },
    type: { type: String, required: true },
    placeholder: { type: String, required: true },
  },
}
</script>
