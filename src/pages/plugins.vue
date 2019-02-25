<template>
  <layout-default>
    this is plugins first
    <router-view></router-view>
  </layout-default>
</template>

<script>
export default {
  data() {
    return {
      form: this.$form.createForm(this)
    }
  }
}
</script>
