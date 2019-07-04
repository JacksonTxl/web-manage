<template>
  <a-modal
    v-bind="$attrs"
    :width="computedWidth"
    v-on="$listeners"
    :wrapClassName="['st-modal',wrapClassName].join(' ')"
  >
    <div class="st-modal__body">
      <slot></slot>
    </div>
    <slot name="footer" slot="footer"></slot>
  </a-modal>
</template>

<script>
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
    }
  },
  computed: {
    computedWidth() {
      let width = 0
      if (this.width) width = this.width
      if (this.size === 'default') {
        width = 676
      }
      if (this.size === 'small') {
        width = 484
      }
      return width
    }
  },
  mounted() {
    /**
     * 需要modal是v-modal-link唤起的 <modal-link> 会有异步问题不要用
     */
    this.antModalEl = document.querySelector('.ant-modal')
    this.antModalContentEl = document.querySelector('.ant-modal-content')
    if (this.antModalEl && this.antModalContentEl) {
      document.body.style = 'overflow:hidden;padding-right:6px;'
    }
  },
  destroyed() {
    document.body.style = ''
  }
}
</script>
