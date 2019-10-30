<template>
  <div class="tox-toolbar__group editor__upload">
    <a-upload :fileList="[]" :customRequest="upload">
      <a-icon type="upload" />
    </a-upload>
  </div>
</template>

<script>
import { OssService } from '../../../services/oss.service'
export default {
  name: 'EditImage',
  serviceInject() {
    return {
      oss: OssService
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
    }
  }
}
</script>
