<template>
  <section class="learnmore h-full">
    <div class="flex flex-col pt-6 font-Arial mx-14 text-left mb-4">
      <h2 class="text-4xl font-bold mt-2">
        Capital Acquisition | Visualization, FMS VUE<sup>®</sup> II,<br />
        & VAPR VUE<sup>®</sup> Systems
      </h2>
      <h2 class="text-2xl text-left mt-4 mb-5 font" style="color: #63666a">
        Acquisition options allow for ASCs to obtain technology through a method
        that <br />
        meets their individual economic goals and needs
      </h2>
      <div class="grid grid-cols-2 mb-12">
        <table
          class="-mr-48 border-solid text-sm leading-tight mt-4 scale-90 -ml-12"
        >
          <tr class="text-left">
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
            <td class="w-1/12"></td>
          </tr>
          <tr class="text-left">
            <th colspan="3" class="border-r-2 px-2" style="color: #63666a">
              PUREVUE Capital <br />
              Placement (Mitek Only)
            </th>
            <td colspan="4" class="border-r-2 px-2 py-1">
              Capital equipment placed at customer facility and paid for over
              the contract term with contracted Net Purchase commitment of Mitek
              implants and disposables
            </td>
            <td colspan="5" class="px-2">
              Customer owns capital equipment at the <br />
              end of contract if Mitek Net Purchase <br />
              commitment is met
            </td>
          </tr>
          <tr class="border-t-2 text-left" style="background: #f2f2f2">
            <th colspan="3" class="border-r-2 px-2 py-5" style="color: #63666a">
              PUREVUE Capital <br />
              Placement <br />
              (DePuy Synthes)
            </th>
            <td colspan="4" class="border-r-2 px-2">
              Capital equipment placed at customer facility and paid for over
              the contract term with contracted Net Purchase commitment of DePuy
              Synthes implants and disposables
            </td>
            <td colspan="5" class="px-2">
              Customer owns capital equipment at the end <br />
              of contract if DePuy Synthes Net Purchase commitment is met
            </td>
          </tr>
          <tr class="border-t-2 text-left">
            <th colspan="3" class="border-r-2 px-2" style="color: #63666a">
              J&J Finance Corporation (JJFC) Financing
            </th>
            <td colspan="3 " class="border-r-2 px-2 py-1">
              Customer information is collected and sent to JJFC for credit
              review and approval
            </td>
            <td colspan="3" class="border-r-2 px-2">
              Financial commitment is between JJFC and the customer
            </td>
            <td colspan="3" class="px-2">
              Customer owns capital equipment at end of contract term with JJFC
            </td>
          </tr>
          <tr class="border-y-2 text-left" style="background: #f2f2f2">
            <th colspan="3" class="border-r-2 px-2" style="color: #63666a">
              Cash Purchase
            </th>
            <td colspan="9" class="px-2 py-1">
              Outright purchase of capital equipment
            </td>
          </tr>
        </table>
        <div class="grid justify-center -mt-9 ml-32">
          <img
            src="@/assets/images/ASC/downward_arrow.png"
            class="w-14 ml-20"
            alt="Down Arrow"
          />
          <a
            href="https://jnj.showpad-solutions.com/?experience=DPS-Mitek"
            target="_blank"
          >
            <img
              src="@/assets/images/ASC/42-1-1-1.0.png"
              class="h-76 ml-20"
              alt="42-1-1-1"
            />
          </a>
          <div class="flex flex-row">
            <img
              src="@/assets/images/ASC/42-2-1-1.png"
              class="w-20 h-10"
              alt="42-2-1-1"
            />
            <img
              src="@/assets/images/ASC/42-2-1-2.png"
              class="ml-10 -mt-2"
              alt="42-2-1-2"
            />
            <img
              src="@/assets/images/ASC/42-2-1-3.png"
              class="w-21 h-11 ml-10"
              alt="42-2-1-3"
            />
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
.learnmore {
  background: url('@/assets/images/ASC/Learn_More_Arrow.png') no-repeat;
  background-size: 150px;
  background-position: right 5% top 1%;
}
</style>
