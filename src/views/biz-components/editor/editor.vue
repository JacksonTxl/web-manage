<template>
  <textarea :class="editorId"></textarea>
</template>

<script>
import { AppConfig } from '@/constants/config'
import { ImportService } from '@/services/import.service.ts'

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
      appConfig: AppConfig,
      importService: ImportService
    }
  },
  computed: {
    editorId() {
      return 'st-editor-' + this._uid
    }
  },
  mounted() {
    this.importService
      .load(['tinymce/5.0.3/tinymce.min.js'])
      .then(() =>
        this.importService.load(['tinymce/5.0.3/themes/silver/theme.min.js'])
      )
      .then(() => {
        const ctx = this
        window.tinyMCE.init({
          selector: '.' + this.editorId,
          language: 'zh_CN',
          // 右键菜单
          contextmenu: ['paste'],
          // 隐藏右下角技术支持
          branding: false,
          // 隐藏底栏的元素路径
          elementpath: false,
          menubar: false,
          body_class: 'st-editor',
          plugins: ['link', 'image'],
          toolbar:
            'undo redo | styleselect bold italic forecolor backcolor | bullist numlist | alignleft aligncenter alignright  | image link',
          language_url: this.appConfig.BASE_URL + 'tinymce/5.0.3/zh_CN.js',
          images_upload_handler(blobInfo, succCb, failCb) {
            const file = blobInfo.blob()

            failCb('未实现')
            // ossService
            //   .put(file, {
            //     serviceType: OA
            //   })
            //   .then(res => {
            //     succCb(res.url)
            //   })
            //   .catch(err => {
            //     failCb(err.message)
            //   })
          },
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
          },
          init_instance_callback(editor) {
            editor.setContent(ctx.value)
            ctx.$emit('ready', editor)
          }
        })
      })
  }
}
</script>
