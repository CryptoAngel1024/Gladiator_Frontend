<template>
  <section class="h-full relative">
    <div class="flex flex-col h-full">
      <slideHeader
        title="DePuy Synthes Trauma | Product Portfolio"
        :sav-number="2"
        class="pl-6"
        name="APPD"
      />
      <div class="pl-6">
        <p class="text-2xl text-left font-bold text-red-600">
          Complete Solutions to Lean on
        </p>
      </div>
      <div class="grid grid-cols-12">
        <div class="block col-span-5 relative">
          <img
            class="h-128 absolute z-10"
            src="@/assets/images/skele.png"
            style="height: 34rem"
          />
          <p class="float-left pl-2 pt-32 text-red-650 relative z-30 top-96">
            BY ANATOMY
          </p>

          <div class="pl-96">
            <p
              class="text-center text-xl top-16 w-36 relative font-Arial text-white p-1 z-30"
              style="color: #1e22aa; background-color: white"
            >
              SHOULDER &amp; ELBOW
            </p>
          </div>
          <div class="pl-96">
            <p
              class="text-center text-xl top-28 w-32 relative font-Arial text-white p-1 z-30"
              style="color: #1e22aa; background-color: white"
            >
              HAND &amp; WRIST
            </p>
          </div>
          <div class="pl-80">
            <p
              class="text-center text-xl top-44 w-60 font-Arial relative text-white p-1 z-30"
              style="color: #1e22aa; background-color: white"
            >
              INTRAMEDULLARY NAILING
            </p>
          </div>
          <div class="pl-80">
            <p
              class="text-center text-xl top-64 w-36 font-Arial relative text-white p-1 z-30"
              style="color: #1e22aa; background-color: white"
            >
              FOOT &amp; ANKLE
            </p>
          </div>
        </div>
        <div class="col-span-5 relative">
          <img
            class="absolute z-10"
            src="@/assets/images/gray_scale.png"
            style="height: 34rem"
          />
          <p
            class="text-center top-32 w-96 float-right relative font-Arial text-white p-3 z-30"
            style="background-color: #1e22aa"
          >
            PLATES &amp; SCREWS
          </p>

          <p
            class="text-center top-40 w-96 float-right relative font-Arial text-white p-3 z-30"
            style="background-color: #1e22aa"
          >
            EXTERNAL FIXATION &amp; DEFORMITY
          </p>
          <p
            class="text-center top-48 w-96 relative font-Arial float-right text-white p-3 z-30"
            style="background-color: #1e22aa"
          >
            BIOMATERIALS
          </p>
          <p
            class="text-center top-56 w-96 font-Arial relative float-right text-white p-3 z-30"
            style="background-color: #1e22aa"
          >
            CONTINUOS COMPRESSION IMPLANTS
          </p>
        </div>
        <div class="col-span-2 relative pt-32">
          <p class="float-right text-red-650 relative top-96">
            CROSS PORTFOLIO
          </p>
        </div>
        <slideFooter
          class="mb-0 mt-auto absolute bottom-0 w-full z-30"
          :show-third-party-trade-mark="true"
        />
      </div>
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

<style lang="postcss" scoped>
.chart-line-bottom {
  border-bottom: 2px solid rgba(156, 163, 175);
}
.chart-line-top {
  border-top: 2px solid rgba(156, 163, 175);
}
.point {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
.point-red {
  border-bottom: 20px solid rgba(220, 38, 38);
}
.point-black {
  border-bottom: 20px solid rgba(99, 102, 106);
}
.point-grey {
  border-bottom: 20px solid rgba(136, 139, 141);
}
.point-lightgrey {
  border-top: 20px solid rgba(156, 163, 175);
}
.legend-container {
  @apply px-3 py-1 border-2 rounded-lg border-white text-left text-white;
}
.bar-container {
  @apply p-3 mt-auto text-right text-white;
}
</style>
