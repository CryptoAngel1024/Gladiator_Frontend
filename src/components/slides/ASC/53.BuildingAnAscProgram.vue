<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 text-left mx-14">
      <slideHeader
        title="Building an ASC Program"
        sub-title="Resources and educational content to support building a successful ASC Orthopaedics Program"
        :learn-more="true"
        class="mx-0"
      />

      <div class="grid grid-cols-2 gap-6">
        <div class="flex">
          <div class="vertical-bottom-top-text py-4 text-2xl"></div>
          <div class="">
            <p class="mt-auto text-2xl font-bold mb-3" style="color: #63666a">
              ASC SPEAKER SERIES
            </p>
            <p class="mt-auto pb-1 text-xl font-semibold">
              Short video discussions recorded with ASC
              <br />thought leaders
            </p>
            <p class="mt-auto text-lg text-accent-purple font-semibold py-1">
              INCLUDES CONTENT REGARDING
            </p>
            <ul class="list-disc text-xl ml-4 w-full">
              <li>ASC Trends, Definitions, and Rules</li>
              <li>Optimizing Operational Efficiency</li>
              <li>Responsible Financial Success</li>
              <li>Designing to Optimize Clinical Outcomes</li>
            </ul>
            <div class="flex justify-center mt-2 h-56 -ml-14">
              <img
                src="@/assets/images/ASC/downward_arrow.png"
                class="h-4 absolute -ml-9 mt-2"
              />
              <a
                href="https://www.jnjmedicaldevices.com/en-US/service/asc-speaker-series"
                target="blank"
              >
                <img
                  src="@/assets/images/ASC/53-c1-1.png"
                  class="h-48 mt-6 ml-2"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="vertical-bottom-top-text px-2 py-4 text-2xl"></div>
          <div>
            <p class="mt-auto text-2xl font-bold mb-3" style="color: #63666a">
              ASC CAPABILITIES WORKBOOK
            </p>
            <p class="mt-auto text-xl font-bold pb-1">
              Digital workbook with questions and resources
              <br />to consider when starting an ASC Program
            </p>
            <p class="mt-auto text-lg text-accent-purple font-semibold py-1">
              SECTIONS INCLUDE:
            </p>
            <ul class="list-disc text-lg ml-4 w-full text-black-500">
              <li>How To Get Started</li>
              <li>Assembling and Aligning the Team</li>
              <li>Space Planning and Considerations</li>
            </ul>
            <div class="flex justify-center mt-10">
              <img
                src="@/assets/images/ASC/downward_arrow.png"
                class="h-4 absolute -ml-80 mt-2"
              />
              <a
                href="https://medjweb.medicdigital.com/general/apply-code/myasc101"
                target="blank"
              >
                <img
                  src="@/assets/images/ASC/53-c2-1.png"
                  class="h-48 mt-6 ml-2"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <slideFooter class="py-2" />
    </div>
  </section>
</template>

<script>
import slideHeader from '@/components/slides/slideHeaderASC.vue'
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideHeader, slideFooter },
}
</script>

<style>
.footer {
  padding-left: 66px;
  padding-right: 100px;
  padding-bottom: 34px;
}
</style>
