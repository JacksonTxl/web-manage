<template>
  <a
    href="javascript: void(0);"
    :class="b()"
    :style="{ color }"
    v-on="$listeners"
  >
    <st-icon :type="icon"></st-icon>
    <span :class="b('text')">{{ text }}</span>
  </a>
</template>
<script>
export default {
  name: 'StInfoAction',
  bem: {
    b: 'st-info-action'
  },
  data() {
    return {
      colorMap: {
        1: '#3F66F6',
        2: '#ff5e41'
      }
    }
  },
  props: {
    icon: {
      type: String,
      default: 'edit'
    },
    text: {
      type: String,
      default: '编辑'
    },
    type: {
      type: [String, Number],
      default: 1
    }
  },
  computed: {
    color() {
      return this.colorMap[this.type]
    }
  }
}
</script>
