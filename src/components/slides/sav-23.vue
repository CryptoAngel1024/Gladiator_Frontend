<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        name="SAV"
        :sav-number="23"
        title="Performance Rebates or NBI's"
        class="ml-6"
      />
      <div class="p-4 border-red-800 border-4 mx-6">
        <div
          class="flex items-center justify-center flex-1 font-bold bg-white border-2 border-gray-800 cursor-pointer hight rounded-xl"
        >
          <slideImage
            slide-code-prop="SAV23"
            class="w-full imgHeight"
            img-class="object-contain"
            placeholder-class="border-dashed"
            alt="Rebates"
          />
        </div>
      </div>
      <slideFooter class="mt-auto" :show-third-party-trade-mark="true" />
    </div>
  </section>
</template>
<script>
import slideFooter from './slideFooter.vue'
import slideHeader from './slideHeader.vue'
import dynamicSlide from './dynamicSlide.js'
import slideImage from '@/components/newRfp/slideImage.vue'

export default {
  components: { slideFooter, slideHeader, slideImage },
  setup() {
    const { slideContent: sav23SlideDraft } = dynamicSlide('SAV23')

    return {
      sav23SlideDraft,
    }
  },
}
</script>

<style scoped>
.hight {
  height: 470px;
}
.imgHeight {
  height: 468px;
}
</style>
