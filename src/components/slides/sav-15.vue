<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full">
      <slideHeader title="" :sav-number="15" class="ml-16" name="SAV" />
      <div class="flex flex-row">
        <img
          class="w-80 -mt-14 object-contain"
          src="@/assets/images/slides/saving/sav15-01.png"
        />
        <p class="text-left text-2xl">
          A suite of solutions providing a simple process to fully integrate
          DePuy Synthes instruments, implants, and sterilization containers
          within your healthcare facility.
        </p>
      </div>
      <div class="flex justify-center">
        <div class="w-90 h-99 border-2 border-color relative rounded-xl">
          <div
            class="absolute bg-blue-700 rounded-full -mt-4 -ml-4 w-12 h-12 flex items-center justify-center"
          >
            <div class="text-2xl text-white font-bold order-red">1</div>
          </div>
          <div
            class="bg-red-600 h-16 font-bold text-white text-2xl rounded-t-xl"
          >
            Choose <br />Solutions Package
          </div>
          <div class="relative">
            <img
              src="@/assets/images/slides/saving/1-1.png"
              class="w-38 h-20 absolute top-2 left-3"
            />
            <div class="font-bold text-blue-555 absolute top-8 right-2">
              Universal Small<br />Fragment System
            </div>
            <img
              src="@/assets/images/slides/saving/1-2.png"
              class="w-24 h-20 absolute top-28 left-10"
            />
            <div class="font-bold text-blue-555 absolute top-52 left-2">
              Sterilization <br />Containers
            </div>
            <img
              src="@/assets/images/slides/saving/1-4.png"
              class="w-20 h-48 absolute top-20 right-5"
            />
            <div class="font-bold text-blue-555 absolute top-56 right-28">
              Trauma <br />Portfolio
            </div>
            <div class="absolute top-68 text-left px-4">
              <div class="font-bold text-xl">Own With No Cash Outlay*</div>
              <div class="text-xs">(sets earned over 3 years)</div>
              <ul class="ml-8 leading-5">
                <li class="list-disc">A balance sheet asset</li>
                <li class="list-disc">Zero cash flow impact</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-90 h-99 mx-8 border-2 border-color relative rounded-xl">
          <div
            class="absolute bg-blue-700 rounded-full -mt-4 -ml-4 w-12 h-12 flex items-center justify-center"
          >
            <div class="text-2xl text-white font-bold order-red">2</div>
          </div>
          <div
            class="bg-red-600 h-16 font-bold text-white text-2xl rounded-t-xl"
          >
            Sell <br />Undesired Inventory
          </div>
          <div class="relative flex justify-center">
            <div
              class="rounded-full border-2 w-48 h-48 flex justify-center items-center mt-10 border-gray-1"
            >
              <div class="transform -rotate-45">
                <div class="text-5xl font-bold text-color">FMV</div>
                <div class="text-3xl font-bold text-blue-555">CREDIT</div>
              </div>
            </div>
            <div class="absolute top-64 text-left px-4">
              <div class="font-bold text-xl">Receive</div>
              <ul class="ml-8">
                <li class="list-disc leading-5">
                  A fair market value (FMV) credit will be provided for unwanted
                  Trauma inventory
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="w-90 h-99 border-2 border-color relative rounded-xl">
          <div
            class="absolute bg-blue-700 rounded-full -mt-4 -ml-4 w-12 h-12 flex items-center justify-center"
          >
            <div class="text-2xl text-white font-bold order-red">3</div>
          </div>
          <div
            class="bg-red-600 h-16 font-bold text-white text-2xl flex items-center justify-center rounded-t-xl"
          >
            <div>Use and Save</div>
          </div>
          <div class="relative">
            <div class="relative">
              <img
                src="@/assets/images/slides/saving/3-1.png"
                class="w-20 h-24 absolute top-1 left-14"
              />
              <img
                src="@/assets/images/slides/saving/3-2.png"
                class="w-20 h-20 absolute top-10 right-16"
              />
              <img
                src="@/assets/images/slides/saving/3-3.png"
                class="w-24 h-24 absolute top-21 right-1"
              />
              <img
                src="@/assets/images/slides/saving/3-4.png"
                class="w-20 h-10 absolute top-44 right-20"
              />
              <img
                src="@/assets/images/slides/saving/3-5.png"
                class="w-28 h-20 absolute top-40 left-12"
              />
            </div>

            <div class="absolute top-64 text-left px-4">
              <div class="font-bold text-xl">Benefits</div>
              <ul class="ml-8 leading-5">
                <li class="list-disc">Improved OR Efficiency</li>
                <li class="list-disc">Maximize savings opportunities</li>
                <li class="list-disc">Reduce vendor traffic</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <!-- <img
        src="@/assets/images/slides/saving/sav15.png"
        class="w-3/4 mx-auto object-contain"
      /> -->

      <div
        class="flex flex-col justify-end flex-1 px-4 ml-8 text-left second-footer text-xs"
      >
        <p>
          *Reconciliation required at end of program which may require invoicing
          of any shortfall if purchasing levels not met
        </p>
        <p>
          This document contains confidential and proprietary trade secrets of
          DePuy Synthes Sales, Inc. Its contents may not be disclosed by an
          authorized recipient without prior written consent of DePuy Synthes.
        </p>
      </div>
      <slideFooter class="mb-2 ml-8" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>

<style scoped lang="postcss">
.second-footer p {
  color: #7f7f7f;
}
.border-color {
  border-color: #ab9767;
}
.text-color {
  color: #ab9767;
}
.order-red {
  box-shadow: -25px 15px 20px rgba(0, 0, 0, 0.5);
}
</style>
