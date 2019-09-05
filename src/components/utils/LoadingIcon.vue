<template>
  <span class="loader"></span>
</template>
<script>
export default {}
</script>
<style lang="postcss" scoped>
.loader {
  border: 3px solid rgb(215, 218, 223);
  border-bottom-color: rgba(215, 218, 223, 0.3);
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
