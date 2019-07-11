<template>
    <div :class="pem()">
    <a-upload
    name="file"
      :showUploadList="false"
      :customRequest="upload"
    >
      <st-button size="small">
        <a-icon :type="loading ? 'loading' : 'upload'"/>
        上传文件
      </st-button>
    </a-upload>
    <span v-if="key" :class="pem('name')">{{name}}</span>
    </div>
</template>
<script>
import { OssService } from '@/services/oss.service'
import { MessageService } from '@/services/message.service'
export default {
  bem: {
    pem: 'brand-setting-mina-pem-upload'
  },
  data() {
    return {
      loading: false,
      imageUrl: '',
      key: '',
      name: ''
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
          file: data.file,
          business: 'file',
          isPrivate: true
        })
        .subscribe({
          next: val => {
            this.key = val.fileKey
            this.name = data.file.name
            this.$emit('success', val.fileKey)
            this.messageService.success({ content: `success: ${val}` })
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
