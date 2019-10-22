<template>
  <st-modal title="分享海报" :footer="null" width="500px" v-model="show">
    <div :class="bModal()">
      <st-info>
        <st-info-item
          v-for="(item, index) in signUpInfo"
          :label="item.label"
          :key="index"
        >
          {{ item.value }}
        </st-info-item>
      </st-info>
    </div>
  </st-modal>
</template>
<script>
export default {
  name: 'ModalActivitySignUpInfo',
  bem: {
    bModal: 'modal-marketing-activity-sign-up-info'
  },
  props: {
    signUpInfo: Array
  },
  data() {
    return {
      show: false
    }
  }
}
</script>
