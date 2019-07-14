<template>
  <a
    href="javascript: void(0);"
    :class="b()"
    :style="{ color }"
    v-on="$listeners"
  >
    <st-icon :type="icon"></st-icon>
    <span :class="b('text')">{{text}}</span>
  </a>
</template>
<script>
export default {
  name: 'StInfoAction',
  bem: {
    b: 'st-info-action'
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
    color: {
      type: String,
      default: '#3F66F6'
    }
  }
}
</script>
