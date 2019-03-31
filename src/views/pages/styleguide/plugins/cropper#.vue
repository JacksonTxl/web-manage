<template>
  <div>
    <a-row>
      <a-col :span="8">
        <a-row>
          <input type="file" title="" id="input_image">
        </a-row>
        <a-row class="mg-t16">
          <a-col :span="16" style="height: 300px;">
            <img id="image" hidden src="https://pic3-s.styd.cn/o_1d78oa7b91hvd10a21pr91c5v1viki.jpg"/>
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
let cropper
export default {
  name: 'CropperDemo',
  mounted() {
    const image = document.getElementById('image')
    cropper = new Cropper(image, {
      // viewMode 定义 cropper 的视图模式 默认：0；可以使用0, 1, 2, 3
      viewMode: 1,
      aspectRatio: 16 / 9,
      preview: '#crop_preview',
      // responsive 在调整窗口大小的时候重新渲染 cropper，默认为 true
      responsive: false
      // restore 在调整窗口大小后恢复裁剪的区域。
      // restore: false
      // zoomable 是否允许放大图像
      // ,zoomable: false
    })

    const inputImage = document.getElementById('input_image')
    const URL = window.URL || window.webkitURL
    let blobURL
    if (!URL) {
      return
    }
    inputImage.onchange = function() {
      console.log(this.files)
      const files = this.files
      let file
      if (cropper && files && files.length) {
        file = files[0]
        if (/^image\/\w+/.test(file.type)) {
          blobURL = URL.createObjectURL(file)
          console.log('file changed', blobURL)
          cropper.reset().replace(blobURL)
        } else {
          alert('Please choose an image file.')
        }
      }
    }
  },
  methods: {
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
