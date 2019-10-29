<template>
  <div :class="b({ initial })">
    <div :class="b('preview')">
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
    </div>
    <div v-if="$slots.actions" :class="b('actions', { fixed: isActionFixed })">
      <slot name="actions"></slot>
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
    }
  },
  bem: {
    b: 'st-mina-panel'
  },
  data() {
    return {
      isActionFixed: true,
      footerEl: null
    }
  },
  methods: {
    handleActionsPosition() {
      const rect = this.footerEl.getBoundingClientRect()

      // 视窗内
      if (rect.top < window.innerHeight) {
        this.isActionFixed = false
      } else {
        this.isActionFixed = true
      }
    }
  },
  mounted() {
    this.footerEl = document.querySelector('.layout-default-body__footer')
    if (this.footerEl) {
      this.handleActionsPosition()
      window.addEventListener('scroll', this.handleActionsPosition, false)
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleActionsPosition, false)
  }
}
</script>
