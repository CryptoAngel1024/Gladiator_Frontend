<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="flex justify-between">
        <div class="flex">
          <h2
            id="heading-text"
            class="text-4xl font-bold text-slidColor-header ml-14 mt-8 mb-16"
          >
            Orthopaedic ASCs have unique needs
          </h2>
        </div>
      </div>
      <div class="grid grid-cols-2 gap-0">
        <div class="flex mr-14 ml-20 mt-8">
          <div class="text-left">
            <ul class="list-disc w-full text-2xl text-black">
              <li class="mb-1">
                <span>What challenges do you face managing your ASC?</span>
              </li>
              <li class="mb-1">
                <span
                  >How do you manage the ever-changing reimbursement
                  dynamics?</span
                >
              </li>
              <li class="mb-1">
                <span
                  >How does the number of vendors affect the complexity of
                  managing your facility?
                </span>
              </li>
              <li class="mb-1">
                <span
                  >What tools do you employ to evaluate your orthopaedic spend?
                </span>
              </li>
              <li>
                <span
                  >What do you need to continue to be successful in the next
                  five years?
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex mr-8 mt-6">
          <div class="text-left">
            <img class="scale-110" src="@/assets/images/surgeonowner.png" />
          </div>
        </div>
      </div>
      <slideFooter class="footer pt-2" />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-1.vue'

export default {
  components: { slideFooter },
}
</script>

<style scoped>
.footer {
  padding-left: 66px;
  padding-right: 100px;
  padding-bottom: 34px;
}
</style>
