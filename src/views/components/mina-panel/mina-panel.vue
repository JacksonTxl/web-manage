<template>
  <div :class="b({ initial })">
    <div :class="b('preview')">
      <slot name="preview"></slot>
    </div>
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
import { debounce } from 'lodash-es'
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
      isActionFixed: true
    }
  },
  mounted() {
    const footerEl = document.querySelector('.layout-default-body__footer')
    if (footerEl)
      window.addEventListener('scroll', () => {
        const rect = footerEl.getBoundingClientRect()

        // 视窗内
        if (rect.top < window.innerHeight) {
          this.isActionFixed = false
        } else {
          this.isActionFixed = true
        }
      })
  }
}
</script>
