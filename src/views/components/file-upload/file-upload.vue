<template>
  <div class="st-file-upload" v-viewer="{ url: 'data-src' }">
    <div class="st-file-upload__item st-preview-item" v-for="(item, index) in fileList" :key="index">
      <img class="st-file-upload__item-img" :src="item.image_key | imgFilter(imgFilterOpts)"
       :data-src="item.image_key | imgFilter({ w: 1000 })" :style="sizeStyle">
      <div class="st-file-upload__actions">
        <span class="st-file-upload__actions-item" @click="onDel(index)">删除</span>
      </div>
    </div>
    <a-upload
      v-show="isShowUploadBtn"
      listType="picture-card"
      :showUploadList="false"
      :customRequest="upload"
      :multiple="multiple"
      class="st-file-upload__btn"
      :style="sizeStyle"
    >
      <div>
        <a-icon :type="isLoading ? 'loading' : 'plus'"/>
        <div class="ant-upload-text">{{uploadText}}</div>
      </div>
    </a-upload>
  </div>
</template>
<script>
import { OssService } from '@/services/oss.service'
import { AppConfig } from '@/constants/config'
import { MessageService } from '@/services/message.service'
import { imgFilter } from '@/filters/resource.filters'
const defaultSize = {
  w: '182px',
  h: '114px'
}
export default {
  name: 'FileUpload',
  serviceInject() {
    return {
      Oss: OssService,
      appConfig: AppConfig,
      MessageService: MessageService
    }
  },
  filters: {
    imgFilter
  },
  props: {
    /**
     * 上传按钮的文字
     */
    uploadText: {
      type: String,
      default: '上传照片'
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
     * 初始图片列表 example: [{ image_id: 10000, image_key: 'http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/image/pLOFb5kCPN4gPQ8H' }]
     */
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      fileList: this.list,
      isLoading: false
    }
  },
  computed: {
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
    imgFilterOpts() {
      const w = parseInt(this.width || defaultSize.w) * 2
      const h = parseInt(this.height || defaultSize.h) * 2
      return {
        w,
        h
      }
    },
    sizeStyle() {
      const w = this.width || defaultSize.w
      const h = this.height || defaultSize.h
      return `width: ${w};  height: ${h}`
    }
  },
  methods: {
    upload(data) {
      const fileCheckRet = this.fileCheck(data)
      if (!fileCheckRet.isValid) {
        this.MessageService.error({ content: fileCheckRet.msg })
        return
      }
      this.isLoading = true
      this.Oss.put({
        file: data.file
      }).subscribe({
        next: val => {
          this.fileList.push({
            image_id: 0,
            image_key: val.fileKey
          })
          this.$emit('change', this.fileList)
        },
        error: val => {
          this.MessageService.error({ content: `Error ${val.message}` })
        },
        complete: () => {
          this.isLoading = false
        }
      })
    },
    onDel(index) {
      const { fileList } = this
      fileList.splice(index, 1)
      this.fileList = fileList
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
      if (size > sizeLimit * 1024 * 1024) {
        return {
          isValid: false,
          msg: `最大不能超过${sizeLimit}M`
        }
      }
      return {
        isValid: true
      }
    }
  }
}
</script>
