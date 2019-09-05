<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full pt-6 font-Arial text-left mx-12">
      <h2 class="text-4xl font-bold text-slidColor-header mt-2 mx-3">
        How Can We Help?
      </h2>

      <div class="grid grid-cols-4 gap-0 mt-20">
        <div class="flex flex-col">
          <div class="flex justify-center mb-2">
            <img src="@/assets/images/ASC/63-1-1.png" class="w-11/12" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex justify-center mb-2">
            <img src="@/assets/images/ASC/63-1-2.png" class="w-11/12" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex justify-center mb-2">
            <img src="@/assets/images/ASC/63-1-3.png" class="w-11/12" />
          </div>
        </div>

        <div class="flex flex-col">
          <div class="flex justify-center mb-2">
            <img src="@/assets/images/ASC/63-1-4.png" class="w-11/12" />
          </div>
        </div>
      </div>

      <ul class="list-disc text-3xl mx-7 pl-2 pr-6 space-y-4 mt-3">
        <li>
          Do you feel DePuy Synthes has tools and resources to assist your
          <br />
          ASC business?
        </li>
        <li>
          Which capabilities/programs do you feel can make the biggest impact
          for <br />
          your specific ASC business model?
        </li>
        <li>Do you have additional needs we can help you address?</li>
      </ul>
      <slideFooter class="mb-8 mx-2" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideFooter },
}
</script>
