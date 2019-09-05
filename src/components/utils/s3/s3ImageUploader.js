import { saveFileSigned, deleteFileSigned } from '@/api/s3Files.js'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

// props: { s3Directory, s3FileName, isUploadable }
export default function s3ImageUploader(props, { emit }) {
  const imageExists = ref(false)
  const uploadedS3FileName = computed(() => props.s3FileName)
  const store = useStore()
  const s3ImageViewer = ref(null)
  const selectedFile = ref(null)
  const selectedFileSrc = ref(null)
  const selectedFileType = ref('')

  function setS3LastUploadedPath(updatedPath) {
    store.commit('auth/setS3LastUploadedPath', updatedPath)
  }

  async function selectImage(files) {
    if (files?.[0]) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        selectedFile.value = files[0]
        selectedFileType.value = files[0].type
        if (props.isUploadable) await uploadImage()
        else emit('imageSelected', uploadImage)
        selectedFileSrc.value = e.target.result
      }
      reader.readAsDataURL(files[0])
    } else {
      console.warn('no selected file to upload')
    }
  }

  async function uploadImage() {
    if (selectedFile.value) {
      try {
        const { err } = await store.dispatch('auth/fetchUserDetail', false)
        if (err) throw err
        setS3LastUploadedPath('')
        await saveFileSigned(
          selectedFile.value,
          `${props.s3Directory}${props.s3FileName}`,
          selectedFileType.value,
        )
        setS3LastUploadedPath(`${props.s3Directory}${props.s3FileName}`)
        await s3ImageViewer.value.getImage()
      } catch (err) {
        console.error('failed to upload file: ', err)
      }
    } else {
      console.warn('no selected file to upload')
    }
  }

  const deleteImage = async () => {
    try {
      const { err } = await store.dispatch('auth/fetchUserDetail', false)
      if (err) throw err
      imageExists.value = false
      selectedFileSrc.value = null
      await deleteFileSigned(`${props.s3Directory}${props.s3FileName}`)

      emit('imageDeleted')

      setS3LastUploadedPath(`${props.s3Directory}${props.s3FileName}`)
      await s3ImageViewer.value.getImage()
    } catch (err) {
      console.error('failed to upload file: ', err)
    }
  }

  function imageFetched() {
    imageExists.value = true
    emit('imageFetched')
  }

  function imageNotFound() {
    imageExists.value = false
    emit('imageNotFound')
  }

  return {
    uploadImage,
    imageExists,
    uploadedS3FileName,
    s3ImageViewer,
    selectImage,
    selectedFileSrc,
    imageFetched,
    imageNotFound,
    deleteImage,
  }
}
