<template>
  <section class="h-full relative">
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-11">
        <div class="col-span-8 pl-16 pt-6">
          <p class="text-left text-4xl font-bold w-full">
            DePuy Synthes Pro-Pak<sup>®</sup> Constructs
          </p>
          <p class="text-left text-2xl text-gray-600">
            Procedure based constructs designed for Ambulatory Surgery Centers
          </p>
        </div>
        <div class="col-span-3">
          <img class="h-24 w-full" src="@/assets/images/side_skele.png" />
        </div>
      </div>
      <div class="w-full h-2" style="background-color: #f4f3ef" />
      <div class="grid grid-cols-11 gap-2 pt-2">
        <div class="col-span-6 pl-16">
          <div>
            <p class="text-lg font-bold text-left" style="color: #1e22aa">
              Wrist
            </p>
            <ul
              class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
            >
              <li>Distal Radius – Locking Compression Plate (LCP®)</li>
              <li>Distal Radius – Variable Angle (VA)</li>
              <li>Distal Radius Sterile Kit – VA (Sterile)</li>
            </ul>
            <div class="grid grid-cols-2">
              <div class="col-span-1">
                <div>
                  <p
                    class="text-lg font-bold text-left pt-3"
                    style="color: #1e22aa"
                  >
                    Hand
                  </p>
                  <ul
                    class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                  >
                    <li>Hand – Non-Locking</li>
                    <li>Hand – LCP</li>
                  </ul>
                </div>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Clavicle
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Clavicle – Mid-Shaft LCP</li>
                  <li>Clavicle – Lateral LCP</li>
                  <li>Clavicle – LCP Recon</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Shoulder
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Proximal Humerus – LCP</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Elbow
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Olecranon – LCP</li>
                  <li>Olecranon – VA</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Cannulated Screws
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Headed</li>
                  <li>Headless</li>
                </ul>
              </div>
              <div class="col-span-1">
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Ankle
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Fibula – One-Third Tubular</li>
                  <li>Fibula – LCP</li>
                  <li>Fibula – VA</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Foot
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>Foot – LCP</li>
                  <li>Foot – VA</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Hammertoe
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 tracking-wider"
                >
                  <li>HAMMERLOCK® 2 Implant System</li>
                </ul>
                <p
                  class="text-lg font-bold text-left pt-3"
                  style="color: #1e22aa"
                >
                  Continuous Compression Implants (CCIs)
                </p>
                <ul
                  class="list-disc text-left pl-5 text-sm text-gray-600 w-full tracking-wider"
                >
                  <li>BME SPEED™ Implant System, Standard (Sterile)</li>
                  <li>SPEEDTITAN® Implant System, Large (Sterile)</li>
                  <li>BME ELITE® Implant System (Sterile)</li>
                  <li>SPEEDARC® Implant System (Sterile)</li>
                  <li>SPEEDTRIAD® Implant System (Sterile)</li>
                  <li>SPEEDSHIFT® Implant System (Sterile)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="col-span-5">
          <img class="w-full" src="@/assets/images/constructs.png" />
        </div>
        <router-link
          class="absolute-position"
          :to="linkToEnabledSlidePerCategory"
        >
          <img class="pr-2 h-12" src="@/assets/jnjIcons/plan.png" />
          <p class="text-base text-center font-bold text-blue-900">
            <span class="block pl-2">PORT</span>5
          </p>
        </router-link>
        <slideFooter class="mb-0 mt-auto absolute bottom-0 w-full" />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import useSlideSectionLink from './slideSectionLink.js'

export default {
  components: { slideFooter },
  setup() {
    const { linkToEnabledSlidePerCategory } = useSlideSectionLink(
      'COMPREHENSIVE_PORTFOLIO',
    )

    return {
      linkToEnabledSlidePerCategory,
    }
  },
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
.absolute-position {
  z-index: 10;
  display: flex;
  position: absolute;
  bottom: 15px;
  right: 15px;
}
</style>
