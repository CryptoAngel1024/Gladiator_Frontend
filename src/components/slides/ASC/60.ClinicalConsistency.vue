<template>
  <section class="h-full">
    <div class="flex flex-col h-full pt-8 mx-14">
      <slideHeader title="Clinical Consistency" class="mx-0" />
      <div class="grid grid-cols-3 gap-4 mb-12">
        <clinical-consitatency-component
          title="Academic Medical Centers"
          :percentage="58"
          description="DePuy Synthes Trauma market share in Academic Medical Centers"
          image-class="pt-4"
        >
          <img src="@/assets/images/ASC/60-c1-1.png" class="scale-75 h-52" />
        </clinical-consitatency-component>
        <clinical-consitatency-component
          title="Hospitals"
          :percentage="88"
          description="of US Orthopaedic Surgeons use DePuy Synthes Trauma"
          image-class="p-1"
        >
          <img
            src="@/assets/images/ASC/60-c1-2.png"
            class="h-52 w-52 py-6 mt-2"
          />
        </clinical-consitatency-component>
        <clinical-consitatency-component
          title="Ambulatory Surgery Centers"
          :percentage="63"
          description="of surgeons say it's important to use the same implants in the ASC as they use in the hospital"
          image-class="pb-6 pt-20"
        >
          <img
            src="@/assets/images/ASC/60-c1-3.png"
            class="m-0 mt-2 pt-3 h-28"
          />
        </clinical-consitatency-component>
      </div>
      <ul
        class="list-decimal absolute bottom-20 leading-3 text-gray-1 text-xs text-left pl-4"
      >
        <li class="my-auto bottom-text">
          Symphony Health Solutions, “DePuy Synthes Trauma Global ATU 1: US
          Report (Segment Orthopaedic Surgeons)”. DAL# ATU DOF_MKRES_20210219.
          January 2014.
        </li>
        <li class="my-auto bottom-text">
          ZS Associates, “ASC Market Research & Insights; Primary Market
          Research” Report. DAL# DOF_MKRES_20210219. January 2020.
        </li>
      </ul>
      <slideFooter class="mb-4" />
    </div>
  </section>
</template>

<script>
import slideHeader from '@/components/slides/slideHeaderASC.vue'
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
import ClinicalConsitatencyComponent from '@/components/slides/60.ClinicalConsitatencyComponent.vue'
export default {
  components: { slideHeader, slideFooter, ClinicalConsitatencyComponent },
}
</script>
