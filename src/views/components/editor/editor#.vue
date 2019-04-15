<template>
  <textarea :class="editorId"></textarea>
</template>

<script>
import { AppConfig } from '@/constants/config'
export default {
  name: 'StEditor',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  serviceInject() {
    return {
      appConfig: AppConfig
    }
  },
  computed: {
    editorId() {
      return 'st-editor-' + this._uid
    }
  },
  methods: {
    isJs(src) {
      return src.indexOf('.js') > -1
    },
    loadJs(src) {
      return new Promise((resolve, reject) => {
        const s = document.createElement('script')
        s.src = this.appConfig.BASE_URL + src
        document.head.appendChild(s)
        s.onload = () => {
          resolve()
        }
        s.onerror = err => {
          reject(err)
        }
      })
    },
    dyamicLoad(srcs) {
      const tasks = []
      srcs.forEach(src => {
        if (this.isJs(src)) {
          tasks.push(this.loadJs(src))
        }
      })
      return Promise.all(tasks)
    }
  },
  mounted() {
    this.dyamicLoad([
      'tinymce/5.0.3/tinymce.min.js',
      'tinymce/5.0.3/themes/silver/theme.min.js'
    ]).then(() => {
      window.tinyMCE
        .init({
          selector: '.' + this.editorId,
          language: 'zh_CN',
          menubar: false,
          language_url: this.appConfig.BASE_URL + 'tinymce/5.0.3/zh_CN.js',
          setup(editor) {
            console.log(editor)
          }
        })
    })
  }
}
</script>
