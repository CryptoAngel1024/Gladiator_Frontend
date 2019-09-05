<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-6 font-Arial mx-14">
      <h2 class="text-4xl font-bold flex justify-between">
        Capital & Rebate Programs
      </h2>
      <h2
        class="text-2xl text-left flex justify-between mt-2 mb-2 mb-9"
        style="color: #63666a"
      >
        Provide ASCs the opportunity to obtain new technology without the
        upfront costs associated <br />
        with traditional capital purchases
      </h2>
      <div
        class="border-t-4 grid grid-cols-3 text-left"
        style="border-color: #003a5d"
      >
        <div>
          <p class="text-xl font-bold mt-3" style="color: #003a5d">
            DePuy Synthes SmartSpend<sup>™</sup> <br />
            ASC Rewards (ASCR) Program
          </p>
          <p class="text-lg mt-2">Flexibility to match your needs.</p>
          <ul class="list-disc ml-4 leading-6">
            <li>New Business Incentive</li>
            <li>Performance Rebate</li>
          </ul>
        </div>
        <div class="border-x-2 -mx-2 mt-3" style="border-color: #d9d9d9">
          <p class="text-xl font-bold mx-6" style="color: #003a5d">
            Capital Placement Program
          </p>
          <p class="text-lg leading-6 mt-2 mx-6">
            Obtain new technology through allocation <br />
            from an annual net purchase commitment <br />
            over multiple years.
          </p>
          <img
            src="@/assets/images/ASC/43-1-1-1.png"
            alt="Visualization Systems"
            class="ml-16"
          />
          <p class="text-sm font-bold text-center">Visualization Systems</p>
          <img
            src="@/assets/images/ASC/43-2-1-1.png"
            alt="Power Tools"
            class="ml-11 scale-110 ml-36"
          />
          <p class="text-sm font-bold text-center -mb-10">Power Tools</p>
        </div>
        <div class="ml-10">
          <p class="text-xl font-bold mt-3" style="color: #003a5d">
            Enabling Technology Growth <br />
            Rebate Program
          </p>
          <p class="text-lg leading-6 mt-2">
            Rebate may be used towards <br />
            purchase, including capital to support <br />
            DePuy Synthes Trauma & Extremities, <br />
            Joint Reconstruction, Mitek, Spine, CMF, and Power Tools service
            lines.
          </p>
        </div>
      </div>
      <div class="flex flex-col justify-start -mb-10 -mt-4 -ml-20 h-32">
        <img
          src="@/assets/images/ASC/downward_arrow.png"
          class="max-w-max ml-20"
          alt="Down Arrow"
        />
        <a
          href="mailto:RA-DPYUS-ASC@ITS.JNJ.com?subject=Request: DePuy Synthes ASC Capital"
        >
          <img
            src="@/assets/images/ASC/learn_more.png"
            class="max-w-max my-5 scale-50 w-72 justify-right mb-20 ml-2 -mt-4"
            alt="Learn More"
          />
        </a>
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1-updated.vue'
export default {
  components: { slideFooter },
}
</script>

<style scoped></style>
