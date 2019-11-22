<template>
  <a-popover
    :title="title"
    class="st-overflow-text"
    placement="topLeft"
    overlayClassName="st-overflow-text__overlay"
    :style="{ maxWidth }"
  >
    <template slot="content">
      <slot name="content">
        <ul>
          <li class="mg-t8" v-for="(item, index) in value" :key="index">
            {{ index + 1 }}、 {{ item }}
          </li>
        </ul>
      </slot>
    </template>
    <slot>
      {{ showValue }}
    </slot>
  </a-popover>
</template>
<script>
export default {
  name: 'StOverflowText',
  props: {
    title: {
      type: String
    },
    value: {
      type: Array,
      default: () => []
    },
    maxWidth: {
      type: String,
      default: '1000px'
    }
  },
  computed: {
    showValue() {
      if (Array.isArray(this.value)) {
        return this.value.join(',')
      }
      return this.value
    }
  }
}
</script>
