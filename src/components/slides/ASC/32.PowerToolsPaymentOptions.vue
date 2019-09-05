<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-6 font-Arial mx-14">
      <div class="flex flex-col">
        <div class="text-left -mb-20">
          <h2 class="text-4xl font-bold text-slidColor-header mt-2">
            Power Tools Payment Options
            <br />
          </h2>
          <h2
            class="text-2xl text-slidColor-header text-left mt-4 mb-6 font"
            style="color: #63666a"
          >
            Options to fit multiple financial objectives
          </h2>
        </div>
        <div class="flex justify-end -translate-y-20 -mb-20">
          <div class="mt-5 h-32 -mb-20">
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="max-w-max ml-20 translate-x-14 -translate-y-2 mt-3"
            />
            <img
              src="@/assets/images/ASC/learn_more.png"
              class="max-w-max my-5 scale-50 w-72 justify-right translate-x-16 -translate-y-12 mb-20"
            />
          </div>
        </div>
        <div class="flex justify-center -mt-4 ml-20 translate-x-12">
          <div class="flex flex-col">
            <img
              src="@/assets/images/ASC/downward_arrow.png"
              class="w-11 translate-x-3"
            />
            <a
              href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXgzAAG/power-purchase-options"
              target="_blank"
            >
              <img src="@/assets/images/ASC/32-1-1.png" class="w-24" />
            </a>
          </div>
        </div>
      </div>

      <div
        class="grid grid-cols-4 gap-0 text-left text-xl border-t-4 mt-3"
        style="border-color: #63666a"
      >
        <div class="space-y-2 mt-3 mr-10">
          <p class="font-bold" style="color: #63666a">
            DEFERRED PAYMENT OPTION
          </p>
          <p class="">
            Defer capital payment <br />
            for
            <span class="font-bold"> 90 or 180 days </span>
          </p>
        </div>
        <div
          class="border-l-2 space-y-2 mt-3 px-8"
          style="border-color: #d9d9d9"
        >
          <p class="font-bold" style="color: #63666a">INSTALLMENT OPTION</p>
          <p class="">
            Split capital purchase into
            <span class="font-bold"> 6 or 12 equal monthly payments </span>
          </p>
        </div>
        <div class="border-x-2 mt-3 px-9" style="border-color: #d9d9d9">
          <p class="font-bold" style="color: #63666a">RENTAL OPTION</p>
          <p class="">
            Rent new equipment <br />
            for <span class="font-bold"> 6 to 12 months </span> with an<span
              class="font-bold"
            >
              option to purchase</span
            >
            at end of the agreement
          </p>
        </div>
        <div class="px-9">
          <p class="font-bold mt-3" style="color: #63666a">CAPITAL PLACEMENT</p>
          <p class="">
            Pay for the technology through a consumable purchase commitment
          </p>
        </div>
      </div>

      <div>
        <p class="text-left text-2xl font-bold mt-14" style="color: #c8102e">
          BENEFITS
        </p>
        <div
          class="grid grid-cols-4 gap-0 text-left text-xl border-t-4 mt-2"
          style="border-color: #c8102e"
        >
          <ul class="mt-2 space-y-1">
            <li>Competitive pricing</li>
            <li>90 or 180-day payment terms</li>
            <li>
              Flexible – pay at any time <br />
              during period
            </li>
          </ul>

          <ul class="space-y-1 px-8 border-l-2 mt-2 pb-8">
            <li>Competitive pricing</li>
            <li>30-day payment terms</li>
            <li>No large capital payment</li>
          </ul>

          <ul class="space-y-1 px-8 border-x-2 mt-2 pb-8">
            <li>Competitive pricing</li>
            <li>Optional ownership options</li>
            <li>Flexible rental terms</li>
          </ul>

          <ul class="space-y-1 mt-2 px-8">
            <li>Competitive pricing</li>
            <li>No large capital payment</li>
            <li>
              Capital ownership at end <br />
              of agreement
            </li>
          </ul>
        </div>
      </div>
      <slideFooter class="mb-6" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
export default {
  components: { slideFooter },
}
</script>
