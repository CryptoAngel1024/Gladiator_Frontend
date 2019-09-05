<template>
  <section class="h-full">
    <!-- content div header-->
    <div class="flex flex-col h-full mb-2">
      <div
        class="flex flex-row intro-header items-end justify-between gap-2 ml-8 mt-2 mb-8 px-4 max-h-36"
      >
        <img src="@/assets/logo/logo_rgb.png" alt="logo" class="w-72 h-16" />
        <div class="h-16 flex flex-col justify-center">
          <div class="liob ml-8 h-10 items-center leading-loose" />
        </div>
        <h3
          class="lio h-16 leading-loose ml-4 font-extrabold text-4xl flex flex-4 items-center justify-start"
        >
          Leadership in Orthopaedics
        </h3>

        <slideHeader
          :sav-number="2"
          name="INTR"
          class="flex-1 flex max-h-20 place-items-start justify-end"
        />
      </div>
      <!-- content body -->

      <div class="grid grid-cols-4 gap-x-3 gap-y-6 mx-12 px-8 pt-2 mb-6">
        <AboutDePuySynthesCard
          v-for="card in cards"
          :key="card.imgName"
          :card="card"
        />
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooter.vue'
import AboutDePuySynthesCard from '@/components/slides/introduction/AboutDePuySynthesCard.vue'
import images from '@/components/slides/introduction/AboutDepuySynthesCardImages.js'
import slideHeader from '@/components/slides/slideHeader.vue'

export default {
  components: { slideFooter, AboutDePuySynthesCard, slideHeader },
  data() {
    return {
      cards: [
        { content: 'JOINT RECONSTRUCTION', bgImage: images.images[0] },
        { content: 'TRAUMA', bgImage: images.images[1] },
        { content: 'SPINE', bgImage: images.images[2] },
        { content: 'SPORTS MEDICINE', bgImage: images.images[3] },
        { content: 'POWER TOOLS', bgImage: images.images[4] },
        { content: 'CRANIOMAXILLOFACIAL', bgImage: images.images[5] },
        { content: 'EARLY INTERVENTION', bgImage: images.images[6] },
        { content: 'BIOMATERIALS', bgImage: images.images[7] },
      ],
    }
  },
}
</script>
<style scoped>
.lio {
  color: #212121;
}

.liob {
  border-left-color: #212121;
  border-left-width: 6px;
}
</style>
