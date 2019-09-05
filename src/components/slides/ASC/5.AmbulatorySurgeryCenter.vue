<template>
  <section class="h-full">
    <div class="flex flex-col h-full ml-8">
      <div class="flex">
        <div class="mr-14 mt-20 w-1/3" style="color: #63666a">
          <div class="text-left text-5xl">
            <strong>A</strong>mbulatory <br />
            <strong>S</strong>urgery <br />
            <strong>C</strong>enter
          </div>
          <div class="text-left text-5xl mt-5">
            <strong>Suite of</strong><br />
            <strong>Capabilities</strong>
          </div>
          <div class="flex w-full min-h-40 mt-5">
            <s3Image
              class="object-contain my-auto h-40"
              :s3-directory="`presentations/${presentationId}/`"
              s3-file-name="customerProfile.png"
              alt="Logo"
            />
          </div>
          <div class="text-left text-3xl mt-5">
            {{ formatedMonth }} {{ formatedDate
            }}<sup>{{ formatedDateSup }}</sup
            >, {{ formatedYear }}
          </div>
        </div>
        <img src="@/assets/images/ASC/asc-5-back.png" class="w-2/3" />
      </div>
      <slideFooter class="my-2 mr-9" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'
import s3Image from '@/components/utils/s3/s3Image.vue'
import dynamicSlide from '../dynamicSlide.js'
import { computed } from 'vue'
import { dateOrdinalSuffix } from '@/utils/formatDate.js'

export default {
  components: { slideFooter, s3Image },
  setup() {
    const { slideContent: introSlide, presentationId } = dynamicSlide('ASC_5')

    const slideDate = computed(
      () => new Date(introSlide.value.date?.replace('-', '/')),
    )

    const formatedMonth = computed(() =>
      slideDate.value.toLocaleString('en-US', { month: 'long' }),
    )
    const formatedYear = computed(() => slideDate.value.getFullYear())
    const formatedDate = computed(() => slideDate.value.getDate())
    const formatedDateSup = computed(() => dateOrdinalSuffix(slideDate.value))

    return {
      introSlide,
      presentationId,
      formatedMonth,
      formatedYear,
      formatedDate,
      formatedDateSup,
    }
  },
}
</script>
