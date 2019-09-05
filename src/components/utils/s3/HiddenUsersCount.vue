<template>
  <div class="flex items-center justify-center rounded-full user-avatar-border">
    +{{ count }}
  </div>
</template>

<script>
export default {
  props: {
    count: { type: String, default: '' },
  },
}
</script>

<style>
.user-avatar-border {
  border: 1px solid #e2e2ea !important;
  color: #696974;
}
</style>
