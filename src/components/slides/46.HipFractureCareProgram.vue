<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full">
      <slideHeader
        class="pl-6 pt-1 pb-0"
        title="Hip Fracture Care Program"
        :sav-number="4"
        name="QOC"
      />
      <div class="flex">
        <p class="text-left text-xl font-bold text-red-700 p-3 py-0 pl-7">
          University of Maryland Upper Chesapeake Health (UM UCH) partners with
          JJMDC to implement an evidence-based care improvement program to
          improve the care of elderly fragility fracture patient population
        </p>
      </div>
      <div class="h-full grid grid-cols-12">
        <div class="col-span-4 pl-6 pr-4">
          <img
            class="object-cover col-span-4"
            src="@/assets/images/building.jpg"
          />
          <div class="text-left bg-gray-50 px-10 py-3">
            <h6 class="italic font-bold">
              “We’ve drastically improved our ability to get patients out of the
              hospital and healthy again. To do this on our own would have been
              challenging. JJMDC enabled us access to experts who have done this
              before and could help us put our program in place.”
            </h6>
            <h6 class="italic font-bold mt-5">
              -Nate Albright, VP Clinical Service Lines
            </h6>
          </div>
        </div>
        <div class="col-span-8 pr-10">
          <div class="grid grid-cols-2 text-left">
            <div class="p-2 pt-0">
              <p class="text-red-700 font-bold text-lg">Needs Identification</p>
              <ol class="list-decimal text-sm pl-4 w-full mt-3">
                <li class="text-pink-500 pb-2 border-b border-black">
                  <span class="text-black"
                    >Facilitate multi-disciplinary care coordination for the
                    treatment of elderly fragility hip fracture patient
                    population</span
                  >
                </li>
                <li class="text-pink-500 py-2 border-b border-black">
                  <span class="text-black"
                    >Establish evidence-based geriatric friendly practices to
                    address the specific needs of this patient population</span
                  >
                </li>
                <li class="text-pink-500 pt-4">
                  <span class="text-black"
                    >Decrease average time between admission and surgery,
                    overall average length of stay, and 30-day all-cause
                    readmission rate</span
                  >
                </li>
              </ol>
            </div>
            <div class="p-2 pt-0">
              <p class="text-red-700 font-bold text-lg">
                JJMDC Available Capabilities & Approach*
              </p>
              <ol class="list-decimal text-sm pl-4 w-full mt-3">
                <li class="text-pink-500 pb-2 border-b border-black">
                  <span class="text-black"
                    >Opportunity assessment conducted to evaluate the current
                    state of care model and identify opportunity areas</span
                  >
                </li>
                <li class="text-pink-500 py-2 border-b border-black">
                  <span class="text-black"
                    >Regular cadence of meetings held with the hospital project
                    lead to ensure timely implementation</span
                  >
                </li>
                <li class="text-pink-500 py-2 border-b border-black">
                  <span class="text-black"
                    >Hip fracture care pathway developed</span
                  >
                </li>
                <li class="text-pink-500 py-2 border-b border-black">
                  <span class="text-black"
                    >Data and metrics monitored to track progress</span
                  >
                </li>
                <li class="text-pink-500 py-2 border-b border-black">
                  <span class="text-black"
                    >Support provided for launching program within the hospital
                    and raising awareness within the local community</span
                  >
                </li>
                <li class="text-pink-500 pt-4">
                  <span class="text-black"
                    >Can be deployed with a Shared Performance Program</span
                  >
                </li>
              </ol>
            </div>
          </div>

          <div class="grid grid-cols-9 bg-gray-50 py-2">
            <div class="col-span-8 flex px-10 mb-3">
              <p class="text-sm pr-4">Results†</p>
              <p class="text-left text-sm">
                Within the first eight months, UM UCH gained valuable insights
                and began to realize significant improvements in its hip
                fracture patient care outcomes
              </p>
            </div>
            <div class="col-span-3 pr-3">
              <div class="grid grid-cols-2 text-left">
                <img
                  class="object-cover pl-4"
                  src="@/assets/jnjIcons/hospital.png"
                />
                <div>
                  <div class="flex mb-3">
                    <p class="text-4xl text-blue-900 font-bold pr-3">63%</p>
                    <img class="" src="@/assets/images/down_arrow.png" />
                  </div>
                  <p class="text-xs font-bold text-blue-900">
                    Reduction in 30-day patient readmission rate1**
                  </p>
                </div>
              </div>
            </div>
            <div class="col-span-3 border-l-2 border-gray-200 pr-3">
              <div class="grid grid-cols-2 text-left">
                <img
                  class="object-cover pl-4"
                  src="@/assets/jnjIcons/clock.png"
                />
                <div>
                  <div class="flex mb-3">
                    <p class="text-4xl text-blue-900 font-bold pr-3">17%</p>
                    <img class="" src="@/assets/images/down_arrow.png" />
                  </div>
                  <p class="text-xs font-bold text-blue-900">
                    Reduction in average time between admission and surgery1**
                  </p>
                </div>
              </div>
            </div>
            <div class="col-span-3 border-l-2 border-gray-200 pr-3">
              <div class="grid grid-cols-2 text-left">
                <img
                  class="object-cover pl-4"
                  src="@/assets/jnjIcons/patient.png"
                />
                <div>
                  <div class="flex mb-3">
                    <p class="text-4xl text-blue-900 font-bold pr-3">14%</p>
                    <img class="" src="@/assets/images/down_arrow.png" />
                  </div>
                  <p class="text-xs font-bold text-blue-900">
                    Reduction in average length of stay 1**
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12">
        <div class="col-span-2" />
        <div class="col-span-8">
          <p class="text-xs text-left text-gray-500">
            †These are examples only and do not guarantee or predict future
            results, which will vary depending on individual circumstances.
            **All p values are &#60;0.05 *All analyses and reviews focused on
            processes and performance related to JJMDC products only. This is a
            fee-for-service offering.
          </p>
          <p class="text-xs text-left text-gray-500">
            1.
            <a
              href="https://www.healthcarebusinesstoday.com/hip-fracture-care-delivery-program-university-of-maryland-upper-chesapeake/"
              target="blank"
              class="text-red-500 underline"
              >https://www.healthcarebusinesstoday.com/hip-fracture-care-delivery-program-university-of-maryland-upper-chesapeake/
            </a>
          </p>
        </div>
        <div class="col-span-2" />
      </div>
      <slideFooter class="-mt-1" />
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
