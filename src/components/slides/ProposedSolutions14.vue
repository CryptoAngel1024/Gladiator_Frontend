<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="TPS - Proposed Solutions"
        :sav-number="14"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <div class="gr justify-items-center" />
      <div
        class="flex flex-col justify-end flex-1 px-4 mb-2 ml-8 text-left second-footer"
      >
        <p class="text-xs">
          This document contains confidential and proprietary trade secrets of
          DePuy Synthes Sales, Inc. Its contents may not be disclosed by an
          authorized recipient without prior written consent of DePuy Synthes.
        </p>
      </div>
      <slideFooter class="mb-2 ml-8" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style scoped lang="postcss">
.title {
  color: #212121;
}

.desc {
  color: #63666a;
}
.second-footer p {
  color: #7f7f7f;
}

.circle {
  height: 200px;
  width: 200px;
}

.gr {
  height: 100%;
  background: url('@/assets/images/slides/saving/sav14.png') no-repeat center
    center;
  background-size: contain;
  background-position: top;
}

.ot {
  @apply font-semibold text-lg leading-5 rounded-md  px-6 py-2 w-full h-20;
  background-color: #c8102e;
  color: white;
}
</style>
