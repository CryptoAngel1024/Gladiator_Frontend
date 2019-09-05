<template>
  <div class="flex flex-col justify-center gap-2 h-full">
    <div
      class="icon self-center flex items-center text-center justify-center border h-28 w-28 rounded-full mt-10"
    >
      <img :src="card.icon" :alt="card.title" class="max-h-16" />
    </div>
    <div class="flex title justify-center mt-2 h-16">
      <h4 class="font-bold text-lg mt-auto">
        {{ card.title }}
      </h4>
    </div>
    <div class="p-4 content justify-start border-1 border-b-4 flex-grow">
      <p class="flex-row font-Arial text-left tracking-wider text-sm">
        {{ card.content }}
      </p>
    </div>
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
  background-color: rgba(85, 85, 85, 0.65);
  color: white;
  height: 30px;
}

.icon {
  background-color: #777777;
}

.title {
  color: #1e22aa;
}

.content {
  background-color: #f2f2f2;
  color: #595959;
}
</style>
