<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        title="DePuy Synthes Trauma"
        :sav-number="1"
        class="pl-6"
        name="SRG"
      />
      <div class="grid grid-cols-3 gap-4 font-Arial pl-5 mt-auto">
        <div class="col-span-2">
          <div class="flex">
            <img
              src="@/assets/images/pie_chart.png"
              alt="piechart"
              class="z-10"
            />
            <div class="relative -ml-10">
              <img src="@/assets/images/usa_map.png" alt="usa-map" />
              <div class="absolute top-16 left-12 text-left">
                <h2 class="text-4xl">MARKET</h2>
                <h1 class="text-4xl font-bold">LEADERSHIP</h1>
                <h5 class="text-lg">U.S TRAUMA</h5>
                <h4 class="text-xl font-semibold">
                  MARKET LEADER<span class="align-top text-sm">1</span>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-1">
          <div class="grid grid-cols-4 gap-2 mt-3">
            <div class="col-span-1">
              <h3 class="text-7xl text-red-600">
                62<span class="align-top text-xl">%</span>
              </h3>
            </div>
            <div class="col-span-3 text-left">
              <p class="font-bold text-lg">
                NET PROMOTER SCORE<span class="align-top text-sm">2</span>
              </p>
              <p class="text-base">
                % of U.S. Surgeons Who Would Recommend DePuy Synthes Trauma to
                Their Peers
              </p>
              <div class="flex mt-3">
                <div class="mt-auto px-2 chart-line-bottom">
                  <div class="w-0 h-0 point point-red" />
                  <div class="w-25 h-28 mx-2.5 bg-red-600" />
                </div>
                <div class="mt-auto px-2 chart-line-bottom">
                  <div class="text-center text-sm">24%</div>
                  <div class="w-0 h-0 point point-black" />
                  <div class="w-25 h-10 mx-2.5 bg-gray-800" />
                </div>
                <div class="mt-auto px-2 chart-line-bottom">
                  <div class="text-center text-sm">18%</div>
                  <div class="w-0 h-0 point point-grey" />
                  <div class="w-25 h-8 mx-2.5 bg-gray-500" />
                </div>
                <div class="mt-auto px-2 relative">
                  <div class="absolute -top-0.5 left-0 chart-line-top">
                    <div class="w-25 h-2 mx-2.5 bg-gray-400" />
                    <div class="w-0 h-0 point point-lightgrey" />
                    <div class="text-center text-sm">-3%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid grid-cols-5 font-Arial"
        style="background-color: #f2f2f2"
      >
        <div class="col-span-1 pt-3 mr-5 pl-5">
          <p class="text-left ml-5">LEGEND</p>
          <div class="p-3 border-2 rounded-3xl border-gray-800">
            <div class="legend-container bg-red-600">DePuy Synthes</div>
            <div class="legend-container bg-gray-800 my-3">Stryker</div>
            <div class="legend-container bg-gray-500 my-3">Zimmer Biomet</div>
            <div class="legend-container bg-gray-400 my-3">Smith & Nephew</div>
            <div class="legend-container bg-gray-200">Other</div>
          </div>
        </div>
        <div class="col-span-4 flex relative">
          <img src="@/assets/images/surgeon.png" alt="surgeon" class="h-64" />
          <div class="text-left pt-5 absolute left-1/4">
            <p class="text-7xl text-red-600">
              88<span class="align-top text-xl">%</span>
            </p>
            <p class="text-lg">
              OF U.S. ORTHOPAEDIC <br />SURGEONS
              <span class="font-bold">USE DEPUY SYNTHES <br />TRAUMA</span
              ><span class="align-top text-sm font-bold">2</span>
            </p>
          </div>
          <div class="flex ml-48">
            <div class="bar-container h-16 w-16 z-30 bg-gray-400">32%</div>
            <div class="bar-container h-20 w-20 z-20 bg-gray-500 -ml-5">
              40%
            </div>
            <div class="bar-container h-28 w-28 z-10 bg-gray-800 -ml-10">
              52%
            </div>
            <div class="bar-container h-36 w-44 bg-red-600 -ml-14">88%</div>
          </div>
        </div>
      </div>
      <div class="text-left font-Arial font-light text-xs mt-1 pl-5">
        <p>
          1. GBI Platform market model, US Share by Competitor based on MAT CC
          sales through Q2’19.
        </p>
        <p>
          2. Symphony Health Solutions, “DePuy Synthes Trauma Global ATU 1: US
          Report (Segment Orthopedic Surgeons)”, 2014.
        </p>
      </div>
      <slideFooter class="mt-auto" :show-third-party-trade-mark="true" />
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
