<template>
  <div :class="b({ initial })">
    <div :class="b('preview')">
      <slot name="preview"></slot>
    </div>
    <div :class="b('main')">
      <slot></slot>
    </div>
    <div v-if="$slots.actions" :class="b('actions')">
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
  mounted() {
    const footer = document.querySelector('.layout-default-body__footer')
    // window.addEventListener('scroll', () => {
    //   const rect = footer.getBoundingClientRect()
    //   if (rect.top < window.innerHeight) {
    //     console.log('enter')
    //   } else {
    //     console.log('out')
    //   }
    // })
  }
}
</script>
