<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-row>
          <a-upload :beforeUpload="beforeUpload" :showUploadList="false">
            <a-button>
              <a-icon type="upload"/> Select File
            </a-button>
          </a-upload>
        </a-row>
        <a-row class="mg-t16">
          <a-col :span="16" style="height: 300px;">
            <img id="image" hidden src="http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/IUt_vXTl8zaWGwlO.jpg"/>
          </a-col>
          <a-col :span="8">
            <p class="st-crop__preview mg-l16" id="crop_preview"></p>
          </a-col>
        </a-row>
        <a-row class="mg-t16">
          <a-button @click="crop">裁剪</a-button>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import Cropper from 'cropperjs'
import { AppConfig } from '@/constants/config'

let cropper
export default {
  name: 'CropperDemo',
  serviceInject() {
    return {
      appConfig: AppConfig
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  mounted() {
    const image = document.getElementById('image')
    Cropper.setDefaults(this.appConfig.CROPPER_DEFAULT_CONFIG)
    cropper = new Cropper(image)
  },
  methods: {
    beforeUpload(file) {
      if (/^image\/\w+/.test(file.type)) {
        const URL = window.URL || window.webkitURL
        const blobURL = URL.createObjectURL(file)
        cropper.reset().replace(blobURL)
      }
      return false
    },
    crop() {
      cropper.getCroppedCanvas().toBlob((blob) => {
        const formData = new FormData()
        formData.append('croppedImage', blob)
        console.log(blob)
      })
      console.log(cropper.getCroppedCanvas().toDataURL())
    }
  }
}
</script>
<style lang="less">
.st-crop__preview {
  width: 126px;
  height: 72px;
  overflow: hidden;
}
</style>
