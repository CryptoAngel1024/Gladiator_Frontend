<template>
  <section class="h-full relative">
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-11">
        <div class="col-span-8 pl-16 pt-6">
          <p class="text-left text-4xl font-bold w-full">
            What is DePuy Synthes Pro-Pak<sup>®</sup>?
          </p>
        </div>
        <div class="col-span-3">
          <img class="h-24 w-full" src="@/assets/images/side_skele.png" />
        </div>
      </div>
      <div class="w-full h-2" style="background-color: #f4f3ef" />
      <div class="grid grid-cols-10 pt-2">
        <div class="col-span-4 pl-20 pr-2">
          <ul class="list-disc">
            <li class="text-left">
              <p class="text-xl">
                Synthes Pro-Pak<sup>®</sup> is comprised of
                <strong>pre-selected constructs</strong> featuring Trauma
                products commonly used in out-patient procedures
              </p>
            </li>
            <li class="text-left text-sm pt-14">
              <p class="text-xl">
                DePuy Synthes Pro-Pak Constructs are EXCLUSIVELY available to
                freestanding, independent* ASCs, offering
                <strong>predictability</strong>, <strong>quality</strong> and
                <strong>value</strong>
              </p>
            </li>
            <li class="text-left text-sm pt-14">
              <p class="text-xl">DePuy Synthes Pro-Pak is not:</p>
              <ul class="list-disc text-sm pl-4">
                <li class="text-left">
                  <p class="text-base">
                    A new physical product offering or kit
                  </p>
                </li>
                <li class="text-left">
                  <p class="text-base">Available to HOPDs or hospitals</p>
                </li>
                <li class="text-left">
                  <p class="text-base pr-10">
                    New instrumentation or streamlined instrument sets
                  </p>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="flex col-span-3">
          <img
            class="border-2 border-gray-200"
            src="@/assets/images/leftpak.png"
          />
        </div>
        <div class="flex col-span-3">
          <img
            class="border-2 border-gray-200"
            src="@/assets/images/rightpak.png"
          />
        </div>

        <div class="absolute bottom-16 pl-6 text-left w-96">
          <p>**Where hospitals have less than 50% ownership</p>
        </div>
        <router-link
          class="absolute-position flex bottom-4 right-4 z-10"
          :to="linkToEnabledSlidePerCategory"
        >
          <img class="pr-2 h-12" src="@/assets/jnjIcons/plan.png" />
          <p class="text-base text-center font-bold text-blue-900">
            <span class="block pl-2">PORT</span>6
          </p>
        </router-link>
        <slideFooter class="mb-0 mt-auto absolute bottom-0 w-full" />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import useSlideSectionLink from './slideSectionLink.js'

export default {
  components: { slideFooter },
  setup() {
    const { linkToEnabledSlidePerCategory } = useSlideSectionLink(
      'COMPREHENSIVE_PORTFOLIO',
    )

    return {
      linkToEnabledSlidePerCategory,
    }
  },
}
</script>

<style lang="postcss" scoped>
.chart-line-bottom {
  border-bottom: 2px solid rgba(156, 163, 175);
}
.chart-line-top {
  border-top: 2px solid rgba(156, 163, 175);
}
.point {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.point-red {
  border-bottom: 20px solid rgba(220, 38, 38);
}
.point-black {
  border-bottom: 20px solid rgba(99, 102, 106);
}
.point-grey {
  border-bottom: 20px solid rgba(136, 139, 141);
}
.point-lightgrey {
  border-top: 20px solid rgba(156, 163, 175);
}
.legend-container {
  @apply px-3 py-1 border-2 rounded-lg border-white text-left text-white;
}
.bar-container {
  @apply p-3 mt-auto text-right text-white;
}

.absolute-position {
  position: absolute;
}
</style>
