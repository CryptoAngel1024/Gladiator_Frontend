<template>
  <section
    class="h-full overflow-y-auto"
    :class="isPdfView ? 'expandable-slide' : ''"
  >
    <div class="flex flex-col h-full">
      <slideHeader :sav-number="1" name="CS" class="pb-0" />
      <div class="flex flex-col px-6 flex-grow">
        <h1 class="text-5xl font-bold pb-5 text-left">
          Industry Leading Fields Sales Organization
        </h1>
        <div class="flex justify-between pr-24 mb-3">
          <div class="flex flex-col">
            <div class="mb-8 pl-4 text-left">
              <span class="text-red-500 text-xl"
                >1400+ HIGHLY TRAINED, DEDICATED</span
              ><br />
              <span class="text-red-500 font-bold text-xl"
                >SALES CONSULTANTS NATIONWIDE*</span
              ><br />
              <span class="font-bold text-xl">THERE WHEN YOU NEED US</span
              ><br />
            </div>
            <div class="flex items-center">
              <div class="meter h-32 mr-8 relative">
                <div
                  class="absolute meter-small w-16 left-10 leading-0.5 font-bold"
                >
                  Classroom & <br />
                  Cadaver<br />
                  Training
                </div>
                <div class="absolute meter-small top-12 w-16 left-10 font-bold">
                  Field <br />
                  Training
                </div>
                <div
                  class="absolute meter-small top-23 w-16 left-10 leading-0.5 font-bold"
                >
                  Continued <br />Annual Training
                </div>
                <div class="absolute top-1 right-2">
                  <span class="text-2xl text-red-500 font-bold mr-1">250</span
                  >HRS
                </div>
                <div class="absolute top-12 right-2">
                  <span class="text-2xl text-red-500 font-bold mr-1"
                    >50-100</span
                  >HRS
                </div>
              </div>
              <div class="clock h-32 relative">
                <div
                  class="absolute top-16 left-8 text-xl font-bold text-blue-600"
                >
                  24
                </div>
                <div
                  class="absolute top-8 left-21 text-xl font-bold text-blue-600"
                >
                  7
                </div>
              </div>
              <div class="px-4">
                <div class="text-center text-5xl text-red-500 font-bold">
                  365
                </div>
                <div class="text-center font-bold">COVERAGE</div>
              </div>
              <div class="calendar h-32"></div>
            </div>
          </div>
          <div class="display h-full relative">
            <div class="flex flex-col pt-4 text-center">
              <div class="font-bold">TRAUMA<br />SURGERIES</div>
              <div class="text-4xl text-red-500 font-bold">48%</div>
              <div>OCCUR: <span class="font-bold">5PM – 7AM</span></div>
            </div>
            <div class="text-sm font-bold">
              <div class="absolute top-38 right-6 text-white text-xl">31%</div>
              <div class="absolute day top-48 left-7">M</div>
              <div class="absolute day top-48 left-T">T</div>
              <div class="absolute day top-48 left-W">W</div>
              <div class="absolute day top-48 left-TH">TH</div>
              <div class="absolute day top-48 left-32">F</div>
              <div class="absolute text-white day top-48 left-38">SA</div>
              <div class="absolute text-white day top-48 left-SU">SU</div>
            </div>
          </div>
        </div>

        <div class="slide-2-container ml-16 relative">
          <s3Image
            class="object-contain my-auto h-20 absolute -left-12 top-4"
            :s3-directory="`presentations/${presentationId}/`"
            s3-file-name="customerProfile.png"
            alt="Logo"
          />
          <div class="ml-90 text-xl font-bold text-red-500 pt-8 pb-10">
            DePuy Synthes Support Team
          </div>

          <div class="grid grid-cols-3 gap-4 -ml-10">
            <div>
              <div v-for="(name, i) in industryField.address" :key="i">
                <div class="text-xl font-bold text-left">{{ name.type }}:</div>
                <div class="w-full pl-12 text-xl text-left">
                  {{ name.name }}&nbsp;&nbsp;{{ name.contact }}
                </div>
              </div>
            </div>
            <div>
              <div class="text-xl font-bold">Local Sales Consultants</div>
              <div
                v-for="(consultant, i) in industryField.consultants"
                :key="i"
              >
                <div class="w-full text-xl">
                  {{ consultant.name }}&nbsp;&nbsp;{{ consultant.contract }}
                </div>
              </div>
            </div>
            <div class="text-red-500">
              <div class="text-xl font-bold">Years of experience in trauma</div>
              <div class="w-full text-xl font-bold">
                {{ industryField.experience }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <slideFooter class="mt-auto" />
    </div>
  </section>
</template>
<script>
import slideFooter from './slideFooter.vue'
import slideHeader from './slideHeader.vue'
import s3Image from '@/components/utils/s3/s3Image.vue'
import dynamicSlide from './dynamicSlide.js'

export default {
  components: { slideFooter, slideHeader, s3Image },
  props: {
    isPdfView: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const { slideContent: industryField, presentationId } = dynamicSlide('CS1')

    return {
      industryField,
      presentationId,
    }
  },
}
</script>

<style scoped>
.ml-90 {
  margin-left: 23rem;
}
td,
th {
  border-style: hidden !important;
}
.slide-1-container {
  background: url('@/assets/logo/jnj_handshake.png') no-repeat 95% top;
  width: 30px;
  height: 30px;
}
.slide-2-container {
  background: url('@/assets/images/industry.png') no-repeat;
  background-size: 100%;
}
.meter {
  background: url('@/assets/images/meter.png') no-repeat;
  background-size: 100%;
  width: 365px;
}
.clock {
  background: url('@/assets/images/clock.png') no-repeat;
  background-size: 100%;
  width: 130px;
}
.calendar {
  background: url('@/assets/images/calendar.png') no-repeat;
  background-size: 100%;
  width: 130px;
}
.display {
  background: url('@/assets/images/display.png') no-repeat;
  background-size: 100%;
  width: 220px;
}
.meter-small {
  font-size: 10px;
  text-align: right;
}
.day {
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.expandable-slide {
  height: auto;
}
</style>
