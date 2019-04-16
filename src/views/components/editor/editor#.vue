<template>
  <textarea :class="editorId"></textarea>
</template>

<script>
import { AppConfig } from '@/constants/config'

const editorEvents = [
  'activate',
  'addUndo',
  'beforeAddUndo',
  'beforeExecCommand',
  'beforeGetContent',
  'beforeRenderUI',
  'beforeSetContent',
  'beforePaste',
  'blur',
  'change',
  'clearUndos',
  'click',
  'contextMenu',
  'copy',
  'cut',
  'dblclick',
  'deactivate',
  'dirty',
  'drag',
  'dragDrop',
  'dragEnd',
  'dragGesture',
  'dragOver',
  'drop',
  'execCommand',
  'focus',
  'focusIn',
  'focusOut',
  'getContent',
  'hide',
  'init',
  'keyDown',
  'keyPress',
  'keyUp',
  'loadContent',
  'mouseDown',
  'mouseEnter',
  'mouseLeave',
  'mouseMove',
  'mouseOut',
  'mouseOver',
  'mouseUp',
  'nodeChange',
  'objectResizeStart',
  'objectResized',
  'objectSelected',
  'paste',
  'postProcess',
  'postRender',
  'preProcess',
  'progressState',
  'redo',
  'remove',
  'reset',
  'saveContent',
  'selectionChange',
  'setAttrib',
  'setContent',
  'show',
  'submit',
  'undo',
  'visualAid'
]

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
      const s = document.createElement('script')
      const url = this.appConfig.BASE_URL + src
      if (document.querySelector(`script[src='${url}']`)) {
        return Promise.resolve()
      }
      return new Promise((resolve, reject) => {
        s.src = url
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
    this.dyamicLoad(['tinymce/5.0.3/tinymce.min.js'])
      .then(() => this.dyamicLoad(['tinymce/5.0.3/themes/silver/theme.min.js']))
      .then(() => {
        const ctx = this
        window.tinyMCE.init({
          selector: '.' + this.editorId,
          language: 'zh_CN',
          menubar: false,
          language_url: this.appConfig.BASE_URL + 'tinymce/5.0.3/zh_CN.js',
          setup(editor) {
            editor.on('change keyup undo redo', value => {
              const currentContent = editor.getContent()
              ctx.$emit('input', currentContent)
            })
            editorEvents.forEach(key => {
              if (ctx.$listeners[key]) {
                editor.on(key, e => {
                  ctx.$emit(key, e, editor)
                })
              }
            })
          }
        })
      })
  }
}
</script>
