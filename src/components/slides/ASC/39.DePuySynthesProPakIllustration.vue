<template>
  <section class="h-full">
    <div class="flex flex-col pt-6 font-Arial h-full mx-14">
      <h2 class="text-4xl font-bold text-left">
        DePuy Synthes Pro-Pak<sup>®</sup> Illustration
      </h2>
      <div class="grid grid-cols-2 mt-10">
        <div class="flex flex-col text-left">
          <p class="text-xl text-left mb-10 font leading-tight">
            <b>
              Line Item vs. DePuy Synthes Pro-Pak<sup>®</sup> <br />
              Construct Pricing <span class="italic"> Example </span> - </b
            ><span class="text-lg italic">
              for illustrative purposes,<br />
              pricing may vary</span
            >
          </p>
          <div class="grid grid-cols-2 -mt-4">
            <img
              class="w-20 ml-12 mt-4"
              src="@/assets/images/ASC/39-1-1-1.png"
              alt="CPE"
            />
            <table
              class="border-solid text-sm leading-tight -ml-28 mr-28 -mt-6"
            >
              <tr class="mr-20">
                <th class="border-r-2 text-left" style="color: #63666a">
                  DISTAL RADIUS
                </th>
                <th class="border-r-2 text-center px-2" style="color: #63666a">
                  QTY
                </th>
                <th class="text-center px-2" style="color: #63666a">
                  LINE ITEM $
                </th>
              </tr>
              <tr class="border-t-2">
                <td class="border-r-2">PLATE</td>
                <td class="border-r-2 text-center">1</td>
                <td class="text-center">$1,285</td>
              </tr>
              <tr class="border-t-2">
                <td class="border-r-2">LOCKING SCREW</td>
                <td class="border-r-2 text-center">4</td>
                <td class="text-center">$180</td>
              </tr>
              <tr class="border-t-2">
                <td class="border-r-2">CORTEX SCREW</td>
                <td class="border-r-2 text-center">5</td>
                <td class="text-center">$70</td>
              </tr>
              <tr class="border-t-2">
                <td class="border-r-2">DRILL BIT</td>
                <td class="border-r-2 text-center">1</td>
                <td class="text-center">$200</td>
              </tr>
              <tr class="border-t-2">
                <td class="font-bold">TOTAL LINE ITEM $</td>
                <td class="border-r-2"></td>
                <td class="text-center font-bold line-through">
                  <strong> $2,555 </strong>
                </td>
              </tr>
            </table>
          </div>
          <div class="flex flex-row justify-end mr-32 -mb-20 mt-3">
            <img
              class="h-20"
              src="@/assets/images/ASC/39-2-1-1.png"
              alt="Screw 1"
            />
            <img
              class="h-20"
              src="@/assets/images/ASC/39-2-1-1.png"
              alt="Screw 2"
            />
            <img
              class="h-20"
              src="@/assets/images/ASC/39-2-1-2.png"
              alt="Screw 3"
            />
            <img
              class="h-20"
              src="@/assets/images/ASC/39-2-1-2.png"
              alt="Screw 4"
            />
            <img
              class="h-20"
              src="@/assets/images/ASC/39-2-1-2.png"
              alt="Screw 5"
            />
            <img
              class="h-24"
              src="@/assets/images/ASC/39-2-1-3.png"
              alt="Screw 6"
            />
            <img
              class="h-24"
              src="@/assets/images/ASC/39-2-1-3.png"
              alt="Screw 7"
            />
            <img
              class="h-24"
              src="@/assets/images/ASC/39-2-1-3.png"
              alt="Screw 8"
            />
            <img
              class="h-24"
              src="@/assets/images/ASC/39-2-1-3.png"
              alt="Screw 9"
            />
            <img
              class="-mt-5 h-40"
              src="@/assets/images/ASC/39-2-1-4.png"
              alt="Plate"
            />
          </div>
          <img
            class="mt-9 mr-44 w-52 ml-48"
            src="@/assets/images/ASC/39-2-1-5.png"
            alt="Drill"
          />
          <p class="text-lg text-left -mt-8 mb-2 font leading-tight">
            Same case using:
          </p>
          <h2
            class="text-xl text-left mb-7 font font-bold leading-tight"
            style="color: #63666a"
          >
            CONDRPVA | DePuy Synthes Pro-Pak <br />
            Distal Radius - VA
          </h2>
          <p class="text-lg text-left -mt-4 mb-6 font leading-tight">
            <b> Includes</b>: 1 plate, up to 9 screws total, and 1 drill bit
          </p>
          <p class="text-lg text-left -mt-4 font leading-tight">
            <b> $2,000 Same price, every case, any implant configuration*</b>
          </p>
        </div>
        <div class="ml-20 -ml-3">
          <p
            class="text-3xl text-left mb-6 font font-bold"
            style="color: #63666a"
          >
            Calculate the savings
          </p>
          <p class="text-2xl text-left -mt-6">
            available through construct pricing as <br />
            compared to variable line-item pricing
          </p>
          <a
            href="https://dpslighthousecommunity.jnj.com/s/resource/a2i3g000000YXEcAAO/depuy-synthes-propak-price-comparison-tool"
            target="_blank"
          >
            <img
              class="mt-16 scale-90 -ml-8"
              src="@/assets/images/ASC/39-2-2-1.png"
              alt="Table"
            />
          </a>
          <p
            class="text-xs text-right mr-10 mt-42 -mb-1"
            style="color: #63666a"
          >
            *Must use implants specified in the preselected construct offer.
          </p>
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

<style scoped></style>
