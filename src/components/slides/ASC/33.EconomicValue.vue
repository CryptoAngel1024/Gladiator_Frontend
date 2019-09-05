<template>
  <section class="h-full">
    <div class="flex flex-col h-full" style="background-color: #003a5d">
      <div class="flex-2 flex flex-row mt-8">
        <div
          class="flex flex-col font-bold justify-end mb-16 w-full text-white"
        >
          <span class="text-7xl text-left ml-16 mb"> Economic Value </span>
        </div>
        <div class="flex w-full justify-end mr-12">
          <img src="@/assets/images/economicvalue.png" />
        </div>
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-2.vue'
export default {
  components: { slideFooter },
}
</script>

<style scoped lang="postcss"></style>
