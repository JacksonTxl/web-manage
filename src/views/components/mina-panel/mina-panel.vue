<template>
  <div :class="b({ initial, 'responsive-preview': responsivePreview })">
    <div v-if="isShowPreview" :class="b('preview')">
      <slot name="preview"></slot>
    </div>
    <a-row>
      <a-col :xl="12"></a-col>
      <a-col :xl="8"></a-col>
    </a-row>
    <div :class="b('main')">
      <slot name="prepend"></slot>
      <div :class="b('content')">
        <slot></slot>
      </div>
      <div
        v-if="$slots.actions"
        :class="b('actions', { fixed: isActionFixed })"
        :style="actionStyle"
      >
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StMinaPanel',
  props: {
    initial: {
      type: Boolean,
      default: false
    },
    responsivePreview: {
      type: Boolean,
      default: false
    }
  },
  bem: {
    b: 'st-mina-panel'
  },
  data() {
    return {
      isActionFixed: true,
      actionLeft: 0,
      actionRight: 0,
      footerEl: null
    }
  },
  methods: {
    handleActionsPosition() {
      const rect = this.footerEl.getBoundingClientRect()
      const minaMain = document
        .querySelector('.st-mina-panel__main')
        .getBoundingClientRect()
      // 视窗内
      if (rect.top < window.innerHeight) {
        this.isActionFixed = false
      } else {
        this.isActionFixed = true
        this.actionLeft = minaMain.left
      }
    }
  },
  computed: {
    isShowPreview() {
      return this.$slots.preview
    },
    actionStyle() {
      if (!this.isActionFixed) {
        return {}
      }
      return { left: this.actionLeft + 'px' }
    }
  },
  mounted() {
    this.footerEl = document.querySelector('.layout-default-body__footer')
    if (this.footerEl) {
      this.handleActionsPosition()
      window.addEventListener('scroll', this.handleActionsPosition, false)
      window.addEventListener('resize', this.handleActionsPosition, false)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleActionsPosition, false)
    window.removeEventListener('resize', this.handleActionsPosition, false)
  }
}
</script>
