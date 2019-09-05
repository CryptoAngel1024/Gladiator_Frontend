<template>
  <section class="h-full">
    <div class="flex flex-col h-full mx-14 relative">
      <div class="flex justify-between pt-8">
        <div class="text-4xl text-slidColor-headertext-left font-bold pb-2">
          Comprehensive Surgical Sports Medicine Solutions
        </div>
        <div class="flex flex-col relative">
          <div class="flex absolute -top-5 left-0">
            <div class="triangle"></div>
            <div class="triangle mx-2"></div>
            <div class="triangle"></div>
          </div>
          <button
            class="text-gray-800 text-xl font-bold bg-gray-60 border-gray-40 border-2 rounded-2xl px-2 py-2"
          >
            Learn more
          </button>
        </div>
      </div>
      <div class="flex justify-between pt-8">
        <div class="flex flex-col text-left pt-4 w-4/15">
          <div class="text-dark-red text-xl font-bold">
            PUREVUE<sup>®</sup>Visualization System
          </div>
          <div class="py-2 border-y-2 text-lg">
            High quality imaging for minimally invasive surgery
          </div>
          <ul class="list-disc text-lg ml-4 py-2">
            <li>Excellent, real-time<sup>1</sup> 4K image quality</li>
            <li>Compact, designed for ease of use, scalable offering</li>
            <li>Comprehensive case management and full EMR data integration</li>
            <li>Full range of high-quality optical accessories</li>
            <li>Backed by broad service and repaire offerings</li>
          </ul>
        </div>
        <div class="circle-center w-1/3">
          <img src="@/assets/images/slide23.png" class="w-101" />
          <div class="absolute top-7 text-xxs text-left left-52 w-28">
            COOLPULSE® Technology Electrodes
          </div>
          <img
            class="absolute top-12 left-64 w-16 h-16"
            src="@/assets/images/part1.png"
          />
          <img
            class="absolute top-36 left-74"
            src="@/assets/images/part2.png"
          />
          <div class="absolute top-48 text-xxs text-left left-75 w-24">
            VAPR VUE® Radiofrequency Electrode System
          </div>
          <img
            class="absolute top-69 left-60"
            src="@/assets/images/part3.jpg"
          />
          <div class="absolute top-81 text-xs text-left left-52 w-20 h-20">
            Shaver Blades & Burrs
          </div>

          <img
            class="absolute top-67 left-14"
            src="@/assets/images/part4.png"
          />
          <div class="absolute top-80 text-xxs text-right left-24 w-20 h-20">
            FMS VUE® II Fluid Management and Tissue Debridement System
          </div>
          <img class="absolute top-36 left-4" src="@/assets/images/part5.png" />
          <div class="absolute top-48 text-xxs text-right left-1 w-20 h-20">
            PUREVUE® Camera Proprietary Sensor Technology
          </div>
          <img
            class="absolute top-12 left-19"
            src="@/assets/images/part6.png"
          />
          <div class="absolute top-7 text-xxs text-right left-20 w-24">
            PUREVUE® Visualization System
          </div>
          <div class="flex absolute top-36 left-52">
            <div class="triangle-s"></div>
            <div class="triangle-s mx-2"></div>
            <div class="triangle-s"></div>
          </div>
          <a
            href="https://jnj.showpad-solutions.com/?experience=DPS-Mitek"
            class="share-link w-18 h-36 flex"
          >
            <img src="@/assets/images/part7.png" />
          </a>
          <div class="absolute top-68 text-white left-44 text-xxs">CAPITAL</div>
        </div>
        <div class="flex flex-col text-left pt-4 pl-2 w-4/17">
          <div>
            <div class="text-dark-red text-xl font-bold">
              VAPR VUE<sup>®</sup> Radiofrequency Electrode System
            </div>
            <div class="py-2 border-y-2 text-lg">
              Engineered for optiomal joint access, ablation efficiency, and
              clarify
            </div>
            <ul class="list-disc text-lg ml-4 py-2">
              <li>
                Faster ablation<sup>2,3</sup> at equivalent <sup>2</sup>/lower
                <sup>2,3</sup> temperatures versus tested competitors
              </li>
              <li>
                Broad electrode portfolio to meet your anatomical access needs
              </li>
            </ul>
          </div>
          <div>
            <div class="text-dark-red text-xl font-bold border-t-2 py-2">
              FMS VUE<sup>®</sup> II Fluid Management and Tissue Debridement
              System
            </div>
            <div class="py-2 border-y-2 text-lg">
              Reliable fluid management combined with soft tissue and bone
              resection
            </div>
            <ul class="list-disc text-lg ml-4">
              <li>
                Combination inflow/outflow pump and shaver resection system
              </li>
              <li>Wide range of efficient shavers for your needs</li>
            </ul>
          </div>
        </div>
      </div>
      <ol class="text-xxs text-left list-decimal pl-4 -mt-10">
        <li>
          DePuy Synthes. Mitek Sports Medicine. Image Processing Speed vs.
          Competitive Devices August 24, 2016. (DAL Report: 103285715).
        </li>
        <li>
          DePuy Synthes. Mitek Sports Medicine VAPR COOLPULSE Curve Test Report.
          Versus tested leading competitors. March 27, 2018. (ADAPTIV:
          103461953).
        </li>
        <li>
          DePuy Synthes/ Mitek Sports Medicine VAPR TS90 Ablation Rate Test
          Report. Versus tested leading competitor. April 28, 2018. (DAL REPORT:
          DN00009991)
        </li>
      </ol>
      <slideFooter class="mb-0 mt-auto" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'

export default {
  components: { slideFooter },
}
</script>
<style scoped>
.triangle {
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom: 0;
  border-top: 12px solid #63666a;
}
.triangle-s {
  width: 0;
  height: 0;
  border: 4px solid transparent;
  border-bottom: 0;
  border-top: 8px solid #63666a;
}
.circle-center {
  position: absolute;
  top: calc(50% - 206px);
  left: calc(50% - 206px);
}
.share-link {
  position: absolute;
  top: 120px;
  left: 150px;
}
</style>
