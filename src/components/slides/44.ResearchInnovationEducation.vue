<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full">
      <div class="flex justify-between p-1 pb-0">
        <div class="flex">
          <img
            class="mx-3 w-80"
            src="@/assets/logo/logo_rgb.png"
            alt="Workflow"
          />
          <p class="text-xl font-bold my-auto mx-3">&</p>
          <img
            class="mx-3 my-auto"
            src="@/assets/logo/ao_logo.png"
            alt="Workflow"
          />
        </div>
        <slideHeader class="pl-6" :sav-number="7" name="QOC" />
      </div>
      <div class="ao-container px-3">
        <h2 class="text-3xl font-bold px-10 mb-1">
          Collaboration begins with <span class="underline">research</span> and
          AO expert insights to inform product
          <span class="underline">innovation</span> rooted to clinical and
          patient needs, followed by <span class="underline">education</span>
          to reinforce technique and continuously learn and improve our
          solutions.
        </h2>
        <div class="grid grid-cols-6 font-Arial">
          <div class="col-span-2">
            <h2 class="text-3xl font-bold text-red-700 mb-1">
              Research & Innovation
            </h2>
            <p class="text-lg text-left mb-1">
              DePuy Synthes has <strong>exclusive access</strong> to the AO
              Technical Commission (AOTC) across Trauma, Spine, CMF, Sports and
              Recon specialties as the premier innovator in the surgical
              treatment of bone fractures and disorders.
            </p>
            <ul class="list-disc list-inside text-lg text-left">
              <li class="text-red-700">
                <span class="text-3xl font-extrabold">4,500</span>
                <span class="text-black"
                  >patients enrolled in AO Clinical Studies for DePuy Synthes
                  products</span
                >
              </li>
              <li class="text-red-700">
                <span class="text-3xl font-extrabold">240</span>
                <span class="text-black"
                  >AOTC approved products (2009 –19)</span
                >
              </li>
              <li class="text-red-700">
                <span class="text-3xl font-extrabold">>100</span>
                <span class="text-black"
                  >AO Surgeons involved product assessment prior to
                  introduction</span
                >
              </li>
            </ul>
          </div>
          <div class="col-span-2 mx-auto my-auto">
            <img class="mx-auto" src="@/assets/images/round-red-arrow.png" />
            <div class="grid grid-cols-3">
              <img src="@/assets/jnjIcons/thought_rounded.png" class="px-1" />
              <div class="my-auto">
                <h4 class="font-bold mb-2">
                  <span class="text-6xl">60</span>
                  <span class="text-3xl">YEARS</span>
                </h4>
                <p class="text-xl">of scientific collaboration</p>
              </div>
              <img
                src="@/assets/jnjIcons/professional_rounded.png"
                class="px-2"
              />
            </div>
            <img class="mx-auto" src="@/assets/images/round-blue-arrow.png" />
          </div>
          <div class="col-span-2">
            <h2 class="text-3xl font-bold text-blue-700 mb-1">Education</h2>
            <p class="text-lg text-left mb-1">
              The AO offers a world class surgeon education with a multi-channel
              education approach across a comprehensive list of orthopedic
              specialties. The collaboration in Education combines independent
              world-class postgraduate medical education with the use of our
              products.
            </p>
            <ul class="list-disc list-inside text-lg text-left">
              <li class="text-blue-700">
                <span class="text-3xl font-extrabold">250</span>
                <span class="text-black"
                  >AO Surgeons involved in curriculum development</span
                >
              </li>
              <li class="text-blue-700">
                <span class="text-3xl font-extrabold">660</span>
                <span class="text-black"
                  >AO Education Courses with direct support by DePuy Synthes
                  each year</span
                >
              </li>
              <li class="text-blue-700">
                <span class="text-3xl font-extrabold">57,000</span>
                <span class="text-black"
                  >Health Care Professionals trained by the AO worldwide each
                  year</span
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="flex">
          <img src="@/assets/logo/ao_certification.png" alt="Workflow" />
          <p
            class="text-left font-Arial font-light text-sm opacity-50 my-auto pl-10"
          >
            AO Foundation Is a 3rd party medically guided, not-for-profit
            organization led by an international group of surgeons specialized
            in the treatment of trauma and disorders of the musculoskeletal
            system.
          </p>
        </div>
      </div>
      <slideFooter class="mb-0 mt-auto" :show-third-party-trade-mark="true" />
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
.ao-container {
  position: relative;
}
.ao-container::before {
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: url('@/assets/logo/ao_background.jpg') no-repeat center center;
  background-size: fill;
  background-position: top;
  opacity: 0.1;
}
</style>
