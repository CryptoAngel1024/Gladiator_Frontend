<template>
  <section class="h-full relative">
    <UniversalSmallFrag11 :sav-number="12" />
    <div class="absolute left-32 top-23 w-4/5 h-100 z-50">
      <div
        class="flex items-center justify-center flex-1 font-bold bg-white border-2 border-gray-800 cursor-pointer h-100 rounded-xl"
      >
        <slideImage
          slide-code-prop="SAV12"
          class="w-full h-100"
          img-class="object-contain"
          placeholder-class="border-dashed"
          alt="Universal_Small_Frag"
        />
      </div>
    </div>
  </section>
</template>

<script>
import UniversalSmallFrag11 from '@/components/slides/savings/UniversalSmallFrag11.vue'
import slideImage from '@/components/newRfp/slideImage.vue'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideImage, UniversalSmallFrag11 },
  setup() {
    const { slideContent: sav12SlideDraft } = dynamicSlide('SAV12')

    return {
      sav12SlideDraft,
    }
  },
}
</script>
