<template>
  <st-modal
    :title="title"
    :ok-text="okText"
    :okButtonProps="{ props: { disabled: !userImgSrc } }"
    :bodyStyle="{ padding: 0 }"
    :confirmLoading="loading.getMemberCheckResult"
    v-model="show"
    width="484px"
    @ok="uploadUserImageToRecognition"
    @cancel="cancel"
  >
    <a-alert
      slot="prepend"
      message="为保证人脸录入质量，请确保光线充足，以免影响识别精度。"
      type="warning"
      banner
    />
    <div :class="recognition()">
      <div :class="recognition('header')">
        <div :class="recognition('space')">
          <a-spin :spinning="isLoading" :class="recognition('loading')">
            <div :class="recognition('img')">
              <img :src="userImgSrc" v-show="userImgSrc" />
              <video
                ref="video"
                width="270"
                height="270"
                autoplay
                v-show="!userImgSrc"
              ></video>
              <canvas
                :class="recognition('canvas')"
                ref="canvas"
                width="270"
                height="270"
              ></canvas>
              <img
                src="~@/assets/img/userBitmap.png"
                alt=""
                :class="recognition('userLinePic')"
                v-show="openCameraError"
              />
              <img
                src="~@/assets/img/userLinePic.png"
                alt=""
                :class="recognition('userLinePic')"
                v-show="!openCameraError"
              />
            </div>
          </a-spin>
          <div :class="recognition('operation')">
            <st-button type="primary" @click="handlerTakePhoto" :disabled="openCameraError">
              {{ userImgSrc ? '重拍' : '拍照' }}
            </st-button>
            <!-- <div :class="recognition('tips')">
              <div>若录入遇到问题</div>
              <a href="" :class="recognition('question')">请点击此处</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </st-modal>
</template>

<script>
import { OssService } from '@/services/oss.service'
import { AppConfig } from '@/constants/config'
import { MessageService } from '@/services/message.service'
import { RecognitionService } from './recognition.service'

export default {
  bem: {
    recognition: 'st-face-recognition'
  },
  serviceInject() {
    return {
      oss: OssService,
      appConfig: AppConfig,
      messageService: MessageService,
      recognitionService: RecognitionService
    }
  },
  rxState() {
    return {
      loading: this.recognitionService.loading$
    }
  },
  props: {
    fileList: {
      type: Array,
      default: () => []
    },
    props: {
      type: Object,
      default: () => ({
        image_id: 'image_id',
        image_key: 'image_key',
        image_url: 'image_url'
      })
    }
  },
  data() {
    return {
      title: '人脸信息录入',
      okText: '确认上传',
      show: false,
      list: this.fileList,
      canvasElm: null,
      userImgSrc: '',
      confirmLoading: false,
      openCameraError: false, // 开启摄像头失败
      isLoading: false
    }
  },
  watch: {
    fileList(newList) {
      this.list = this.fileList
      if (this.list.length) this.userImgSrc = this.list[0][this.imageUrl]
    },
    confirmLoading(v) {
      this.$emit('loadingChange', v)
    },
    progress(v) {
      this.$emit('progressChange', v)
    }
  },
  computed: {
    imageId() {
      return this.props.image_id
    },
    imageKey() {
      return this.props.image_key
    },
    imageUrl() {
      return this.props.image_url
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (
        navigator.mediaDevices.getUserMedia ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      ) {
        // 调用用户媒体设备, 访问摄像头
        this.openCamera()
        this.canvasElm = this.$refs.canvas
      } else {
        this.openCameraError = true
        this.userImgSrc = ''
      }
    })
  },
  methods: {
    // 人脸识别图片上传
    uploadUserImageToRecognition() {
      let canvas = this.canvasElm
      canvas.toBlob(blob => {
        this.confirmLoading = true
        this.oss
          .put({
            file: blob,
            isPrivate: true,
            business: 'face',
            uploadProgress: e => {
              this.progress = parseInt((e.loaded / e.total) * 100)
            }
          })
          .subscribe({
            next: val => {
              this.confirmLoading = false
              // 图片上传后,对返回参数进行操作
              this.imageQualityTest(val)
            },
            error: val => {
              this.confirmLoading = false
              this.messageService.error({ content: `Error ${val.message}` })
            },
            complete: () => {
              // 图片上传成功
            }
          })
      })
    },
    // 取消人脸识别图片上传
    cancel() {
      this.show = false
    },
    // 图片质量检测
    imageQualityTest(image) {
      this.recognitionService
        .getMemberCheckResult({
          image_key: image.fileKey
        })
        .subscribe(res => {
          let isScan = res.is_scan
          if (isScan) {
            let imageId = this.list.length && this.list[0][this.imageId]
            let current = this.list.length && this.list[0]
            if (current) {
              current[this.imageKey] = image.fileKey
            } else {
              this.list.push({
                [this.imageId]: 0,
                [this.imageKey]: image.fileKey,
                [this.imageUrl]: image.url
              })
            }
            this.$emit('change', this.list)
            this.show = false
          } else {
            this.messageService.error({
              content: `上传图片质量不佳,请重新拍照`
            })
            this.userImgSrc = ''
          }
        })
    },
    // 拍照
    handlerTakePhoto(index = 0) {
      // 如果已有用户头像,则对数组操作,去除当前数据
      if (this.userImgSrc) {
        this.userImgSrc = ''
        return
      }
      // 如果已拍照,显示重拍,点击重新展示相机
      // 如果未拍照,显示为拍照,点击拍照
      let context = this.canvasElm.getContext('2d')
      let video = this.$refs.video
      context.drawImage(video, 0, 0, 270, 270)
      this.userImgSrc = this.canvasElm.toDataURL('image/png')
    },
    // 开启摄像头
    openCamera() {
      if (!navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia = function(constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          let getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {
            this.openCameraError = true
            return Promise.reject(
              new Error('getUserMedia is not implemented in this browser')
            )
          }
          this.openCameraError = false
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      let constraints = {
        video: {
          width: 270,
          height: 270
        }
      }
      this.isLoading = true
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(this.success)
        .catch(this.error)
    },
    // 关闭摄像头
    closeCamera() {
      console.log('关闭摄像头')
      if (!this.$refs['video'].srcObject) return
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },
    success(stream) {
      let video = this.$refs.video
      if ('srcObject' in video) {
        video.srcObject = stream
      } else {
        // 避免在新的浏览器中使用它，因为它正在被弃用。
        video.src = window.URL.createObjectURL(stream)
      }
      let that = this
      video.oncanplay = function(e) {
        console.log('oncanplay')
        that.isLoading = false
      }
      video.onloadedmetadata = function(e) {
        video.play()
        // video.style.transform = 'scaleX(-1)'
      }
    },
    error(error) {
      console.log(`error message ${error}`)
      this.openCameraError = true
      this.isLoading = false
    },
    dataURItoBlob(dataURI) {
      // 图片转成Buffer
      let byteString = atob(dataURI.split(',')[1])
      let mimeString = dataURI
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
      let ab = new ArrayBuffer(byteString.length)
      let ia = new Uint8Array(ab)
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ab], { type: mimeString })
    }
  },
  beforeDestroy() {
    this.closeCamera()
  }
}
</script>
