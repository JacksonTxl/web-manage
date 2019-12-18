<template>
  <div class="tox-toolbar__group editor__upload">
    <a-upload
      :fileList="[]"
      :customRequest="upload"
      :beforeUpload="beforeUpload"
    >
      <a-icon type="upload" />
    </a-upload>
  </div>
</template>

<script>
import { OssService } from '../../../services/oss.service'
import { MessageService } from '@/services/message.service'
export default {
  name: 'EditImage',
  serviceInject() {
    return {
      oss: OssService,
      messageService: MessageService
    }
  },
  data() {
    return {}
  },
  props: {
    editor: Object
  },
  methods: {
    upload(data) {
      this.oss
        .put({
          business: 'image',
          isPrivate: false,
          file: data.file,
          uploadProgress: e => {
            this.progress = parseInt((e.loaded / e.total) * 100)
          }
        })
        .subscribe(val => {
          this.$emit('change', { image: val, editor: this.editor })
        })
    },
    beforeUpload(file) {
      const MAX_SIZE = 2
      const isLimit = file.size / 1024 / 1024 < MAX_SIZE
      if (!isLimit) {
        this.messageService.error({
          content: `上传图片最大不能超过${MAX_SIZE}M`
        })
      }
      return isLimit
    }
  }
}
</script>
