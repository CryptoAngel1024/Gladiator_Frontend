<template>
  <div class="my-3">
    <h3 class="font-bold text-gray-500 py-2">
      {{ headerText }}
    </h3>
    <div class="flex font-bold rfp-config-question-box items-center p-2">
      <img class="w-8 h-8" src="@/assets/images/slide_bell.svg" alt="bell" />
      <a class="pl-2" :href="link" target="blank">{{ link }}</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    link: { type: String, required: true },
    headerText: { type: String, required: true },
  },
}
</script>
