<template>
  <section class="sg-section">
    <h3>oss.service</h3>
    <p>上传成功返回的KEY: {{ key }}</p>
    <p>
      调用put方法，传入参数为{file[,type[,uploadProgress]]},file是文件对象（必传），type是文件类型（选用）
      <br />
      目前只有image类型默认image，uploadProgress是上传进度回调（选用）。成功回调next返回对象{fileKey:
      key}，上传成功返回，把key传给后台。失败回调error。
    </p>
    <a-upload
      listType="picture-card"
      class="avatar-uploader"
      :showUploadList="false"
      :customRequest="upload"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        width="128"
        height="auto"
        alt="avatar"
      />
      <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
  </section>
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
      oss: OssService,
      messageService: MessageService
    }
  },
  methods: {
    upload(data) {
      this.loading = true
      this.imageUrl = ''
      this.oss
        .put({
          file: data.file
        })
        .subscribe({
          next: val => {
            this.key = val.fileKey
            this.messageService.success({ content: `success: ${val}` })
            this.imageUrl = `http://styd-saas-test.oss-cn-shanghai.aliyuncs.com/${
              val.fileKey
            }`
            this.loading = false
          },
          error: val => {
            this.messageService.error({ content: `Error ${val.message}` })
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
