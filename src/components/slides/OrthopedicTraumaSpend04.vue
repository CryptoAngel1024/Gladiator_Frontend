<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Orthopedic Trauma Spend Analysis"
        :sav-number="4"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <div class="px-8 mb-6 ml-8 mr-8 text-left desc flex-4">
        <p class="text-2xl">
          Vendor spend comparison based on SKU level invoice data for 1300
          hospitals as reported by
          <span class="text-black underline"
            >Decision Resource Group (2019)</span
          >
        </p>
      </div>
      <div class="gr justify-items-center" />
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

<style scoped>
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
  background: url('@/assets/images/slides/saving/sav4.png') no-repeat center
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
