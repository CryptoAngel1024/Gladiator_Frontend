<template>
  <section class="h-full">
    <div class="flex flex-col h-full" style="background-color: #c800a1">
      <div class="flex-2 flex flex-row mt-12">
        <div
          class="flex flex-col font-bold justify-end mb-20 w-full text-white"
        >
          <span class="text-7xl text-left ml-16"> Operational Support </span>
        </div>
        <div class="flex w-3/5 justify-end mr-10">
          <img src="@/assets/images/operationalsupport.png" />
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
