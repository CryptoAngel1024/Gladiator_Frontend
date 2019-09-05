<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="text-pink-850 -mb-4 text-2xl mt-8 text-center">
        Decisions Resource Group
      </div>
      <div class="border-t border-pink-850 w-90"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-2 ml-12"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-4 ml-32"></div>
      <div class="w-4 h-4 bg-pink-850 rounded-full -mt-4 ml-72"></div>
      <div class="text-4xl font-bold text-pink-850 mt-8 text-left px-16">
        PriceTrack is built on DRG's industry-leading Hospital Purchase Order
        dataset
      </div>
      <div class="mx-auto mt-2 flex">
        <div class="w-72 px-2">
          <div class="h-72 bg-back1 flex flex-col justify-center text-white">
            <div class="flex justify-center">
              <div
                class="rounded-full flex items-center justify-center w-40 h-40 bg-back1Circle shadow-4xl"
              >
                <div class="font-bold text-5xl">1,900</div>
              </div>
            </div>
            <div class="font-bold text-3xl py-8">US HOSPITALS</div>
          </div>
          <div class="py-4 px-4 font-bold text-xl text-back1Circle">
            Largest hospital coverage in the industry
          </div>
          <ul class="text-left ml-4 font-bold">
            <li class="list-disc mb-2">
              Integration of 2 hospital purchase order datasets
            </li>
            <li class="list-disc">>40% of all US hospitals covered</li>
          </ul>
        </div>
        <div class="w-72 px-2">
          <div class="h-72 bg-back2 flex flex-col justify-center text-white">
            <div class="flex justify-center">
              <div
                class="rounded-full flex items-center justify-center w-40 h-40 bg-back2Circle shadow-4xl"
              >
                <div class="font-bold text-5xl">2.2M</div>
              </div>
            </div>
            <div class="font-bold text-3xl py-8">UNIQUE SKUs</div>
          </div>
          <div class="py-4 px-4 font-bold text-xl text-back2Circle">
            Broad coverage of medtech markets
          </div>
          <ul class="text-left ml-4 font-bold">
            <li class="list-disc mb-2">
              Cleanly aligned with ERD's internal SKU catalogue
            </li>
          </ul>
        </div>
        <div class="w-72 px-2">
          <div class="h-72 bg-back3 flex flex-col justify-center text-white">
            <div class="flex justify-center">
              <div
                class="rounded-full flex items-center justify-center w-40 h-40 bg-back3Circle shadow-4xl"
              >
                <div class="font-bold text-5xl">>3K</div>
              </div>
            </div>
            <div class="font-bold text-2xl py-8">MANUFACTURERS</div>
          </div>
          <div class="py-4 px-4 font-bold text-xl text-back3Circle">
            Full picture of all competitors in market
          </div>
          <ul class="text-left ml-4 font-bold">
            <li class="list-disc mb-2">
              SKUs are tied to manufacturers so the competitive trends are
              easily captured
            </li>
          </ul>
        </div>
        <div class="w-72 px-2">
          <div class="h-72 bg-back4 flex flex-col justify-center text-white">
            <div class="flex justify-center">
              <div
                class="rounded-full flex items-center justify-center w-40 h-40 bg-back4Circle shadow-4xl"
              >
                <div class="font-bold text-5xl">>90%</div>
              </div>
            </div>
            <div class="font-bold text-3xl py-4">QUARTERLY CONSISTENCY</div>
          </div>
          <div class="py-4 px-8 font-bold text-xl text-back4Circle">
            Smooth, reliable trends
          </div>
          <ul class="text-left ml-4 font-bold">
            <li class="list-disc mb-2">
              Consistent reporting leads to accurate data trends
            </li>
          </ul>
        </div>
      </div>

      <div class="mb-0 mt-auto">
        <slideFooter :show-third-party-trade-mark="true" :link-logo="true" />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'

export default {
  components: { slideFooter },
}
</script>
