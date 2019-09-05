<template>
  <div class="flex items-center">
    <span
      data-test="current-step"
      class="text-gray-850 font-JnJ text-2xl font-medium mr-4"
      >{{ currentStep }}/2</span
    >
    <div class="flex items-center">
      <div
        v-for="step in [1, 2]"
        :key="step"
        class="flex items-center"
        :data-test="`stepper-button-${step}`"
      >
        <div
          v-if="step > 1"
          class="w-8 h-0.5"
          :class="{
            'bg-gray-350': currentStep < step,
            'bg-secondary': currentStep >= step,
          }"
        />
        <button
          class="rounded-full w-7 h-7"
          :class="{
            'bg-gray-350': currentStep < step,
            'bg-secondary': currentStep >= step,
          }"
          @click="$emit('gotoStep', step), customSlideStprGaLog()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
  },
  emits: ['gotoStep'],
  setup() {
    const customSlideStprGaLog = () => {
      gaEvent({
        action: 'custom-slide-stepper-click',
        event_category: 'dashboard',
        event_label: 'User-clicked-custom-slide-stepper-btn',
      })
    }
    return { customSlideStprGaLog }
  },
}
</script>
