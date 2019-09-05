<template>
  <base-card
    class="bg-secondary text-white font-semibold rounded-xl"
    card-style="py-4 px-8"
  >
    <div class="flex-col text-left space-y-3">
      <h1 class="text-header-jnj text-white" data-test="get-started-title">
        Start planning your next perfect presentation
      </h1>
      <p class="text-sm opacity-70" data-test="get-started-description">
        This Gladiator Journey is designed to guide you through pricing and
        contracting for a well executed proposal.
      </p>
      <div class="flex items-center space-x-10">
        <dp-link-button
          data-test="get-started-button"
          :to="{ name: 'new-presentation' }"
          text="Get Started"
          class="bg-accent-blue px-16 font-semibold text-white"
        />
        <router-link
          :to="{ name: 'support' }"
          class="font-semibold"
          data-test="need-help-button"
        >
          Need Help
        </router-link>
      </div>
    </div>
    <SvgIcon name="gladiator" />
  </base-card>
</template>
<script>
import BaseCard from '@/components/utils/container/BaseCard.vue'
import DpLinkButton from '@/components/buttons/DpLinkButton.vue'

export default {
  components: {
    BaseCard,
    DpLinkButton,
  },
}
</script>
