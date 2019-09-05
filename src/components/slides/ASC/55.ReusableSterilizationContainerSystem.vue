<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mr-2 text-left">
      <slideHeader
        title="Reusable Sterilization Container System"
        sub-title="Rigid, reusable containers designed to maintain sterility for up to 180 days"
        :learn-more="true"
      />
      <div class="grid grid-cols-8 static">
        <div class="col-span-2 static">
          <img
            src="@/assets/images/ASC/55-c1-1.png"
            class="scale-90 top-28 h-2/3 -left-4 absolute"
          />
        </div>
        <div class="col-span-6 mt-2">
          <p class="text-accent-purple mt-auto text-2xl font-bold my-1">
            Why replace blue wrap?
          </p>
          <ul class="list-disc flex flex-col gap-1 text-2xl ml-6 pr-12">
            <li>
              Eliminate wasted resources when re-sterilizing: cost of blue wrap
              and staff time
            </li>
            <li>
              Over 5 years, cumulative savings when transitioning from blue wrap
              to <br />containers is estimated to be
              <strong>$10,238 per tray</strong>
            </li>
            <li>
              Estimated
              <strong>12-19% of surgical waste</strong> is from blue wrap
            </li>
            <li>
              Maintain sterility for a
              <strong>maximum of 180 days</strong>
            </li>
          </ul>
          <div class="flex justify-end h-56 mr-32 pr-1 static">
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="h-4 -mt-5 -mr-10"
            />
            <a
              href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXF0AAO/sterilization-container-system-brochure"
              target="blank"
            >
              <img src="@/assets/images/ASC/55-c2-1.jpg" class="scale-100" />
            </a>
          </div>
        </div>
      </div>
      <ul class="list-decimal text-gray-1 leading-3 text-xs ml-21">
        <li class="bottom-text">
          Elker J. Final Report 180 Day Real Time Event Related Shelf Life Study
          for the Genesis Container Line and NST Series Filter Following Pre-Vac
          Steam Sterilization. DAL# MPD-09-003
        </li>
        <li class="bottom-text">
          Stall NM, Kagoma YM, Bondy JN, Naudie D. Surgical waste audit of 5
          total knee arthroplasties. Canadian journal of surgery. Journal
          canadien de chirurgie. 2013;56(2):97-102
        </li>
        <li class="bottom-text">
          “Reusable totes, blue wrap recycling and composting”. Environmental
          best practices for health care facilities, JHACO environment of care
          standards 1.3 2.3 4.0.
          <u
            >https://19january2017snapshot.epa.gov/www3/region9/waste/p2/projects/hospital/totes.pdf.</u
          >
          November 2002
        </li>
      </ul>
      <slideFooter class="mb-2 footer pt-2" />
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
