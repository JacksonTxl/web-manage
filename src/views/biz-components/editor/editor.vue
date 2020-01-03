<template>
  <textarea :class="editorId"></textarea>
</template>

<script>
import { AppConfig } from '@/constants/config'
import { ImportService } from '@/services/import.service.ts'
import EditorImage from './editor-image'
import Vue from 'vue'

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
  model: {
    prop: 'value',
    event: 'change'
  },
  serviceInject() {
    return {
      appConfig: AppConfig,
      importService: ImportService
    }
  },
  computed: {
    editorId() {
      console.log(this)
      return 'st-editor-' + this._uid
    }
  },
  methods: {
    onChangeGetFile({ image, editor }) {
      editor.insertContent(`<img src="${image.url}">`)
      this.$emit('ready', editor)
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(newVal) {
      console.log(newVal, this.editor)
      if (this.editor) {
        this.editor.setContent(newVal)
      }
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
        window.tinyMCE.remove()
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
          min_height: 153,
          toolbar:
            'undo redo | styleselect bold italic forecolor backcolor | bullist numlist | alignleft aligncenter alignright',
          language_url: this.appConfig.BASE_URL + 'tinymce/5.0.3/zh_CN.js',
          // 图片上传
          images_upload_handler: function(blobInfo, success, failure) {
            let formData = new FormData()
            formData.append('img', blobInfo.blob())
            ctx.$modalRouter.push({
              name: 'face-recognition'
            })
          },
          setup(editor) {
            editor.on('change keyup undo redo', value => {
              const currentContent = editor.getContent()
              ctx.$emit('input', currentContent)
              ctx.$emit('change', currentContent)
            })
            // editorEvents.forEach(key => {
            //   if (ctx.$listeners[key]) {
            //     editor.on(key, e => {
            //       ctx.$emit(key, e, editor)
            //     })
            //   }
            // })
          },
          init_instance_callback(editor) {
            const editorToolbarEl = document.querySelector('.tox-toolbar')
            let ele = document.createElement('div')
            ele.id = 'editorImageUpload'
            editorToolbarEl.appendChild(ele)
            new Vue({
              components: {
                EditorImage
              },
              render: h => (
                <editor-image editor={editor} onChange={ctx.onChangeGetFile} />
              )
            }).$mount('#editorImageUpload')
            editor.setContent(ctx.value)
            if (editor) {
              ctx.editor = editor
            }
            ctx.$emit('ready', editor)
          }
        })
      })
  }
}
</script>
