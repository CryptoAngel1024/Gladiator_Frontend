<template>
  <div>
    <div
      class="w-full h-auto"
      style="background: #bfbfbf; border-bottom: 10px solid #c800a1"
    >
      <div :class="'flex justify-center ' + imageClass">
        <slot></slot>
      </div>
    </div>
    <div class="text-left px-1">
      <p class="text-accent-purple text-lg mt-auto font-semibold pt-3 pb-1">
        {{ title }}
      </p>
      <p class="text-accent-purple mt-auto pt-2 text-3xl font-bold">
        {{ percentage }}%
      </p>
      <p class="text-gray-600 text-lg font-semibold pt-1">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
    },
    percentage: {
      required: true,
      type: Number,
    },
    description: {
      required: true,
      type: String,
    },
    imageClass: {
      required: false,
      type: String,
      default: null,
    },
  },
}
</script>
