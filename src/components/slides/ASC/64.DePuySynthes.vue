<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <div class="flex h-full w-full mt-20">
        <div class="flex-1 flex flex-row mb-20 my-auto">
          <img class="scale-50" src="@/assets/logo/logo_rgb.png" />
        </div>
      </div>
      <slideFooter />
    </div>
  </section>
</template>

<script>
import slideFooter from '@/components/slides/slideFooterASC-3.vue'
export default {
  components: { slideFooter },
}
</script>

<style scoped lang="postcss"></style>
