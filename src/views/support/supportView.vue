<template>
  <page-wrapper title="Support">
    <headerBreadCrumps page-name="Support" :links="[]" />
    <base-card class="flex flex-col w-full p-4 rounded-2xl">
      <div class="flex flex-col p-3">
        <h1 class="text-header-jnj text-primary">Reach Out</h1>
        <p class="my-4 max-w-5xl">
          Share your questions, feedback, and bugs on Gladiator's Lighthouse
          community page! Once you've left a message, the Gladiator team will
          get back to you as soon as possible with a response. Click below to
          get started!
        </p>
        <a
          class="text-center w-max rounded-xl py-4 px-8 text-white bg-secondary"
          href="https://dpslighthousecommunity.jnj.com/s/group/0F93g000000PGKaCAO/the-gladiator-bulletin"
          target="_blank"
          @click="contactAdminGaLog"
        >
          Contact
        </a>
      </div>
    </base-card>
  </page-wrapper>
</template>

<script>
import PageWrapper from '@/components/utils/container/PageWrapper.vue'
import BaseCard from '@/components/utils/container/BaseCard.vue'
import headerBreadCrumps from '@/components/utils/headerBreadCrumps.vue'
import { gaEvent } from '@/utils/GA_Event.js'

export default {
  components: {
    PageWrapper,
    BaseCard,
    headerBreadCrumps,
  },
  setup() {
    const contactAdminGaLog = () => {
      gaEvent({
        action: 'contact-admin',
        event_category: 'login',
        event_label: `User-atempt-to-contact-admin`,
      })
    }

    return {
      contactAdminGaLog,
    }
  },
}
</script>
