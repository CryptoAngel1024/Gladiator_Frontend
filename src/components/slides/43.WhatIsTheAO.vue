<template>
  <section class="h-full overflow-y-auto">
    <div class="flex flex-col h-full">
      <div class="flex justify-between px-6 pt-3">
        <div class="flex">
          <img
            class="mx-3 w-80"
            src="@/assets/logo/logo_rgb.png"
            alt="Workflow"
          />
          <p class="text-xl font-bold my-auto mx-3">&</p>
          <img
            class="mx-3 my-auto"
            src="@/assets/logo/ao_logo.png"
            alt="Workflow"
          />
        </div>
        <slideHeader class="pl-6" :sav-number="6" name="QOC" />
      </div>
      <div class="ao-container text-left pl-6 pt-3">
        <h2 class="flex text-2xl font-bold mb-1">
          <p class="my-auto">What is the</p>
          <img class="mx-2" src="@/assets/logo/ao_logo.png" alt="Workflow" />
          <p class="my-auto">?</p>
        </h2>
        <h4 class="text-xl pl-3 pr-6">
          The AO is a medically guided, not-for-profit, global network of
          surgeons, and the world’s premier education, innovation, and research
          organization for the treatment of trauma and musculoskeletal
          disorders.
        </h4>
        <h2 class="flex text-2xl font-bold mb-1">
          <p class="my-auto">
            How does our long-standing relationship with the
          </p>
          <img class="mx-2" src="@/assets/logo/ao_logo.png" alt="Workflow" />
          <p class="my-auto">differentiate us from our competitors?</p>
        </h2>
        <h4 class="text-xl pl-3 pr-6">
          <strong
            >For 60 years, DePuy Synthes has proudly collaborated with the
            AO</strong
          >
          to transform surgery and save lives. DePuy Synthes supports the AO’s
          independent surgeon education courses, and also collaborates with the
          AO on the development and certification of new surgical technologies.
          The two organizations are independent; however, we are united under
          and work together toward a common goal to innovate in surgical care
          for the betterment of patients’ lives.
          <p class="mt-5">
            Our collaboration provides access to a global network of over
            215,000 health care professionals; our primary areas of
            collaborative focus are:
          </p>
        </h4>
        <div class="flex justify-center">
          <div class="font-Arial text-center">
            <img class="mx-auto" src="@/assets/jnjIcons/thought_rounded.png" />
            <p class="text-xl font-bold">Research & Innovation</p>
          </div>
          <div class="text-center">
            <img src="@/assets/jnjIcons/professional_rounded.png" />
            <p class="text-xl font-bold">Education</p>
          </div>
        </div>
        <p class="text-left font-Arial font-light text-sm opacity-50 my-auto">
          AO Foundation Is a 3rd party medically guided, not-for-profit
          organization led by an international group of surgeons specialized in
          the treatment of trauma and disorders of the musculoskeletal system.
        </p>
      </div>
      <slideFooter class="mb-0 mt-auto" />
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

<style lang="postcss" scoped>
.ao-container {
  position: relative;
}
.ao-container::before {
  content: '';
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background: url('@/assets/logo/ao_background.jpg') no-repeat center center;
  background-size: fill;
  background-position: top;
  opacity: 0.1;
}
</style>
