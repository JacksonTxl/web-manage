
<template>
  <a-modal
    class="st-modal-cropper"
    :title="_title"
    v-model="show"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <div class="st-modal-cropper-content">
      <div class="st-modal-cropper-image">
        <img :src="_imageUrl" id="modal_cropper_image" hidden alt>
      </div>
      <p class="st-modal-cropper-preview" id="crop_preview"></p>
    </div>
  </a-modal>
</template>
<script>
import Cropper from 'cropperjs'
import { AppConfig } from '@/constants/config'

let cropper
export default {
  name: 'StModalCropper',
  serviceInject() {
    return {
      appConfig: AppConfig
    }
  },
  data() {
    return {
      show: false,
      filename: ''
    }
  },
  props: {
    title: {
      type: String,
      default: '图片裁剪'
    },
    file: {
      type: null,
      required: true
    },
    cropper: {
      type: Object,
      default: () => ({
        aspectRatio: 16 / 9
      })
    }
  },
  computed: {
    _title() {
      return this.title
    },
    _imageUrl() {
      return URL.createObjectURL(this.file)
    },
    _cropperOptions() {
      return Object.assign(this.appConfig.CROPPER_DEFAULT_CONFIG, this.cropper)
    }
  },
  watch: {
    image: {
      deep: true,
      handler(newVal, oldVal) {
        console.log(newVal)
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const imageEl = document.getElementById('modal_cropper_image')
      cropper = new Cropper(imageEl, this._cropperOptions)
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleOk() {
      cropper.getCroppedCanvas().toBlob(blob => {
        this.show = false
        this.$emit('ok', { file: blob })
      })
    }
  }
}
</script>
