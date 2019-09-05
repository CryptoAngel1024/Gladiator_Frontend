<template>
  <section class="h-full relative">
    <div class="flex flex-col h-full">
      <slideHeader
        title="Innovation Timeline"
        :sav-number="7"
        class="pl-6"
        name="PORT"
      />
      <div class="grid grid-cols-8 pl-6 pb-2">
        <div class="col-span-1 pl-3">
          <div class="flex items-end p-2">
            <p class="text-left pl-2">
              Cannulated Compression Headless Screws (CCHS)
            </p>
          </div>
          <div class="flex items-end pl-4 pt-4">
            <p class="text-left">BME ELITE® Y Continuous Compression Implant</p>
          </div>
          <div class="flex items-end pl-4 pt-10">
            <p class="text-left">SymALIGN® Allograft Wedge</p>
          </div>
          <div class="flex items-end">
            <p class="text-left pl-4 pt-12">Universal Small Fragment System</p>
          </div>
          <div class="flex items-end pl-4 pt-20">
            <p class="text-left pb-10">Femoral Neck System</p>
          </div>
        </div>
        <div class="col-span-1">
          <img class="h-20" src="@/assets/images/screws.png" />

          <img class="h-28 pt-6 pl-2" src="@/assets/images/implant.png" />

          <img class="h-20" src="@/assets/images/wedge.jpg" />

          <img class="h-28 pl-2" src="@/assets/images/fragmentsystem.png" />

          <img class="h-36 w-24 pt-6" src="@/assets/images/femoral.png" />
        </div>
        <div class="col-span-2">
          <div class="relative">
            <p class="relative text-left top-28 w-48 break-normal">
              Reamer Irrigator Aspirator (RIA) 2.0
            </p>
            <img
              class="relative"
              src="@/assets/images/aspirator.png"
              style="transform: rotate(20deg)"
            />
            <div class="relative bottom-20">
              <img
                class="h-48 mx-auto pb-6 bottom-25 z-20"
                src="@/assets/images/curved-plate.png"
              />
              <p class="pl-8 pr-8 text-left">
                Titanium VA LCP® Curved Condylar Plate
              </p>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="relative">
            <p class="absolute text-left top-24 left-12 w-40">
              FIBULINK® Syndesmosis Repair System
            </p>
            <img
              class="absolute top-52 h-64 w-56 pt-6"
              src="@/assets/images/cage.png"
            />
            <p class="absolute top-96 pt-20">
              TRUMATCH® Graft Cage – Long Bone
            </p>
          </div>
        </div>
        <div class="col-span-3">
          <div class="relative">
            <img
              class="absolute h-40 w-80 right-72"
              src="@/assets/images/repair-system.png"
            />
            <div class="grid grid-cols-2" />
            <img
              class="absolute left-28 top-40 h-36 w-1/2"
              src="@/assets/images/prosthesis.png"
            />
            <p class="absolute text-left top-64 pt-6 left-36 w-64">
              Radial Head Prosthesis
            </p>
            <img
              class="absolute top-72 pt-2 left-6 h-44 w-50"
              src="@/assets/images/hammertoe.png"
            />
            <p class="absolute top-96 pt-20 left-28 text-left w-40">
              DePuy Synthes Hammertoe Continuous Compression Implant (CCI)
            </p>
          </div>
        </div>
      </div>
      <div>
        <img
          class="absolute bottom-10 w-full pl-8 pr-2"
          src="@/assets/images/timeline-arrow.png"
        />
      </div>
    </div>

    <slideFooter
      class="mb-0 mt-auto absolute bottom-0 w-full"
      :show-third-party-trade-mark="true"
    />
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
