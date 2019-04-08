
<template>
  <a-modal class="st-modal-cropper" :title="_title" v-model="show" @cancel="handleCancel" @ok="handleOk">
    <div class="st-modal-cropper-content">
      <div class="st-modal-cropper-image">
        <img :src="_image" id="modal_cropper_image" hidden alt="">
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
    image: {
      type: [String, Object],
      required: true
    },
    aspectRatioW: {
      type: Number,
      default: 16
    },
    aspectRatioH: {
      type: Number,
      default: 9
    }
  },
  computed: {
    _title() {
      return this.title
    },
    _image() {
      return this.image
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
      const image = document.getElementById('modal_cropper_image')
      Cropper.setDefaults(this.appConfig.CROPPER_DEFAULT_CONFIG)
      cropper = new Cropper(image, {
        aspectRatio: this.aspectRatioW / this.aspectRatioH
      })
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
