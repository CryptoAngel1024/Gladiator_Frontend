<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <slideHeader
        class="pl-6"
        title="Hip Fracture Care Program"
        :sav-number="3"
        name="QOC"
      />
      <div class="flex">
        <p class="text-xl text-gray-600 p-3 pl-7">
          An evidence-based program proven to help reduce costs, length of stay,
          readmission rates, and improve the overall patient experience
          <sup>1</sup>.
        </p>
      </div>
      <div class="h-full grid grid-cols-12 pt-4">
        <img
          class="h-full object-cover col-span-4 pl-6 pr-4"
          src="@/assets/images/walker.png"
        />
        <div class="col-span-8 pr-10">
          <p
            class="pl-2 text-left text-2xl font-bold text-white bg-blue-800 h-10 border-2 border-black"
          >
            Focus: Orthopaedic Episode of Care
          </p>
          <div class="grid grid-cols-3">
            <div class="p-2">
              <p class="text-pink-700 text-left font-bold text-xl">
                Proven Implementation
              </p>
              <p class="text-gray-600 text-left leading-none">
                The Hip Fracture Care Program* has been implemented in over 170
                hospitals across the U.S. and globally.
              </p>
            </div>
            <div class="p-2">
              <p class="text-pink-700 text-left font-bold text-xl">
                Phased Collaboration
              </p>
              <p class="text-gray-600 text-left leading-none">
                Johnson & Johnson Medical Devices Companies (JJMDC) Team
                utilizes a multi-phased approach working in close collaboration
                with the hospital team.
              </p>
            </div>
            <div class="p-2">
              <p class="text-pink-700 text-left font-bold text-xl">
                Patient Engagement
              </p>
              <p class="text-gray-600 text-left leading-none">
                Educational resources designed to engage patients in their care
                from pre-admission through discharge.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-8">
            <div class="col-span-4">
              <p
                class="text-left pl-2 text-2xl font-bold text-white bg-blue-800 h-10 border-2 border-black"
              >
                Delivering Results
                <sup>
                  <span style="font-weight: normal; font-size: 0.8rem">2</span>
                </sup>
              </p>
              <p class="text-left text-md p-2 leading-none">
                <span style="color: #000099; font-weight: bold"
                  >Improved patient</span
                >
                outcomes due to reduced average length of stay and avoidance of
                hospital acquired conditions
              </p>
              <p class="text-left text-md p-2 leading-none">
                <span style="color: #000099; font-weight: bold"
                  >Reduced cost of care</span
                >
                due to shorter average length of stay, increased efficiencies
                and avoidance of complications
              </p>
              <p class="text-left text-md p-2 leading-none">
                <span style="color: #000099; font-weight: bold"
                  >Improved patient experience</span
                >
                with consistent communication to the patient and caregiver
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-xl font-bold text-gray-600 text-left pl-4">
                30-day readmissions
              </p>
              <div class="grid grid-cols-3">
                <img
                  class="object-cover pl-4 border-l-2 border-gray-500"
                  src="@/assets/images/bold_down_arrow.png"
                />
                <div>
                  <p class="text-4xl text-blue-900 font-bold">63%</p>
                  <p class>from 12.4% to 4.6% (p&lt;0.05)</p>
                </div>
              </div>
            </div>
            <div class="col-span-2">
              <p class="text-xl font-bold text-gray-600 text-left pl-4">
                Overall length of stay
              </p>
              <div class="grid grid-cols-3">
                <img
                  class="object-cover pl-4 col-span-1"
                  src="@/assets/images/bold_down_arrow.png"
                />
                <div class="col-span-2">
                  <p class="text-4xl text-blue-900 font-bold break-normal">
                    5.7% - 4.9%
                  </p>
                  <p class>from 5.7 to 4.9 days (p&lt;0.05)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 pt-5">
        <div class="col-span-2" />
        <div class="col-span-8">
          <p class="text-sm text-left text-gray-500">
            These are examples only and do not guarantee or predict future
            results, which will vary depending on individual circumstances. *Hip
            Fracture Care Program is a fee-for-service o­ffering
          </p>
          <p class="text-sm text-left text-gray-500">
            1.
            <a
              href="https://journals.sagepub.com/doi/10.1177/2151459319846057"
            />https://journals.sagepub.com/doi/10.1177/2151459319846057
          </p>
          <p class="text-sm text-left text-gray-500">
            2.
            <a
              href="https://www.healthcarebusinesstoday.com/hip-fracture-care-delivery-program-university-of-maryland-upper-chesapeake/"
            />https://www.healthcarebusinesstoday.com/hip-fracture-care-delivery-program-university-of-maryland-upper-chesapeake/
          </p>
        </div>
        <div class="col-span-2" />
      </div>
      <slideFooter class="mt-auto" />
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
