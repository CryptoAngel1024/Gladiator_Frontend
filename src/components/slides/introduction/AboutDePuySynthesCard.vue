<template>
  <div
    class="box flex flex-col justify-end bg-cover bg-top h-52 border rounded-md bg-no-repeat"
    :style="{ 'background-image': `url(${card.bgImage})` }"
  >
    <p class="text-xs mb-2 text-left px-4 leading-6 z-50">
      {{ card.content }}
    </p>
  </div>
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped>
.box p {
  background-color: rgba(85, 85, 85, 0.67);
  color: white;
  height: 24px;
}
</style>
