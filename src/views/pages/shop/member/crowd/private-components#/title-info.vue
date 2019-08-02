<template>
  <div style="display: flex; ">
    <st-t4 style="margin-right:44px;">{{ value.title }}</st-t4>
    <span style="color:#3E4D5C">{{ value.info }}</span>
  </div>
</template>
<script>
export default {
  model: {
    type: 'value',
    event: 'dataChangge'
  },
  props: {
    value: Object
  },
  data() {
    return {}
  },
  methods: {
    selectionFun(item) {
      this.value.selectionData = item
      this.$emit('dataChangge', this.value)
    }
  },
  mounted() {}
}
</script>
