<template>
  <section class="static h-full">
    <div class="flex flex-col pt-6 h-full font-Arial">
      <div class="flex flex-col mx-14">
        <div class="-mb-20 text-left">
          <h2 class="mt-2 text-4xl font-bold text-slidColor-header">
            ANTERIOR ADVANTAGE™ Hip Replacement
          </h2>
          <h2
            class="mt-3 mb-1 text-2xl text-slidColor-header"
            style="color: #63666a"
          >
            DePuy Synthes offers <strong>ANTERIOR ADVANTAGE</strong>, a
            differentiated solution for anterior approach
          </h2>
        </div>
        <div class="flex justify-end -translate-y-20">
          <div class="mt-8 -mb-12 h-32">
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="ml-20 max-w-max translate-x-14 translate-y-3"
            />
            <img
              src="@/assets/images/ASC/learn_more.png"
              class="my-5 w-72 max-w-max scale-50 translate-x-16 -translate-y-7 justify-right"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 pb-5 text-justify">
          <div class="pr-6">
            <h2 class="text-xl font-bold text-slidColor-header">Includes:</h2>
            <ul
              class="text-sm flex flex-col pl-3 list-disc text-slidColor-header"
            >
              <li>Hip implant products</li>
              <li>Instrumentation</li>
              <li>Enabling technologies</li>
              <li>World-class professional education</li>
            </ul>
          </div>
          <div class="pl-6 border-l">
            <h2 class="text-xl font-bold text-slidColor-header">
              Potential Benefits of Anterior Approach <br />
              Compared to Traditional Approach:
            </h2>
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              width="40"
              class="mt-2 ml-2"
              alt="downward arrow"
            />
            <a
              href="https://www.jnjmedicaldevices.com/en-US/campaign/anterior-advantage-hcp"
              target="blank"
            >
              <ul
                class="flex flex-col text-sm pt-2 pl-4 list-disc text-red-700 col-span-4 font-bold"
              >
                <li>
                  Less pain
                  <span class="text-slidColor-header font-normal"
                    >postop day one<sup>1</sup></span
                  >
                </li>
                <li>
                  Faster recovery<sup class="text-slidColor-header font-normal"
                    >1</sup
                  >
                </li>
                <li>
                  Cost savings<sup class="text-slidColor-header font-normal"
                    >2</sup
                  >
                </li>
              </ul>
            </a>
          </div>
        </div>
        <div class="grid grid-cols-2" style="background-color: #f2f2f2">
          <div class="grid grid-cols-2">
            <div class="col-1 text-left flex justify-between">
              <div class="py-16 ml-4">
                <h2 class="text-xl font-bold text-slidColor-header">
                  Anterior Approach <br />Pathways
                </h2>
                <p class="text-sm">Suite of Educational<br />Resources</p>
              </div>
              <div>
                <img
                  src="@/assets/images/ASC/downward_arrow1.png"
                  width="65"
                  class="mt-8"
                  alt="downward arrow"
                />
              </div>
            </div>
            <div class="col-2 relative">
              <a
                href="https://jnjinstitute.com/en-us/online-profed-resources/joint-arthroplasty"
                target="blank"
                class="absolute -left-24 -bottom-16"
              >
                <img width="250" src="@/assets/images/ASC/29-1.png" />
              </a>

              <img
                class="absolute bottom-0 -left-24"
                width="180"
                src="@/assets/images/ASC/29-1-1.png"
              />
            </div>
          </div>
          <div class="grid grid-cols-2">
            <div class="col-1 text-left flex justify-between">
              <div class="py-16 ml-4">
                <h2 class="text-xl font-bold text-slidColor-header">
                  Enabling Technology<br />Growth Rebate Program
                </h2>
                <p class="text-sm">
                  Access enabling technology for <br />Anterior Approach through
                  a <br />financing option
                </p>
              </div>
              <div>
                <img
                  src="@/assets/images/ASC/downward_arrow1.png"
                  width="65"
                  class="mt-14"
                  alt="downward arrow"
                />
              </div>
            </div>
            <a
              href="https://www.jnjmedicaldevices.com/en-US/campaign/anterior-advantage-hcp"
              target="blank"
            >
              <img
                width="240"
                src="@/assets/images/ASC/29-2.png"
                class="mt-16"
              />
            </a>
          </div>
        </div>
        <ul class="list-decimal gap-0 text-slidColor-header text-xs text-left">
          <li class="my-auto bottom-text">
            Barrett WP, et al, Prospective Randomized Study of Direct Anterior
            vs. Postero-Lateral Approach for Total Hip Arthroplasty, The
            <em>Journal of Arthroplasty</em> 28 (2013) 1634-1638.
          </li>
          <li class="my-auto bottom-text">
            Miller LE, Martinson MS, Gondusky JS, Kamath AF, Boettner F,
            Bhattacharyya S. Ninety-day postoperative cost in primary total hip
            arthroplasty: An economic model comparing surgical approaches.
            ClinicoEconomics and Outcomes Research. 2019; 11 145-149.
          </li>
        </ul>

        <slideFooter class="pt-3" />
      </div>
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideFooter },
}
</script>

<style lang="postcss" scoped>
.bottom-text {
  margin-left: 1%;
  font-size: 8px;
}
</style>
