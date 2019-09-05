<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader
        title="Reusable Sterilization Container System"
        :sav-number="savNumber"
        class="ml-16"
        name="SAV"
      />
      <p class="px-8 mb-6 ml-8 mr-8 text-left desc flex-4 text-3xl">
        Rigid, reusable containers designed to sterilize medical devices and
        maintain sterility for up to 180 days
      </p>

      <div class="flex flex-row width-80 justify-items-center">
        <div class="flex vert-center">
          <div class="img-1" />
        </div>

        <div class="space-y-3">
          <p class="text-3xl text-left desc">
            Switching to the Reusable Sterilization Container System can help
            reduce overall hospital costs, considering the cost of blue wrap,
            autoclave tape, and labor time.
          </p>
          <li class="text-2xl text-left desc colored-bullet">
            <span class="blue-text"
              >7% of the time blue wrap sets present ripped</span
            >
            in the OR*
          </li>
          <div class="flex flex-row">
            <div class="space-y-1">
              <p class="text-2xl text-left desc pad-right">
                When tears are discovered, re-sterilization could mean:
              </p>
              <div>
                <li class="text-2xl text-left minus-bullet desc">
                  More anesthesia time for the patient
                </li>
                <li class="text-2xl text-left minus-bullet desc">
                  Additional cost and time added to the case
                </li>
              </div>
              <li class="text-2xl text-left desc colored-bullet">
                OR time on average costs
                <span class="blue-text">$63/minute</span> **
              </li>
            </div>
            <div class="justify-center img-2" />
          </div>
        </div>
      </div>
      <div
        class="flex flex-col justify-end flex-1 px-4 mb-2 ml-8 text-left second-footer"
      >
        <p class="text-xs">* DePuy Synthes Sterile Containers ROI</p>
        <p class="text-xs">
          ** A Study of Time Dependent Operating Room Fees and How to Save $100
          000 by using Time-Saving Protocols.” Ronald D. Shippert, MD. The
          American Journal of Cosmetic Surgery Vol 22 No 1 2005.
        </p>
      </div>
      <!-- content body -->
      <slideFooter class="mb-2 ml-8" />
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
      default: 9,
    },
  },
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

.width-80 {
  width: 90%;
  margin: auto;
}

.vert-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
}

.img-1 {
  background: url('@/assets/images/slides/saving/sav9-01.png') no-repeat;
  background-size: contain;
  height: 80%;
  width: 80%;
  justify-content: center;
  align-items: center;
}

.img-2 {
  background: url('@/assets/images/slides/saving/sav9-02.png') no-repeat;
  background-size: contain;
  height: 14rem;
  width: 40%;
}

.blue-text {
  color: #1f21aa;
  font-weight: bold;
}
.colored-bullet {
  list-style: none;
  padding-left: 1em;
  text-indent: -1em;
}

.colored-bullet:before {
  content: '\2022';
  color: #00b5e2;
  margin-right: 1rem;
}

.minus-bullet {
  list-style: none;
  padding-left: 4em;
  text-indent: -1em;
}

.minus-bullet:before {
  content: '-';
  color: #00b5e2;
  padding-right: 5px;
}

.ot {
  @apply font-semibold text-lg leading-5 rounded-md  px-6 py-2 w-full h-20;
  background-color: #c8102e;
  color: white;
}
</style>
