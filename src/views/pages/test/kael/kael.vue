<template>
  <st-panel app>
    <st-help-popover>
      <span slot="content">停售原因是不想停售原因是不想停售原因是不想停售原因是不想</span>
    </st-help-popover>
  </st-panel>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    onClose(e) {
      console.log(3)
    }
  }
}
</script>
