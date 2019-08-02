<template>
  <st-modal :title="null" size="small" v-model="show" :footer="null">
    <div class="st-modal-no-captcha"></div>
  </st-modal>
</template>
<script>
let cropper
export default {
  name: 'StModalNoCaptcha',
  data() {
    return {
      show: false
    }
  },
  mounted() {
    getNC()
  }
}
</script>
