<template>
  <footer class="flex px-1 pt-2 pb-1 mt-auto mb-0 font-Arial">
    <p id="copyright-text" class="flex-grow h-full my-auto text-xs text-left">
      All third-party trademarks used herein are trademarks of their respective
      owners. Please refer to the instructions for use for a complete list of
      indications, contraindications, warnings and precautions. This document
      contains confidential and proprietary trade secrets of DePuy Synthes
      Sales, Inc. Its contents may not be disclosed by an authorized recipient
      without prior written consent of DePuy Synthes Sales, Inc. © DePuy Synthes
      2021. All rights reserved. 131353-210510 DSUS
    </p>
  </footer>
</template>

<script>
export default {
  props: {
    mainTexts: {
      type: Array,
      default: () => [],
    },
    linkLogo: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="postcss" scoped>
footer {
  padding-left: 75px;
  padding-right: 100px;
  padding-bottom: 34px;
}

#copyright-text {
  color: white;
  padding-top: 10px;
  margin-left: 169px;
  font-size: 8px;
}

img {
  width: 260px;
}
</style>
