<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full px-6 pt-6">
      <slideHeader
        class="pl-4"
        :sav-number="1"
        name="QOC"
        title="Instrument Warranty"
      />
      <h3 class="text-2xl text-gray-600 text-left pl-4">
        DePuy Synthes offers a lifetime warranty for catalog instruments
        purchased from DePuy Synthes
      </h3>
      <div class="text-left pl-4 pr-8">
        <h4 class="text-2xl text-indigo-700 mt-5">Terms and Conditions</h4>
        <h5 class="text-lg mt-3">
          The warranty presumes that the instruments are used with DePuy Synthes
          implants under normal operating conditions. Excepted from this
          warranty are items which have been abused and those that become
          unserviceable through prolonged use
        </h5>
        <ul class="list-disc text-lg pl-5 w-full mt-1">
          <li class="text-red-500">
            <span class="text-black"
              >Warranty is limited to the repair or replacement of
              instruments</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >Repair or replacement is dependent upon return of the instrument
              to DePuy Synthes</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >Excluded from this warranty are batteries and all cutting
              instruments, i.e. drill bits, taps, chisels, fixed-head reamers,
              osteotomes, periosteal elevators and gouges</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >This warranty and the undertaking to replace or repair is in
              exclusion of all other warranties and remedies</span
            >
          </li>
        </ul>
        <h4 class="text-2xl text-indigo-700 mt-5">
          Warranty Product Replacement Order Process
        </h4>
        <ul class="list-disc text-lg pl-5 w-full mt-1">
          <li class="text-red-500">
            <span class="text-black"
              >Warranty requests are only accepted via email
              <a
                href="mailto:RA-DPYUS-CSWarranty@its.jnj.com"
                class="text-red-600 underline"
                >RA-DPYUS-CSWarranty@its.jnj.com</a
              >
              and the standard warranty order template must be utilized</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >Standard replacements are 2nd Day Air delivery</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >Need for overnight delivery must be specified and a UPS or FEDEX
              account number must be provided or the request will not be
              accepted</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              >Requests for return shipping labels must be specified in
              order</span
            >
          </li>
          <li class="text-red-500">
            <span class="text-black"
              ><strong>Customer Service – 1-800-523-0322</strong> – phone
              coverage for special orders, questions and/or inquiries</span
            >
          </li>
        </ul>
      </div>
      <slideFooter class="mb-0 mt-auto" :show-third-party-trade-mark="true" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, slideHeader },
}
</script>
