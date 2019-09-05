<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        class="pl-6"
        title="Robust Trauma Portfolio"
        :sav-number="1"
        name="PORT"
      />
      <div class="flex py-4 bg-gray-60 px-24 justify-between">
        <div
          class="bg-white flex flex-wrap justify-center content-between my-4 py-8 px-1"
        >
          <div class="text-4xl font-bold text-blue-800">
            HUMAN BODY CONTAINS
          </div>
          <div class="flex justify-center items-center">
            <div class="text-8xl text-red-700">2</div>
            <img class="w-20 h-28" src="@/assets/images/body.png" />
            <div class="text-8xl text-red-700">6</div>
          </div>
          <div class="px-8 text-gray-700">
            <div class="font-bold text-blue-700 text-2xl">UNIQUE BONES</div>
            <div class="text-3xl">VARIED PATIENT</div>
            <div class="font-bold text-3xl">ANATOMY</div>
            <div class="text-2xl">INFINITE FRACTURE</div>
            <div class="font-bold text-3xl">PATTERNS</div>
          </div>
        </div>

        <img class="h-100 px-4" src="@/assets/images/skeleton.png" />

        <div class="flex flex-col justify-center">
          <div class="text-5xl text-blue-800 -ml-12">COMPREHENSIVE</div>
          <div class="text-4xl text-blue-800 font-bold -mr-38 py-4">
            PORTFOLIO
          </div>
          <div class="text-4xl font-bold text-red-700">16,000+</div>
          <div>
            IMPLANTS & INSTRUMENTS <br />
            for <strong> 150 BONES </strong>
          </div>

          <div class="flex justify-center">
            <div
              class="sixbox h-72 w-72 text-xs flex justify-center items-center"
            >
              <div class="-mt-4">
                <div class="text-emerald-800">
                  COVERING <br />FRACTURES <br />& DEFORMITIES FOR
                </div>
                <div>
                  HIP & PELVIS <br />KNEE <br />FOOT & ANKLE <br />SHOULDER &
                  ELBOW<br />
                  HAND & WRIST <br />PEDIATRICS
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <slideFooter class="mb-0 mt-auto" :show-third-party-trade-mark="false" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style lang="postcss" scoped>
.sixbox {
  background: url('@/assets/images/sixbox.png') no-repeat;
  background-size: 100%;
}
</style>
