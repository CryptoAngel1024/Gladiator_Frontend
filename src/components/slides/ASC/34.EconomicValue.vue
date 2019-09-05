<template>
  <section class="h-full">
    <div class="flex flex-col pt-8 font-Arial mx-14">
      <h2 class="text-left text-4xl font-bold">Economic Value</h2>
      <h2
        class="text-2xl text-left flex mt-2 mb-16 mt-2"
        style="color: #63666a"
      >
        DePuy Synthes offers programs & tools designed to address the needs of
        your ASC
      </h2>
      <div class="grid grid-cols-2 gap-7 -mb-8">
        <div
          class="flex flex-col border-title-right border-t-4"
          style="border-color: #003a5d"
        >
          <p
            class="grid justify-end text-xs font-bold text-left space-y-tight mr-6 -mt-1"
            style="color: white"
          >
            Construct Pricing Specifically <br />
            Designed for ASC
          </p>
          <div class="text-left mb-10 grid grid-cols-2 mt-2">
            <p class="text-base leading-tight mt-4">
              DePuy Synthes Pro-Pak<sup>®</sup> Constructs are a
              procedural-based solution <br />
              created for ASCs. Gain the level of quality, value and
              predictability your ASC requires
            </p>
            <img
              src="@/assets/images/ASC/34-1-1-1.png"
              class="w-32 ml-4 flex mt-6 ml-24"
              alt="CPSDA"
            />
          </div>
        </div>
        <div
          class="flex flex-col border-title-left border-t-4"
          style="border-color: #003a5d"
        >
          <p
            class="grid justify-start text-xs font-bold mr-80 ml-11 mt-1"
            style="color: white"
          >
            Spend Analysis Tools
          </p>
          <div class="text-left grid grid-cols-2">
            <img
              src="@/assets/images/ASC/34-1-2-1.png"
              class="w-54 mt-16 ml-1"
              alt="SAT"
            />
            <p class="text-base leading-tight text-right mt-12">
              Resources to help analyze your<br />
              Trauma spend and identify potential <br />
              savings opportunities
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-7">
        <div
          class="flex flex-col border-title-right flex border-t-4"
          style="border-color: #003a5d"
        >
          <p
            class="grid justify-end text-xs font-bold font-Arial mr-12 -mt-1"
            style="color: white"
          >
            Capital Placement & <br />
            Allocation Programs
          </p>

          <div class="text-left grid grid-cols-2">
            <p class="text-base mr-2 leading-tight">
              A range of capital programs that provide your ASC with options to
              obtain new technology, including leases, deferred payment programs
              and capital placement based on purchase commitment
            </p>
            <div class="flex flex-row ml-16">
              <img
                src="@/assets/images/ASC/34-2-1-1.png"
                class="w-28 h-28 mt-10"
                alt="CPAP 1"
              />
              <img
                src="@/assets/images/ASC/34-2-1-2.png"
                class="w-28 h-20 mt-12"
                alt="CPAP 1"
              />
            </div>
          </div>
        </div>
        <div
          class="flex flex-col border-title-left border-t-4"
          style="border-color: #003a5d"
        >
          <p
            class="grid justify-start text-xs font-bold mt-1 ml-3"
            style="color: white"
          >
            Reimbursement Support Services
          </p>
          <div class="text-left grid grid-cols-2">
            <img
              src="@/assets/images/ASC/34-2-2-1.png"
              class="w-28 ml-12 mt-6"
              alt="RSS"
            />
            <p class="text-right mt-7 text-base -ml-4 leading-tight">
              One-on-one customer support with an <br />
              experienced, knowledgeable<br />
              Reimbursement Specialist.<br />
              Service provided via telephone and email
            </p>
          </div>
        </div>
      </div>
      <p class="text-xs flex justify-end mt-10" style="color: #63666a">
        <span style="color: #c800a1">*</span>Includes Brainlab navigation &
        DePuy Synthes owned products. Final terms are subject to approval.
      </p>
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
.border-title-right {
  background: url('@/assets/images/ASC/34-border-header-1.png') no-repeat;
  background-size: 220px;
  background-position: right top;
}

.border-title-left {
  background: url('@/assets/images/ASC/34-border-header-1.png') no-repeat;
  background-size: 220px;
  background-position: left top;
}
</style>
