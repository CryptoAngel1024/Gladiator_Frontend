<template>
  <div
    id="overall-slide-layout"
    ref="overallSlideLayout"
    class="my-3 border border-gray-300 rounded-lg"
  >
    <slot />
  </div>
</template>

<script>
import { nextTick, ref, onMounted, onUnmounted } from 'vue'

export default {
  setup() {
    const overallSlideLayout = ref(null)

    onMounted(() => {
      dynamicScaling()
      window.addEventListener('resize', dynamicScaling)
    })
    onUnmounted(() => {
      window.removeEventListener('resize', dynamicScaling)
    })

    function dynamicScaling() {
      nextTick(() => {
        const slideContainer = overallSlideLayout.value

        slideContainer.style.width = null

        const sliderContainerBorderWidth = 2

        const sliderContainerWidth =
          slideContainer.clientWidth - sliderContainerBorderWidth

        const minSlideWidth = 600
        const scale =
          sliderContainerWidth > minSlideWidth
            ? sliderContainerWidth / 1280
            : minSlideWidth / 1200

        document
          .querySelector(':root')
          .style.setProperty('--sliderBuilderScale', scale)

        slideContainer.style.height =
          720 * scale + sliderContainerBorderWidth + 'px'
        slideContainer.style.width =
          1280 * scale + sliderContainerBorderWidth + 'px'
      })
    }

    return { overallSlideLayout }
  },
}
</script>

<style>
:root {
  --sliderBuilderScale: 1;
}

#overall-slide-layout > * {
  width: 1280px;
  height: 720px;
  position: absolute;
  transform-origin: top left;
  transform: scale(var(--sliderBuilderScale));
}
</style>
