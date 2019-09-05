<template>
  <section class="h-full relative">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Broad Portfolio Investment in Innovation"
        :sav-number="4"
        class="pl-6"
        name="PORT"
      />
      <div class="flex">
        <p class="text-left text-2xl text-gray-600 p-3 pl-7">
          Expanding the industry’s most comprehensive trauma portfolio through
          external investment and internal collaboration
        </p>
      </div>
      <div class="h-full grid grid-cols-3 gap-x-4 pt-4">
        <div class="col-span-1 pl-6">
          <p
            class="text-center text-white text-3xl"
            style="background-color: #1e22aa"
          >
            Acquisitions
          </p>
          <img class="w-40 p-2 mx-auto" src="@/assets/images/bme.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/Ouroboros.jpg" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/TRS.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/megadyne.png" />
        </div>
        <div class="col-span-1">
          <p
            class="text-center text-white text-3xl"
            style="background-color: #1e22aa"
          >
            Alliances
          </p>
          <img class="w-40 p-2 mx-auto" src="@/assets/images/Pacira.jpg" />
          <div class="pl-28">
            <p class="col-span-1 float-left text-lg">*</p>
            <img
              class="w-40 p-2 col-span-1"
              src="@/assets/images/lifeNet.png"
            />
          </div>
          <img class="w-40 p-2 mx-auto" src="@/assets/images/MTF.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/materialise.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/caresense.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/Prosidyan.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/BrainLab.png" />
        </div>
        <div class="col-span-1 pr-6">
          <p
            class="text-center text-white text-3xl"
            style="background-color: #1e22aa"
          >
            Cross-Collaboration
          </p>
          <img class="w-40 p-2 mx-auto" src="@/assets/images/Ethicon.png" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/Orthovisc.jpg" />
          <img class="w-40 p-2 mx-auto" src="@/assets/images/monovisc.jpg" />
        </div>
      </div>
      <slideFooter
        class="mb-0 mt-auto absolute bottom-0 w-full z-30"
        :show-third-party-trade-mark="true"
        :main-texts="[
          '*This is a registered trademark of LifeNet Health.',
          'The third party trademarks used herein are the trademarks of their respective owners.',
        ]"
      />
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
