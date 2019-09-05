<template>
  <router-link
    :to="linkToEnabledSlidePerCategory"
    class="circle-link"
    :class="isCurrentCategory ? 'circle-link-active' : ''"
  >
    <img
      v-if="isCurrentCategory"
      class="check-marker"
      src="@/assets/images/check_mark.png"
    />
    <img
      class="top-img px-2"
      :src="category.imgSrc"
      :alt="category.description"
    />
    <p class="text-center px-1">{{ category.description }}</p>
    <slot />
  </router-link>
</template>

<script>
import { computed } from 'vue'
import dynamicSlide from '@/components/slides/dynamicSlide.js'
import jnj_hands from '@/assets/logo/jnj_hands.png'
import jnj_cap from '@/assets/logo/jnj_cap.png'
import jnj_dollar from '@/assets/logo/jnj_dollar.png'
import jnj_handshake from '@/assets/logo/jnj_handshake.png'
import medical_professional from '@/assets/logo/medical_professional.png'
import jnj_communication_plan from '@/assets/logo/jnj_communication_plan.png'
import jnj_health_caring from '@/assets/logo/jnj_health_caring.png'
import useSlideSectionLink from '../slideSectionLink.js'

const categories = {
  INTRODUCTION: {
    imgSrc: jnj_hands,
    description: 'HOME',
    partnershipSlideId: 'INTR_PPH',
  },
  TRAINING_SUPPORT: {
    imgSrc: jnj_cap,
    description: `Training
    Support`,
    partnershipSlideId: 'EDU_PPH',
  },
  DELIVER_ACTUAL_SAVINGS: {
    imgSrc: jnj_dollar,
    description: 'Deliver Actual Savings',
    partnershipSlideId: 'SAV_PPH',
  },
  CUSTOMER_SERVICE: {
    imgSrc: jnj_handshake,
    description: 'Customer Service',
    partnershipSlideId: 'CS_PPH',
  },
  SURGEON_SATISFACTION: {
    imgSrc: medical_professional,
    description: 'Surgeon Satisfaction',
    partnershipSlideId: 'SRG_PPH',
  },
  COMPREHENSIVE_PORTFOLIO: {
    imgSrc: jnj_communication_plan,
    description: 'Comprehensive Portfolio',
    partnershipSlideId: 'PORT_PPH',
  },
  QUALITY_OF_CARE: {
    imgSrc: jnj_health_caring,
    description: 'Support Quality Care',
    partnershipSlideId: 'QOC_PPH',
  },
}

export default {
  props: {
    categoryName: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const categoryName = computed(() => props.categoryName)
    const { linkToEnabledSlidePerCategory } = useSlideSectionLink(categoryName)

    const { slideDetail } = dynamicSlide()

    const currentSlideId = computed(() => slideDetail.value?.prePopulatedSlide)

    const category = computed(() => categories[props.categoryName])

    const isCurrentCategory = computed(
      () => currentSlideId.value === category.value.partnershipSlideId,
    )

    return { linkToEnabledSlidePerCategory, isCurrentCategory, category }
  },
}
</script>

<style lang="postcss" scoped>
.circle-link {
  @apply absolute shadow-3xl rounded-full items-center justify-center bg-white flex flex-col p-2  h-32 w-32;
}
/* .circle-link:hover {
  @apply border-8 border-accent-blue size-bordered-circle;
} */
.circle-link-active {
  /* @apply border-8 border-accent-blue w-36 h-36; */
  outline: 10px solid #00b5e2;
}
.check-marker {
  @apply absolute z-10 -right-2 -top-4;
}
/* .circle-link:not(:hover) {
  @apply h-32 w-32;
} */
.circle-link p {
  @apply text-sm w-full my-auto;
  line-height: 1.1;
}
.circle-link .top-img {
  /* @apply absolute left-8 inset-y-2; */
  @apply mx-auto mt-1 h-3/5;
}
</style>
