<template>
  <footer
    class="flex px-1 pt-2 pb-1 mt-auto mb-12 ml-0 text-black-500 font-Arial"
  >
    <div class="flex w-22"></div>
    <p class="flex-grow h-full my-auto text-xs text-left">
      Please refer to the instructions for use for a complete list of
      indications, contraindications, warnings, and precautions.
      <br />The third-party trademarks used herein are the trademarks of their
      respective owners.
      <br />
      ©DePuy Synthes 2020. All rights reserved.
      <br />
      131353-210122 DSUS
    </p>
    <div />
  </footer>
</template>

<script>
export default {
  props: {
    mainTexts: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style lang="postcss" scoped></style>
