<template>
  <section class="h-full">
    <!-- content div -->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Your procedure spend and saving opportunities"
        name="SAV"
        :sav-number="2"
        class="pl-2"
      />
      <div
        class="flex justify-center flex-1 gap-10 px-20 mt-1 ml-2 mr-3 border-4 border-slidColor-3 text-black font-bold"
      >
        <slideImage
          slide-code-prop="SAV2"
          class="rounded-xl h-96 w-1/2 my-auto"
          img-class="object-contain"
          placeholder-class="border-dashed border-2 border-gray-800"
          placeholder="Summary of procedure analysis"
          alt="Trauma1"
        />
        <slideImage
          slide-code-prop="SAV2"
          :image-number="2"
          class="object-contain rounded-xl h-96 w-1/2 my-auto"
          img-class="object-contain"
          placeholder-class="border-dashed border-2 border-gray-800"
          placeholder="Vendors share"
          alt="Trauma2"
        />
      </div>
      <slideFooter class="mt-auto" :show-third-party-trade-mark="true" />
    </div>
  </section>
</template>

<script>
import slideFooter from '../slideFooter.vue'
import slideHeader from '../slideHeader.vue'
import dynamicSlide from '../dynamicSlide.js'
import slideImage from '@/components/newRfp/slideImage.vue'

export default {
  components: { slideFooter, slideHeader, slideImage },
  setup() {
    const { slideContent: sav2SlideDraft } = dynamicSlide('SAV2')

    return {
      sav2SlideDraft,
    }
  },
}
</script>
