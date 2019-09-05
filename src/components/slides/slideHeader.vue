<template>
  <header
    class="flex justify-between"
    :class="
      name === 'INTR' || name === 'EDU'
        ? 'py-0 pr-0'
        : 'text-blue-900 py-3 pr-4'
    "
  >
    <p class="text-4xl font-bold text-slidColor-1">
      {{ title }}
    </p>
    <router-link
      class="flex justify-between"
      :to="linkToEnabledSlidePerCategory"
    >
      <img class="h-12 my-auto" :src="images[icon || name]" />
      <p class="font-bold pl-1 flex text-center text-xl">
        {{ name }}<br />
        {{ savNumber }}
      </p>
    </router-link>
  </header>
</template>

<script>
import sav from '@/assets/jnjIcons/dollar.png'
import medical from '@/assets/jnjIcons/medicalProfessional.png'
import plan from '@/assets/jnjIcons/plan.png'
import handshake from '@/assets/jnjIcons/handshake.png'
import quality from '@/assets/jnjIcons/quality.png'
import multiHand from '@/assets/jnjIcons/health_caring.png'
import handLogo from '@/assets/images/hand-logo.png'
import jnjcap from '@/assets/logo/jnj_cap.png'
import { computed } from 'vue'
import useSlideSectionLink from './slideSectionLink.js'

const images = {
  SAV: sav,
  EDU: jnjcap,
  SRG: medical,
  APPD: plan,
  PORT: plan,
  CS: handshake,
  QOC: quality,
  multiHand: multiHand,
  INTR: handLogo,
}

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    savNumber: {
      type: Number,
      required: true,
    },
    icon: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const slideCategoryNames = {
      INTR: 'INTRODUCTION',
      EDU: 'TRAINING_SUPPORT',
      SRG: 'SURGEON_SATISFACTION',
      CS: 'CUSTOMER_SERVICE',
      QOC: 'QUALITY_OF_CARE',
      PORT: 'COMPREHENSIVE_PORTFOLIO',
      APPD: 'COMPREHENSIVE_PORTFOLIO',
      SAV: 'DELIVER_ACTUAL_SAVINGS',
    }
    const slideCategoryNamed = computed(
      () => slideCategoryNames[props.name] || '',
    )

    const { linkToEnabledSlidePerCategory } =
      useSlideSectionLink(slideCategoryNamed)

    return {
      linkToEnabledSlidePerCategory,
      images,
    }
  },
}
</script>
