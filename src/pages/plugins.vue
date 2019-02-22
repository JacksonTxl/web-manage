<template>
  <layout-default>
    this is plugins first
    <router-view></router-view>
  </layout-default>
</template>

<script lang='ts'>
import Vue from 'vue'
export default Vue.extend({
  data() {
    return {
      form: this.$form.createForm(this)
    }
  }
})
</script>
