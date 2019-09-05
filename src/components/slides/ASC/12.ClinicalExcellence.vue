<template>
  <section class="h-full">
    <div class="flex flex-col h-full" style="background-color: #c8102e">
      <div class="flex-2 flex flex-row mt-8">
        <div
          class="flex flex-col font-bold justify-end mb-20 w-full text-white"
        >
          <span class="text-7xl text-left ml-16 mb-2">
            Clinical Excellence
          </span>
        </div>
        <div class="flex w-4/6 flex w-full justify-end mr-12">
          <img src="@/assets/images/clinicalexcellence.png" />
        </div>
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-2-2.vue'
export default {
  components: { slideFooter },
}
</script>

<style scoped lang="postcss"></style>
