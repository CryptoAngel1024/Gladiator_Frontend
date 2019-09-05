<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Johnson &amp; Johnson Institute Future Leaders"
        class="pl-6 pr-2 py-3"
        :sav-number="2"
        name="EDU"
      />
      <div class="flex justify-between">
        <p class="text-2xl text-left text-gray-500 pl-6">
          Online Learning Program
        </p>
        <img class="h-20" src="@/assets/images/jnj_institue.png" />
      </div>
      <div class="grid grid-cols-2 gap-x-8">
        <div class="col-span-1 pl-6">
          <img class="w-full" src="@/assets/images/knowledge.png" />
        </div>
        <div class="relative col-span-1">
          <p class="text-left text-3xl text-gray-600 pr-24">
            The Johnson &amp; Johnson Institute Future Leaders Online Learning
            Program provides anywhere, anytime educational opportunities in a
            variety of clinical topics.
          </p>
          <p class="font-bold text-center text-3xl text-gray-800 pt-60">
            Website
          </p>
          <p
            class="text-center text-2xl text-red-500 underline"
            style="color: #f30617"
          >
            <a href="HTTPS://COURSES.JNJINSTITUTE.COM"
              >HTTPS://COURSES.JNJINSTITUTE.COM</a
            >
          </p>
        </div>
        <p class="text-xs text-left text-gray-600 pl-6 col-span-2 pt-1">
          The professional education objective of training is to support the
          safe and effective use of company products in target procedures and
          techniques in accordance with the IFU.
        </p>
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
