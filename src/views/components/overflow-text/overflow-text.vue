<template>
  <span>
    <a-popover
      :title="title"
      class="st-overflow-text"
      v-show="isPopover"
      placement="topLeft"
      overlayClassName="st-overflow-text__overlay"
      :style="{ maxWidth }"
    >
      <template slot="content">
        <slot>
          <ul v-if="isArray">
            <li class="mg-t8" v-for="(item, index) in value" :key="index">
              {{ item }}
            </li>
          </ul>
          <span v-else>{{ showValue }}</span>
        </slot>
      </template>
      <slot>
        {{ showValue }}
      </slot>
    </a-popover>
    <span v-show="!isPopover">{{ showValue }}</span>
  </span>
</template>
<script>
export default {
  name: 'StOverflowText',
  props: {
    title: {
      type: String
    },
    value: {
      type: [Array, String]
    },
    maxWidth: {
      type: String,
      default: '1000px'
    }
  },
  computed: {
    isArray() {
      return Array.isArray(this.value)
    },
    isPopover() {
      let width = 0
      let html = document.createElement('span')
      html.innerText = this.value
      html.className = 'getTextWidth'
      document.querySelector('body').appendChild(html)
      width = document.querySelector('.getTextWidth').offsetWidth
      document.querySelector('.getTextWidth').remove()

      return width > +this.maxWidth.replace('px', '')
    },
    showValue() {
      return this.value.toString()
    }
  }
}
</script>
