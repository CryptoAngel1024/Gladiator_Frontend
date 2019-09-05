<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Data observations & Potential Savings Opportunities"
        :sav-number="3"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <p class="px-8 mb-3 ml-8 mr-8 text-left desc flex-4 text-2xl">
        Vendor spend comparison based on over 400+ customer spend analyses and
        SKU level invoice data for 1300 hospitals as reported by
        <span class="text-black underline">Decision Resource Group (2019)</span>
      </p>

      <div class="main-bg flex-grow">
        <div class="flex flex-row-reverse pt-5 pr-32 w-full">
          <p class="text-white text-right pt-7 w-72 text-2xl">
            Compare national pricing trends among vendors
          </p>
          <div class="mr-7">
            <p class="circle-text">National Pricing Trends</p>
            <div class="img-sav img-2" />
          </div>
        </div>

        <div class="flex flex-row pl-28 pt-7 w-full">
          <p class="text-white text-left pt-8 w-64 text-2xl">
            See the benefits of standardizing to a Simplified Portfolio
          </p>
          <div class="ml-1">
            <p class="circle-text">Simplified Portfolio</p>
            <div class="img-sav img-1" />
          </div>
        </div>

        <div class="flex flex-row-reverse mt-2 pr-32 w-full">
          <p class="text-white text-right pt-7 w-64 text-2xl">
            Uncover possible hidden procedure expenses
          </p>
          <div class="mr-7">
            <p class="circle-text">Procedural Efficiency</p>
            <div class="img-sav img-3" />
          </div>
        </div>
      </div>
      <slideFooter class="mb-2 ml-8" :show-third-party-trade-mark="true" />
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

.circle-text {
  @apply text-xl text-center;
  width: 9rem;
  color: black;
  font-weight: bold;
}

.img-1 {
  background: url('@/assets/images/slides/saving/sav3-01.png') no-repeat center
    center;
}
.img-2 {
  background: url('@/assets/images/slides/saving/sav3-02.png') no-repeat center
    center;
}
.img-3 {
  background: url('@/assets/images/slides/saving/sav3-03.png') no-repeat center
    center;
}
.img-sav {
  height: 5rem;
  background-size: contain;
  background-position: top;
}

.main-bg {
  background: url('@/assets/images/slides/saving/sav3.svg') no-repeat center
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
