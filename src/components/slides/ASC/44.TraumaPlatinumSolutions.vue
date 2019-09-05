<template>
  <section class="running h-full">
    <div class="flex flex-col h-full pt-6 font-Arial mx-14">
      <h2 class="flex text-4xl font-bold">Trauma Platinum Solutions</h2>
      <h2 class="text-2xl text-left flex mt-4 mb-2 mb-6" style="color: #63666a">
        Helping you standardize your Trauma business to one vendor with 3 simple
        steps…
      </h2>
      <div class="grid grid-cols-3 text-left mt-2">
        <div class="ml-6 mt-1">
          <div class="flex flex-row">
            <p class="text-6xl font-bold" style="color: #003a5d">1</p>
            <p class="text-xl font-bold mx-6 font-bold" style="color: #003a5d">
              CHOOSE INVENTORY SOLUTIONS PACKAGE
            </p>
          </div>
          <p class="text-xl font-bold ml-4 mt-10 mb-2">
            Own with No Upfront <br />
            Cash Outlay*
          </p>
          <ul class="list-disc ml-8 leading-tight text-lg -mb-5">
            <li>Balance sheet asset</li>
            <li>Zero cash flow impact</li>
          </ul>
          <div class="grid grid-cols-2 gap-14 ml-16 mt-10">
            <div class="-mr-10">
              <img
                src="@/assets/images/ASC/44-1-1-1.png"
                alt="1-1"
                class="-ml-14 scale-105"
              />
              <img
                src="@/assets/images/ASC/44-1-1-3.png"
                alt="1-2"
                class="-mt-4 -ml-8 w-40"
              />
              <p class="text-sm -ml-10">*Sets earned over 3-year period</p>
            </div>
            <img
              src="@/assets/images/ASC/44-1-1-2.png"
              alt="1-3"
              class="w-24 -mt-16 -ml-5"
            />
          </div>
        </div>
        <div class="border-x-2 px-5" style="border-color: #d9d9d9">
          <div class="flex flex-row ml-5 mt-1">
            <p class="text-6xl font-bold" style="color: #003a5d">2</p>
            <p class="text-xl font-bold mx-6 font-bold" style="color: #003a5d">
              EXCHANGE UNDESIRED INVENTORY
            </p>
          </div>
          <p class="text-xl font-bold mt-10 ml-10 mb-2">Receive</p>
          <p class="text-lg leading-tight ml-10">
            A fair market value (FMV) credit <br />
            will be provided for unwanted <br />Trauma inventory
          </p>
          <div class="grid grid-cols-3 -ml-32 mt-4">
            <img
              src="@/assets/images/ASC/44-1-2-1.png"
              alt="Box"
              class="w-32 ml-40"
            />
            <img
              src="@/assets/images/ASC/44-1-2-2-arrow.png"
              alt="Arrow"
              class="w-8 mt-10 ml-36"
            />
            <img
              src="@/assets/images/ASC/44-1-2-3.png"
              alt="Dollar"
              class="w-28 ml-8"
            />
          </div>
          <img
            src="@/assets/images/ASC/44-1-2-4.png"
            alt="FMV Credit"
            class="w-28 -mt-2 ml-32 scale-105 grid"
          />
        </div>
        <div class="ml-5">
          <div class="flex flex-row">
            <p class="text-6xl font-bold" style="color: #003a5d">3</p>
            <p class="text-xl font-bold mx-6 font-bold" style="color: #003a5d">
              USE DEPUY SYNTHES IMPLANTS & SAVE
            </p>
          </div>
          <p class="text-xl font-bold mt-10 ml-6 mb-2">Benefits</p>
          <ul class="list-disc ml-10 text-lg leading-tight">
            <li>Improve OR efficiency</li>
            <li>Reduce operational Expenses</li>
            <li>
              Access to the most comprehensive <br />
              Trauma portfolio
            </li>
          </ul>
          <div class="ml-4 mt-4">
            <img
              src="@/assets/images/ASC/44-1-3-1.png"
              alt="Johnson and Johnson Medical Devices"
            />
            <div class="grid grid-cols-2">
              <img
                src="@/assets/images/ASC/44-1-3-2.png"
                alt="3-1"
                class="ml-10"
              />
              <img src="@/assets/images/ASC/44-1-3-3.png" alt="3-2" />
            </div>
          </div>
        </div>
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
  background: url('@/assets/images/ASC/44-TPS.png') no-repeat;
  background-size: 125px;
  background-position: right 4% top 2%;
}
</style>
