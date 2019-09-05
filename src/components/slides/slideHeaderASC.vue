<template>
  <div class="mx-14">
    <div class="-mb-20 text-left">
      <h2 class="mt-2 text-4xl font-bold text-slidColor-header">
        {{ title }}
      </h2>
      <h2
        v-show="subTitle"
        class="mt-3 mb-1 text-2xl text-slidColor-header"
        style="color: #63666a"
      >
        {{ subTitle }}
      </h2>
    </div>
    <div class="flex justify-end -translate-y-20">
      <div class="mt-8 -mb-12 h-32">
        <img
          v-if="learnMore"
          src="@/assets/images/ASC/downward_arrow.png"
          class="ml-20 max-w-max translate-x-14 translate-y-3"
        />
        <img
          v-if="learnMore"
          src="@/assets/images/ASC/learn_more.png"
          class="my-5 w-72 max-w-max scale-50 translate-x-16 -translate-y-7 justify-right"
        />
      </div>
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
    subTitle: {
      required: false,
      type: String,
      default: null,
    },
    learnMore: {
      required: false,
      type: Boolean,
      default: false,
    },
  },
}
</script>
