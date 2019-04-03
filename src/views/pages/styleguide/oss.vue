<template>
  <div>
    <a-upload
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :customRequest="upload"
    >
      <img v-if="imageUrl" :src="imageUrl" width="128" height="auto" alt="avatar">
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'"/>
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <h1>
      上传成功返回的KEY: {{key}}
    </h1>
    <h2>
      调用put方法，传入文件。成功回调next返回对象{fileKey: key}，上传成功返回，把key传给后台。失败回调error。
    </h2>
    <h2>备注：oss.service只提供图片上传功能。不包含上传组件的样式或上传之前对图片操作的逻辑。</h2>
  </div>
</template>
<script>
import { OssService } from '@/services/oss.service'
import { MessageService } from '@/services/message.service'
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      key: ''
    }
  },
  serviceInject() {
    return {
      OSS: OssService,
      MessageService: MessageService
    }
  },
  methods: {
    upload(data) {
      this.loading = true
      this.imageUrl = ''
      this.OSS.put({
        file: data.file
      }).subscribe({
        next: val => {
          this.key = val.fileKey
          this.MessageService.success({ content: `success: ${val}` })
          this.imageUrl = `http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/${
            val.fileKey
          }`
          this.loading = false
        },
        error: val => {
          this.MessageService.error({ content: `Error ${val.message}` })
          this.loading = false
        }
      })
    }
  }
}
</script>
<style>
.avatar-uploader {
  display: block;
  width: 128px;
  background: #ccc;
  margin: 60px auto;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
