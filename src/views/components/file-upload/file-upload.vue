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
  w: 182,
  h: 114
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
    max: {
      type: Number,
      default: 1
    },
    /**
     * 图片及上传按钮的宽度
     */
    width: {
      type: Number,
      default: defaultSize.w
    },
    /**
     * 图片及上传按钮的宽度
     */
    height: {
      type: Number,
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
      return this.fileList.length < this.max
    },
    isShowFileList() {
      return this.fileList.length
    },
    isUploadBtnInvisible() {
      return this.max === 1 && this.fileList.length
    },
    multiple() {
      return this.max > 1
    },
    imgFilterOpts() {
      const w = (this.width || defaultSize.w) * 2
      const h = (this.height || defaultSize.h) * 2
      return {
        w,
        h
      }
    },
    sizeStyle() {
      const w = this.width || defaultSize.w
      const h = this.height || defaultSize.h
      return `width: ${w}px;  height: ${h}px`
    }
  },
  methods: {
    upload(data) {
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
    }
  }
}
</script>
<style lang="less">
.st-file-upload {
  position: relative;
  margin-bottom: -16px;
  margin-right: -16px;
  &__item {
    display: inline-block;
    margin-right: 16px;
    margin-bottom: 16px;
    position: relative;
    transition: all .5s;
  }
  &__item-img,
  &__btn {
    display: inline-block;
  }
  &__btn {
    margin-right: 16px;
    margin-bottom: 16px;
  }
  &__list,
  &__btn {
    vertical-align: top;
  }
  &__actions {
    position: absolute;
    width: 100%;
    height: 32px;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .45);
    text-align: right;
    padding: 0 6px;
  }
  &__actions-item {
    font-size: 12px;
    cursor: pointer;
    line-height: 32px;
    padding: 0 6px;
    color: rgba(255, 255, 255, .85);
  }
}
</style>
