<template>
  <section class="h-full slide-1-container">
    <!-- content div -->
    <div class="flex flex-col h-full">
      <div class="flex-grow p-6">
        <div
          class="mt-40 pt-8 pb-8 text-left text-ellipsis overflow-hidden text-6xl text-slidColor-header font-bold"
          data-test="introduction-slide-title"
        >
          {{ introSlide.title }}
        </div>
        <!-- company logo goes here -->
        <div class="flex-row-reverse flex w-full min-h-40">
          <s3Image
            class="object-contain my-auto h-40"
            :s3-directory="`presentations/${presentationId}/`"
            s3-file-name="customerProfile.png"
            alt="Logo"
          />
        </div>
        <p
          class="text-left h-24 flex flex-col place-items-start text-base space-y-1 text-slidColor-1 whitespace-pre-wrap"
          data-test="introduction-slide-subTitle"
        >
          {{ introSlide.subTitle }}
        </p>
      </div>
      <slideFooter
        class="mt-auto"
        :main-texts="[
          'The information in this document is confidential and proprietary to Johnson & Johnson and is intended only for the use of the persons to whom this document is addressed.',
          'This document should not be disclosed to any other person without prior written consent from Johnson & Johnson.',
        ]"
      />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import s3Image from '@/components/utils/s3/s3Image.vue'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideFooter, s3Image },
  setup() {
    const { slideContent: introSlide, presentationId } = dynamicSlide('INTRO1')

    return {
      introSlide,
      presentationId,
    }
  },
}
</script>

<style scoped>
td,
th {
  border-style: hidden !important;
}
.slide-1-container {
  background: url('@/assets/images/slides/slide1-backup.png') no-repeat center
    center;
  background-size: contain;
  background-position: top;
}
</style>
