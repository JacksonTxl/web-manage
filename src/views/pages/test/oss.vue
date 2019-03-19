<template>
  <a-upload
    listType="picture-card"
    class="avatar-uploader"
    :showUploadList="false"
    :customRequest="upload"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
        <a-icon :type="loading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
import { OssService } from '@/services/oss.service'
export default {
  data() {
    return {
      loading: false,
      imageUrl: '',
      oss: null
    }
  },
  serviceInject() {
    return {
      OSS: OssService
    }
  },
  methods: {
    upload(data) {
      this.OSS.put({
        url: 'http://kaelyp.oss-cn-shanghai.aliyuncs.com',
        policy: 'eyJleHBpcmF0aW9uIjoiMjAyMC0wMS0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==',
        OSSAccessKeyId: 'LTAIwMXc8QPtYmGd',
        signature: '3A8SnJy7sgE0d5Yf9wvbLPCZXcA=',
        file: data.file,
        uploadProgress(res) {
          console.log(`${res.loaded / res.total * 100}%`)
        }
      }).subscribe({
        next: val => console.log(val),
        complete: () => console.log('Complete!'),
        error: val => console.log(`Error: ${val}`)
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
