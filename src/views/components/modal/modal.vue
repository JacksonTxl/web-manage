<template>
  <a-modal
    v-bind="$attrs"
    :width="computedWidth"
    :maskClosable="maskClosable"
    v-on="$listeners"
    :wrapClassName="
      [
        'st-modal',
        isFooterNull ? 'st-modal--footer-null' : '',
        wrapClassName
      ].join(' ')
    "
  >
    <div class="st-modal__close" @click="close">
      <st-icon type="modal-close"></st-icon>
    </div>
    <slot name="title" slot="title"></slot>
    <slot name="prepend"></slot>
    <div class="st-modal__body" :style="bodyStyle">
      <a-spin :spinning="loading">
        <slot></slot>
      </a-spin>
    </div>

    <slot name="footer" slot="footer"></slot>
  </a-modal>
</template>

<script>
import { defaults } from 'lodash-es'
export default {
  name: 'StModal',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    size: {
      type: String,
      default: 'default'
    },
    width: {
      type: String,
      default: ''
    },
    wrapClassName: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    backgroundImgae: {
      type: String,
      default: ''
    },
    maskClosable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    bodyStyle() {
      return this.backgroundImgae.length > 0
        ? {
            backgroundImage: `url(${this.backgroundImgae})`,
            backgroundSize: '100% 100%'
          }
        : {}
    },
    isFooterNull() {
      return this.$attrs.footer === false || this.$attrs.footer === null
    },
    computedWidth() {
      let width = 0
      if (this.width) {
        width = this.width
      } else if (this.size === 'default') {
        width = 676
      } else if (this.size === 'small') {
        width = 484
      }
      return width
    }
  },
  methods: {
    close() {
      this.$emit('change', false)
      this.$emit('cancel')
    },
    clickModal() {
      if (this.maskClosable) {
        this.close()
      }
    },
    clickModalContent(e) {
      e.stopPropagation()
    }
  },
  mounted() {
    /**
     * 需要modal是v-modal-link唤起的 <modal-link> 会有异步问题不要用
     */
    this.antModalEl = document.querySelector('.ant-modal')
    this.antModalContentEl = document.querySelector('.ant-modal-content')
    if (this.antModalEl && this.antModalContentEl) {
      // 模态窗上下点击不关闭
      // console.log(this.antModalEl, this.antModalContentEl)
      this.antModalEl.addEventListener('click', this.clickModal, false)
      this.antModalContentEl.addEventListener(
        'click',
        this.clickModalContent,
        false
      )
      document.body.style = 'overflow:hidden;padding-right:8px;'
    }
  },
  beforeDestroy() {
    if (this.antModalEl && this.antModalContentEl) {
      this.antModalEl.removeEventListener('click', this.clickModal, false)
      this.antModalContentEl.removeEventListener(
        'click',
        this.clickModalContent,
        false
      )
    }
  },
  destroyed() {
    document.body.style = ''
  }
}
</script>
