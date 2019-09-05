<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="grid grid-cols-3">
        <div class="col-span-1 pt-5 pl-10 bg-gray-50">
          <p class="text-left font-bold text-5xl text-slidColor-1 mb-10">
            Partnership Proposal Hub
          </p>
          <p class="text-left font-medium text-3xl text-slidColor-1 mb-10">
            Six keys to a successful partnership
          </p>
          <p class="text-left font-bold text-2xl">
            Click on an image to navigate to the section
          </p>
        </div>
        <div class="col-span-2 self-center mx-auto mt-32 mb-32">
          <div
            class="border-2 rounded-full h-96 w-96 flex items-center justify-center font-bold text-xs text-blue-1 relative bg-blue-800"
          >
            <partnershipLink category-name="INTRODUCTION" class="flex flex-col">
              <SvgIcon class="h-6 w-6 mx-auto mt-1" name="leftArrow" />
            </partnershipLink>
            <partnershipLink
              category-name="TRAINING_SUPPORT"
              class="-left-12 inset-y-32"
            />
            <partnershipLink
              category-name="DELIVER_ACTUAL_SAVINGS"
              class="-right-12 inset-y-30"
            />
            <partnershipLink
              category-name="CUSTOMER_SERVICE"
              class="left-8 -top-8"
            />
            <partnershipLink
              category-name="SURGEON_SATISFACTION"
              class="-top-8 right-8"
            />
            <partnershipLink
              category-name="COMPREHENSIVE_PORTFOLIO"
              class="-bottom-8 left-8"
            />
            <partnershipLink
              category-name="QUALITY_OF_CARE"
              class="-bottom-8 right-8"
            />
          </div>
        </div>
      </div>
      <slideFooter class="mt-auto" />
    </div>
  </section>
</template>

<script>
import slideFooter from './slideFooter.vue'
import partnershipLink from './3.PartnershipHub/partnershipLink.vue'

export default {
  components: { slideFooter, partnershipLink },
}
</script>
