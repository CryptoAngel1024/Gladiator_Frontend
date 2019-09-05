<template>
  <section class="running h-full">
    <div class="flex flex-col h-full pt-6 font-Arial text-left mx-14">
      <h2 class="text-4xl font-bold mt-2">
        ASC Construct Pricing | Joint Reconstruction
      </h2>
      <h2 class="text-2xl text-left mt-4 mb-2 font" style="color: #63666a">
        DePuy Synthes Pro-Pak<sup>®</sup> Preselected Procedure Constructs
      </h2>
      <div class="grid grid-cols-2 mt-16">
        <div class="-mr-20 text-left">
          <h2
            class="text-2xl text-left mb-6 font leading-tight -mr-20"
            style="color: "
          >
            <b> One market relevant total construct price </b> vs. line item
            pricing <br />
            that may vary depending on what is used in the procedure
          </h2>
          <h2
            class="text-2xl text-left mt-4 mb-6 font -mt-3"
            style="color: #63666a"
          >
            <b>
              Provide your ASC with <br />
              Consistency, Predictability, and Value</b
            >
          </h2>
          <h2 class="text-xl text-left mt-4 mb-4 font -mt-3">
            <b>
              Procedure-based, total knee constructs specifically designed<br />
              for your ASC needs:</b
            >
          </h2>
          <ul class="list-disc ml-4 leading-tight text-lg">
            <li>
              Cemented and uncemented ATTUNE<sup>®</sup> Knee System implants
            </li>
            <li>Optional accessories</li>
          </ul>
        </div>
        <img
          class="w-9/12 grid justify-center ml-20 -mb-10 mt-8"
          src="@/assets/images/ASC/36-1-1-1.0.png"
          alt="Procedure Constructs"
        />
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

<style scoped>
.running {
  background: url('@/assets/images/ASC/35-banner.png') no-repeat;
  background-size: 400px;
  background-position: right top;
}
</style>
