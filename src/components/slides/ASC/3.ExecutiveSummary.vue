<template>
  <section class="h-full">
    <div class="flex flex-col h-full ml-14">
      <h2 class="text-left text-4xl font-bold text-slidColor-header mt-8">
        Executive Summary
      </h2>

      <ul
        class="list-disc w-full text-xl text-black space-y-2 text-left pr-14 pl-4 mt-4"
      >
        <li>
          <strong>
            DePuy Synthes Orthopaedics, Inc., in business since 1895,
          </strong>
          joined the Johnson & Johnson family of companies in 1998. Johnson &
          Johnson and its subsidiaries have over 132,000 employees worldwide,
          who passionately lead the way in improving the health and well-being
          of people around the world.1
        </li>
        <li>
          DePuy Synthes portfolios span specialties such as
          <strong>
            Trauma & Extremities, Joint Reconstruction, Sports Medicine, Spine,
          </strong>
          and <strong> Power Tools.</strong>
        </li>
        <li>
          These businesses are focused on helping patients along the care
          continuum—from early intervention to surgical replacement, with the
          goal of helping people return to living active and fulfilling lives.
        </li>
        <li>
          Working together, we can deliver innovative solutions to today's
          healthcare challenges to advance patient care and deliver Clinical
          Excellence, Economic Value, and Operational Support to your Ambulatory
          Surgery Center.
        </li>
      </ul>

      <router-link class="m-auto -mb-12 relative" :to="linkToVideoSlide">
        <img
          src="@/assets/images/ExecutiveSummaryImage.png"
          alt="Go to Video"
        />
        <img
          class="h-16 w-16 top-20 left-36"
          style="position: absolute !important"
          alt="Go to Video"
          src="@/assets/images/ExecutivePlayButton.png"
        />
      </router-link>

      <p class="text-xxs text-left bottom-text pt-1 mt-auto w-full">
        1. Johnson & Johnson Annual Report. 2019.
      </p>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  components: { slideFooter },
  setup() {
    const route = useRoute()
    const store = useStore()
    const presentationId = computed(() => route.params.presentationId)
    const hyperLink = computed(() => route.params.hyperLink)

    const videoSlideIndex = computed(() =>
      store.getters['rfps/enabledSlideNumber']({
        presentationId: presentationId.value,
        hyperLink: hyperLink.value,
        clientName: route.params.clientName?.replace('-', ' '),
        slideId: 'ASC_3', // video slide id
      }),
    )

    const linkToVideoSlide = computed(() =>
      videoSlideIndex.value
        ? {
            name: hyperLink.value ? 'present' : 'slide',
            hash: `#/${videoSlideIndex.value}`,
            params: {
              presentationId: presentationId.value,
              hyperLink: hyperLink.value,
              clientName: route.params.clientName?.replace('-', ' '),
            },
          }
        : route.hash,
    )

    return {
      enabledIndex: videoSlideIndex,
      linkToVideoSlide,
    }
  },
}
</script>

<style scoped>
.bottom-text {
  color: #63666a;
}
</style>
