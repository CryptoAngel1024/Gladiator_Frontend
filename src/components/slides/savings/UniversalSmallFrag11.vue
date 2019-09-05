<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Universal Small Fragment System"
        :sav-number="savNumber"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <p class="desc flex-4 mb-2 text-left ml-8 mr-8 px-8 text-2xl">
        Simplified system for 2.7 mm and 3.5 mm non-locking, LCP
        <sup class="-ml-1"> ® </sup> and VA LCP <sup class="-ml-1"> ® </sup>
        Implant Technology designed to help you do more with less
      </p>
      <div class="relative">
        <img
          class="mx-auto"
          src="@/assets/images/slides/saving/main_fragment.png"
          width="500"
          height="200"
        />
        <div
          class="frag_1 absolute top-28 left-32 flex justify-center text-white"
        >
          <div class="mt-38">
            <span class="text-sm"> SIMPLIFIED / <br />EROGONOMIC</span>
            <div class="-mt-2 text-lg font-bold">INSTRUMENTATION</div>
          </div>
        </div>
        <div
          class="frag_2 absolute top-64 left-96 flex justify-center text-white"
        >
          <div class="mt-38 text-lg font-bold">COST <br />SAVINGS</div>
        </div>
        <div
          class="frag_3 absolute top-64 right-96 flex justify-center text-white"
        >
          <div class="mt-38 text-lg font-bold">
            LESS STORAGE<br />
            NEEDED
          </div>
        </div>
        <div
          class="frag_4 absolute top-28 right-32 flex justify-center text-white"
        >
          <div class="mt-42 text-lg font-bold">EFFICIENCY</div>
        </div>
      </div>

      <div
        class="second-footer flex-1 flex flex-col justify-end px-4 ml-8 text-left mb-2"
      >
        <p class="text-xs">
          *Calculation takes into account DePuy Synthes systems commonly used
          for each small bone trauma procedure, employs a weighted average of
          2.25 sets per procedure, cost to wash a tray is $47.7 and
          approximately 5 trays are washed per set on average when accounting
          for any wire bins that are also holding instruments
        </p>
      </div>
      <slideFooter class="ml-8 mb-2" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
  props: {
    savNumber: {
      type: Number,
      default: 11,
    },
  },
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

.cc2 {
  background: url('@/assets/images/slides/saving/sav11-icon2.png') no-repeat
    center center;
  background-size: contain;
  background-position: top;
}

.cc2-2 {
  background: url('@/assets/images/slides/saving/sav11-icon22.png') no-repeat
    center center;
  background-size: contain;
  background-position: top;
}

.cc3 {
  background: url('@/assets/images/slides/saving/sav11-icon3.png') no-repeat
    center center;
  background-size: contain;
  background-position: top;
}
.cc4 {
  background: url('@/assets/images/slides/saving/sav11-icon4.png') no-repeat
    center center;
  background-size: contain;
  background-position: top;
}

.top {
  background: url('@/assets/images/slides/saving/sav11-top.png') no-repeat
    center center;
  background-size: cover;
  background-position: top;
}
.frag_1 {
  background: url('@/assets/images/slides/saving/frag_1.png') no-repeat;
  background-size: 100%;
  width: 220px;
  height: 220px;
}
.frag_2 {
  background: url('@/assets/images/slides/saving/frag_2.png') no-repeat;
  background-size: 100%;
  width: 220px;
  height: 220px;
}
.frag_3 {
  background: url('@/assets/images/slides/saving/frag_3.png') no-repeat;
  background-size: 100%;
  width: 220px;
  height: 220px;
}
.frag_4 {
  background: url('@/assets/images/slides/saving/frag_4.png') no-repeat;
  background-size: 100%;
  width: 220px;
  height: 220px;
}

.ot {
  @apply font-semibold text-lg leading-5 rounded-md  px-6 py-2 w-full h-20;
  background-color: #c8102e;
  color: white;
}
</style>
