<template>
  <section class="h-full">
    <div class="flex flex-col h-full" style="background-color: #63666a">
      <div class="flex h-full w-full mt-20">
        <div class="flex-1 flex flex-row my-auto justify-left">
          <span class="text-7xl text-left ml-16 font-bold text-white mb-12">
            Your DePuy Synthes Team
          </span>
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
