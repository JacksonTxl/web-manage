<template>
  <a-popover
    title="Title"
    trigger="click"
    v-model="visible"
  >
    <a @click="hide" slot="content">Close</a>
    <a-button type="primary">Click me</a-button>
  </a-popover>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    hide() {
      console.log(111)
      this.visible = false
    }
  }
}
</script>
