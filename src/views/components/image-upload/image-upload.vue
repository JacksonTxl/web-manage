<template>
  <div class="st-image-upload" v-viewer="{ url: 'data-src' }">
    <div
      class="st-image-upload__item st-preview-item"
      v-for="(item, index) in fileList"
      :key="index"
    >
      <img
        class="st-image-upload__item-img"
        :src="
          (item[imageUrl] || item[imageKey]) | imgFilter(computedFilterOptions)
        "
        :data-src="(item[imageUrl] || item[imageKey]) | imgFilter"
        :style="sizeStyle"
      />
      <slot name="item-extra" :item="item" :index="index"></slot>
      <div class="st-image-upload__actions">
        <slot name="actions" :item="item" :index="index">
          <span class="action" @click="onDel(index)">重新上传</span>
        </slot>
      </div>
    </div>
    <a-upload
      v-show="isShowUploadBtn"
      listType="picture-card"
      :showUploadList="false"
      :customRequest="upload"
      :multiple="multiple"
      class="st-image-upload__btn"
      :style="sizeStyle"
    >
      <a-spin :spinning="isLoading" :tip="progress + '%'">
        <slot>
          <st-icon
            type="plus-circle"
            style="font-size: 32px;color: #9BACB9;"
          ></st-icon>
          <!-- <a-icon
            type="plus-circle"
            theme="filled"
            :style="{ fontSize: '36px', color: '#9BACB9' }"
          /> -->
          <div class="st-image-upload__placeholder">{{ placeholder }}</div>
        </slot>
      </a-spin>
    </a-upload>
    <canvas
      id="myCanvas"
      v-if="maskOptions"
      :width="maskOptions.width"
      :height="maskOptions.height"
      v-show="false"
    ></canvas>
  </div>
</template>
<script>
import { OssService } from '@/services/oss.service'
import { AppConfig } from '@/constants/config'
import { MessageService } from '@/services/message.service'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer/src/component.vue'

