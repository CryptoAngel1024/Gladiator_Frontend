<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full justify-around">
      <slideHeader
        title="DePuy Synthes Inventory Management System (eSIMS)"
        :sav-number="13"
        class="ml-16"
        name="SAV"
      />
      <!-- content body -->
      <div
        class="flex-2 flex flex-row mx-8 px-8 pt-2 my-auto items-start w-full justify-between"
      >
        <div class="sav13 flex-2 h-full w-3/5" />
        <div class="flex-1 flex ml-2 flex-col w-2/5">
          <div class="w-full scanner pl-4">
            <img src="@/assets/images/slides/saving/sav13-scanner.png" alt="" />
          </div>
          <div class="text-left">
            <h4 class="lt mt-2 mb-1">Simplify Ordering and Save Time</h4>
            <ul class="list-disc leading-6 pl-5 text-lg">
              <li>Storage and scanning technology linked to your ERP system</li>
              <li>Real-time visibility of inventory</li>
              <li>Decreases risk of out-of-stock items</li>
              <li>Leverage to customize backup inventory</li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="flex-1 second-footer mt-4 flex flex-col justify-center max-h-12 h-1/5 ml-12 text-left mb-2 w-3/4"
      >
        <p class="text-xl text-center">
          The right product, the right quantities, the right time…. every time
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
}
</script>

<style scoped lang="postcss">
.title {
  color: #212121;
}

.desc {
  color: #63666a;
}

.sav13 {
  background: url('@/assets/images/slides/saving/sav13.png') no-repeat center
    center;
  background-size: contain;
  background-position: top;
}

.ot {
  @apply font-semibold text-lg leading-5 rounded-md  px-6 py-2 w-full h-20;
  background-color: #c8102e;
  color: white;
}

.second-footer {
  @apply rounded-md;
  background-color: #c8102e;
  color: white;
}

.second-footer p {
  @apply font-bold;
  color: white;
}

.scanner {
  color: #fac8d0;
}

.lt {
  @apply font-bold text-xl;
  color: #1e22aa;
}
</style>
