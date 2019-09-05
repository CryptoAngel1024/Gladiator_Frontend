<template>
  <div class="flex flex-col justify-center items-center py-16 px-2 m-auto">
    <span class="loader"></span>
    <p class="text-lg py-2 opacity-50">{{ message }}</p>
  </div>
</template>
<script>
export default {
  props: {
    message: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="postcss" scoped>
.loader {
  width: 60px;
  height: 60px;
  border: 7px solid rgb(215, 218, 223);
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
