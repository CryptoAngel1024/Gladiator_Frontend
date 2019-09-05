<template>
  <router-link :to="linkToSlide">
    <div
      class="slide-screenshot-container bg-white hover:border-4 rounded-lg hover:border-amber-500"
      :class="{
        'border-4 border-accent-yellow': highlight,
      }"
    >
      <img class="h-full rounded-lg" :src="imgSrc" />
    </div>
    <div class="mt-5 flex w-full">
      <div class="w-title">
        <h6 class="sub-title text-xs font-light">Slide {{ slideNumber }}</h6>
        <h4 class="title text-base font-medium mt-1">
          {{ title }}
        </h4>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
    },
    slideNumber: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const route = useRoute()

    const linkToSlide = computed(() => {
      const { presentationId, hyperLink } = route.params
      return hyperLink
        ? {
            name: 'present',
            hash: `#/${props.slideNumber}`,
            params: {
              hyperLink,
            },
          }
        : {
            name: 'slide',
            hash: `#/${props.slideNumber}`,
            params: {
              presentationId,
            },
          }
    })

    return { linkToSlide }
  },
}
</script>

<style scoped lang="postcss">
.w-title {
  width: calc(100% - 5rem);
}
.w-title-icon {
  width: 5rem;
}
.hover\:border-4:hover {
  @apply border-4;
}
.slide-screenshot-container {
  height: 10rem;
  width: calc(1280 / 720 * 10rem);
}
</style>
