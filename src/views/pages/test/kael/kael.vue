<template>
  <st-panel app>
    <st-coupon class="mg-r8" key="1" name="kael" @close="onClose('invitee')" />
    <st-coupon class="mg-r8" key="2" name="kael"/>
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
