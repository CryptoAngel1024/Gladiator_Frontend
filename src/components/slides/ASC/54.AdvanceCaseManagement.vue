<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mx-14 text-left">
      <slideHeader
        title="Advance Case Management (ACM)"
        sub-title="ACM Reduces Costs and Complexity"
        class="mx-0"
      />
      <div class="grid grid-cols-3 pb-3">
        <div class="flex col-span-3">
          <div class="vertical-bottom-top-text py-2 text-2xl"></div>
          <p class="text-accent-purple mt-auto text-2xl font-bold mb-4">
            The Value of ACM
          </p>
        </div>

        <div class="flex col-span-1">
          <div class="vertical-bottom-top-text py-4 text-2xl"></div>

          <div class="grid grid-cols-7 gap-4">
            <div class="col-span-2">
              <img src="@/assets/images/ASC/54-c1-1.png" class="scale-100" />
            </div>
            <div class="col-span-5 pt-4">
              <p class="text-accent-purple mt-auto text-2xl font-bold my-1">
                The ACM Process
              </p>
              <p class="text-lg">
                By changing the DePuy Synthes inventory replenishment process
                from reactive to proactive , ACM drives efficiency throughout
                the supply chain—and reduces wasted time and costs in the OR.
              </p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-10 col-span-2 pl-10">
          <div class="grid grid-rows-5 col-span-4 gap-4">
            <img
              src="@/assets/images/ASC/54-c2-1.jpg"
              class="row-span-2 scale-100"
            />
            <img
              src="@/assets/images/ASC/54-c2-2.jpg"
              class="row-span-3 scale-100"
            />
          </div>
          <div class="col-span-3 pl-1">
            <p class="text-accent-purple mt-auto text-2xl font-bold my-1">
              From 8 to 3
            </p>
            <p class="mt-auto text-xl">
              ATTUNE® Knee System instrument trays required in the OR
            </p>
            <hr class="my-4" />
            <p class="text-accent-purple mt-auto text-2xl font-bold my-1">
              63%
            </p>
            <p class="mt-auto text-xl">
              reduction in instrument tray sterilization cost.
            </p>
          </div>
          <div class="col-span-1"></div>
        </div>
      </div>
      <ul class="list-decimal gap-0 text-gray-1 text-xs ml-5">
        <li class="my-auto bottom-text">
          Capra R, Bini SA, Bowden DE, et al. Implementing a perioperative
          efficiency initiative for orthopedic surgery instrumentation at an
          academic center: A comparative before-and-after study. Medicine
          (Baltimore). 2019;98(7):e14338.
          <br />*Case study results are based on analysis of 38 Attune® Knee
          System procedures performed and observed over a 14 week period. These
          results are examples only and do not guarantee or predict future
          results, which will vary depending on individual circumstances.
        </li>
      </ul>
      <slideFooter class="mb-2 pt-2" />
    </div>
  </section>
</template>

<script>
import slideHeader from '@/components/slides/slideHeaderASC.vue'
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideHeader, slideFooter },
}
</script>
