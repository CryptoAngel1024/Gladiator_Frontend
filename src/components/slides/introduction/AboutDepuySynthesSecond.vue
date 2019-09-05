<template>
  <section class="h-full">
    <!-- content div header-->

    <div class="flex flex-col mt-2 pb-3 h-full">
      <div
        class="flex flex-row intro-header items-center justify-between gap-2 mb-8 px-4 max-h-36"
      >
        <h3
          class="max-h-12 leading-loose px-4 ml-8 font-extrabold text-4xl flex flex-4 items-center justify-start"
        >
          DePuy Synthes Companies Areas of Focus
        </h3>
        <slideHeader :sav-number="3" name="INTR" />
      </div>
      <!-- content body -->
      <div class="grid grid-cols-6 gap-4 mx-8 px-8 pt-2 mb-6">
        <AboutDepuySynthesSecondCard
          v-for="card in cards"
          :key="card.title"
          :card="card"
        />
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import AboutDepuySynthesSecondCard from '@/components/slides/introduction/AboutDepuySynthesSecondCard.vue'
import images from '@/components/slides/introduction/Intro3Images.js'
import slideHeader from '@/components/slides/slideHeader.vue'
export default {
  components: { slideFooter, AboutDepuySynthesSecondCard, slideHeader },
  data() {
    return {
      cards: [
        {
          title: 'TRAUMA',
          content:
            'Supplying solutions to treat orthopaedic trauma, including broken bones, deformities and tumor diseases in bones',
          icon: images.images[0],
        },
        {
          title: 'CMF',
          content:
            'Delivering solutions for the treatment of facial trauma, tumor resection and reconstruction as well as conditions affecting the thorax',
          icon: images.images[1],
        },
        {
          title: 'JOINT RECONSTRUCTION',
          content:
            'Providing a comprehensive portfolio of implants and instruments for hip, knee and shoulder replacement',
          icon: images.images[2],
        },
        {
          title: 'SPORTS MEDICINE',
          content:
            'Offering products used in the treatment of traumatic and degenerative soft tissue conditions and joint injuries related to sports and physical activity, including early intervention and minimally invasive surgical options',
          icon: images.images[3],
        },
        {
          title: 'POWER TOOLS',
          content:
            'Supplying power instruments to aid in Fracture care, small bone reconstruction, maxillofacial and sports medicine – DePuy Synthes has your, ergonomic, efficient and cost effective Power Solution',
          icon: images.images[4],
        },
        {
          title: 'SPINE',
          content:
            'Offering spinal care solutions that address key areas including aging spine, less invasive surgery, scoliosis, degenerative disc disease, care delivery innovation and enabling technologies',
          icon: images.images[5],
        },
      ],
    }
  },
}
</script>
