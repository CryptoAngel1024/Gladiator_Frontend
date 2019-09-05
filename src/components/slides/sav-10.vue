<template>
  <section class="h-full relative">
    <ReusableSterilizationContainer09 :sav-number="10" />

    <div class="absolute left-32 top-23 w-4/5 h-100 z-50">
      <div
        class="flex items-center justify-center flex-1 font-bold bg-white border-2 border-gray-800 cursor-pointer h-100 rounded-xl"
      >
        <slideImage
          slide-code-prop="SAV10"
          class="w-full h-100"
          img-class="object-contain"
          placeholder-class="border-dashed"
          alt="Sterile_Containers"
        />
      </div>
    </div>
  </section>
</template>

<script>
import slideImage from '@/components/newRfp/slideImage.vue'
import ReusableSterilizationContainer09 from '@/components/slides/ReusableSterilizationContainer09.vue'

export default {
  components: { slideImage, ReusableSterilizationContainer09 },
}
</script>
