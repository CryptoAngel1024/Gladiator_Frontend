<template>
  <div class="py-16 flex flex-col justify-center items-center">
    <img :src="imgSrc" :alt="message" />
    <div data-test="empty-slide-text" class="text-center text-gray-475">
      {{ message }}
    </div>
  </div>
</template>

<script>
import emptyTemplatesImg from '@/assets/images/emptyTemplates.png'
import emptyDraftsImg from '@/assets/images/emptyDrafts.png'
import emptyPublishImg from '@/assets/images/emptyPublish.png'
import { computed } from '@vue/runtime-core'

export default {
  props: {
    dataType: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const displayTypes = {
      templates: {
        imgSrc: emptyTemplatesImg,
        message: 'No templates available',
      },
      draftRfps: {
        imgSrc: emptyDraftsImg,
        message: 'No recent drafts',
      },
      publishedLinks: {
        imgSrc: emptyPublishImg,
        message: 'No published links',
      },
      Resources: {
        message: 'No reources for this page',
      },
      presentation: {
        message: 'Presentation not found',
      },
    }

    const displayType = computed(() => displayTypes[props.dataType])

    return {
      imgSrc: computed(() => displayType.value?.imgSrc || emptyDraftsImg),
      message: computed(
        () => displayType.value?.message || 'No Items Available',
      ),
    }
  },
}
</script>
