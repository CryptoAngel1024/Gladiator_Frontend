<template>
  <div
    class="flex flex-col py-6 px-5 bg-white borde-2 rounded-xl w-44 space-y-4"
  >
    <button
      class="flex items-center text-gray-425 space-x-2"
      :data-test="`custom-slide-edit-btn-${customSlide.slideInfoId}`"
      @click="editCustomSlide()"
    >
      <svg-icon name="edit" class="h-5 w-6" />
      <h1>Edit</h1>
    </button>
    <button
      class="flex items-center text-primary space-x-2"
      :data-test="`custom-slide-delete-btn-${customSlide.slideInfoId}`"
      @click="deleteCustomSlide()"
    >
      <div class="p-1 border-primary border-2 rounded-md">
        <svg-icon name="delete" class="h-5 w-6" />
      </div>
      <h1>Delete</h1>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    customSlide: {
      type: Object,
      required: true,
    },
  },
  emits: ['editCustomSlide', 'deleteCustomSlide'],

  setup(props, { emit }) {
    const editCustomSlide = () => emit('editCustomSlide')

    const deleteCustomSlide = () => emit('deleteCustomSlide')

    return { editCustomSlide, deleteCustomSlide }
  },
}
</script>
