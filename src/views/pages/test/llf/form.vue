<template>
  <st-panel app>
    <a-form layout="inline">
      <a-form-item validateStatus="error" help="错误提示">
        <a-input></a-input>
      </a-form-item>
    </a-form>
  </st-panel>
</template>

<script>
export default {
  data() {
    return {
      content: '1'
    }
  },
  methods: {
    onChange(value) {
      this.content = value.data
    }
  }
}
</script>