const defaultSize = {
  w: '182px',
  h: '114px'
}
export default {
  name: 'StImageUpload',
  serviceInject() {
    return {
      oss: OssService,
      appConfig: AppConfig,
      messageService: MessageService
    }
  },
  props: {
    /**
     * 上传按钮的文字
     */
    placeholder: {
      type: String,
      default: '上传照片'
    },
    /**
     * 截图模态窗 相关选项
     */
    cropperModal: {
      type: Object
    },
    /**
     * 最多可上传图片数量
     */
    numLimit: {
      type: Number,
      default: 1
    },
    /**
     * 单张图片最大 size，单位 M
     */
    sizeLimit: {
      type: Number,
      default: 2
    },
    /**
     * 图片类型
     */
    fileType: {
      type: String,
      default: 'jpg, jpeg, png, bmp'
    },
    /**
     * 图片及上传按钮的宽度
     */
    width: {
      type: String,
      default: defaultSize.w
    },
    /**
     * 图片及上传按钮的宽度
     */
    height: {
      type: String,
      default: defaultSize.h
    },
    /**
     * 初始图片列表 example: [{ image_id: 10000, image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H',image_url:'http://...' }]
     */
    list: {
      type: Array,
      default: () => []
    },
    /**
     * 缩略图filter选项 同imgFilter选项
     */
    filterOptions: {
      type: Object,
      default: () => ({})
    },
    /**
     * 是否使用oss私有空间
     */
    isPrivate: {
      type: Boolean,
      default: false
    },
    /**
     * 预览时是否需要加上蒙版 蒙版和上传的图片一样大小
     * flag 是否需要加上蒙版
     * width 图片绘制宽度
     * height 图片绘制高度
     * maskUrl 蒙版的url
     */
    maskOptions: {
      type: Object
      // default: () => ({
      //   width: 750,
      //   height: 1334,
      //   maskUrl: 'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-invitation-4.png'
      // })
    },
    /**
     * 后端字段映射 image_id,image_key,image_url
     */
    props: {
      type: Object,
      default: () => ({
        image_id: 'image_id',
        image_key: 'image_key',
        image_url: 'image_url',
        image_host: 'image_host'
      })
    }
  },
  data() {
    return {
      fileList: [],
      isLoading: false,
      progress: 0,
      defaultMaskOptions: {
        width: 750,
        height: 1334,
        maskUrl:
          'https://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/default/bg-invitation-4.png'
      }
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
    },
    imageHost() {
      return this.props.image_host
    },
    isShowUploadBtn() {
      return this.fileList.length < this.numLimit
    },
    isShowFileList() {
      return this.fileList.length
    },
    isUploadBtnInvisible() {
      return this.numLimit === 1 && this.fileList.length
    },
    multiple() {
      return this.numLimit > 1
    },
    sizeStyle() {
      return `width: ${this.width};  height: ${this.height}`
    },
    computedFilterOptions() {
      const w = parseInt(this.width) * 2
      const h = parseInt(this.height) * 2
      return Object.assign({ w, h }, this.filterOptions)
    }
  },
  watch: {
    list(newList) {
      this.fileList = this.list
    }
  },
  mounted() {
    this.fileList = new Array(...this.list)
    if (this.maskOptions && this.fileList.length > 0) {
      this.maskOptions = Object.assign(
        this.maskOptions,
        this.defaultMaskOptions
      )
      this.drawMaskImage(this.fileList[0][this.imageUrl]).then(resSrc => {
        this.fileList[0][this.imageUrl] = resSrc
      })
    }
  },
  methods: {
    upload(data) {
      const fileCheckRet = this.fileCheck(data)
      if (!fileCheckRet.isValid) {
        this.messageService.error({ content: fileCheckRet.msg })
        return
      }
      if (this.cropperModal) {
        this.processCropper(data)
      } else {
        this.processUpload(data)
      }
    },
    processCropper(data) {
      this.$modalRouter.push({
        name: 'image-cropper',
        props: {
          file: data.file,
          ...this.cropperModal
        },
        on: {
          ok: res => {
            const croppedData = res
            this.processUpload(croppedData)
          }
        }
      })
    },
    processUpload(data) {
      this.isLoading = true
      // 业务
      this.oss
        .put({
          business: 'image',
          isPrivate: this.isPrivate,
          file: data.file,
          uploadProgress: e => {
            this.progress = parseInt((e.loaded / e.total) * 100)
          }
        })
        .subscribe({
          next: val => {
            console.log(val)
            if (this.maskOptions) {
              this.drawMaskImage(val.url).then(resSrc => {
                this.fileList.push({
                  [this.imageId]: 0,
                  [this.imageKey]: val.fileKey,
                  [this.imageHost]: val.host,
                  [this.imageUrl]: resSrc
                })
                this.$emit('change', this.fileList)
              })
            } else {
              this.fileList.push({
                [this.imageId]: 0,
                [this.imageKey]: val.fileKey,
                [this.imageHost]: val.host,
                [this.imageUrl]: val.url
              })
              this.$emit('change', this.fileList)
            }
          },
          error: val => {
            this.messageService.error({ content: `Error ${val.message}` })
            this.isLoading = false
          },
          complete: () => {
            this.isLoading = false
          }
        })
    },
    onDel(index) {
      const { fileList } = this
      const deletedFile = fileList.splice(index, 1)
      this.fileList = fileList
      this.$emit('delete', deletedFile[0])
      this.$emit('change', this.fileList)
    },
    fileCheck(data) {
      const { size, type } = data.file
      const { sizeLimit, fileType } = this
      if (!fileType.includes(type.split('/')[1])) {
        return {
          isValid: false,
          msg: `请上传${fileType}格式的文件`
        }
      }
      console.log(size, sizeLimit)
      if (size > sizeLimit * 1024 * 1024) {
        return {
          isValid: false,
          msg: `最大不能超过${sizeLimit}M`
        }
      }
      return {
        isValid: true
      }
    },
    drawMaskImage(userImgSrc) {
      const myCanvas = document.getElementById('myCanvas')
      const ctx = myCanvas.getContext('2d')
      ctx.globalCompositeOperation = 'source-over'
      const logo_img = new Image()
      logo_img.setAttribute('crossOrigin', 'anonymous')
      logo_img.src = this.maskOptions.maskUrl
      const user_img = new Image()
      user_img.setAttribute('crossOrigin', 'anonymous')
      user_img.src = userImgSrc
      const promise1 = new Promise((resolve, reject) => {
        logo_img.onload = () => {
          resolve()
        }
      })
      const promise2 = new Promise((resolve, reject) => {
        user_img.onload = () => {
          resolve()
        }
      })
      return new Promise((resolve, reject) => {
        Promise.all([promise1, promise2]).then(result => {
          ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
          ctx.drawImage(
            user_img,
            0,
            0,
            this.maskOptions.width,
            this.maskOptions.height
          )
          ctx.drawImage(
            logo_img,
            0,
            0,
            this.maskOptions.width,
            this.maskOptions.height
          )
          ctx.stroke()
          myCanvas.toBlob(function(blob) {
            const objectURL = URL.createObjectURL(blob)
            resolve(objectURL)
          })
        })
      })
    }
  }
}
</script>
